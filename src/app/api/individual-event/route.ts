import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shareableLinkSchema, shareableLinkWithServiceSchema } from "@/features/individual-event/schemas/schema";
import { ZodError } from "zod";
import { EventType } from "@/features/individual-event/types/types";
import { VideoProvider } from "@prisma/client";
import { ShareableLink } from "@/features/individual-event/types/types";
import { checkVideoIntegrationAuth } from "@/lib/checkVideoIntegration";
import { Individual } from "@/features/individual/types/types";
import { ServiceType } from "@/app/(admin)/service/_types/service";

export async function POST(req: NextRequest) {
  try {
    const userId = "cmben86we0000vd8gk890533p"; // Get from your auth system (Clerk)
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized!", success: false },
        { status: 401 }
      );
    }

    // Find the individual associated with this user
    const individual = await prisma.individual.findUnique({
      where: { userId: userId },
      include: {
        videoIntegrations: true, // Include the video integrations
      },
    });

    if (!individual) {
      return NextResponse.json(
        {
          message:
            "Individual profile not found. Please create a profile first.!",
          success: false,
        },
        { status: 404 }
      );
    }

    const individualId = individual.id;

    const body = await req.json();

    // Validate the body using the Zod schema
    const parsedData = shareableLinkWithServiceSchema.parse(body);

    // Convert location to VideoProvider enum value
    const provider = parsedData.location?.toUpperCase() as VideoProvider;

    // Validate that the provider is a valid VideoProvider enum value
    if (!Object.values(VideoProvider).includes(provider)) {
      return NextResponse.json(
        { message: "Invalid video provider", success: false },
        { status: 400 }
      );
    }

    const { needsAuth } = await checkVideoIntegrationAuth({
      individual,
      provider,
    });

    if (needsAuth) {
      return NextResponse.json(
        {
          success: false,
          message: `Auth expired.Please go to Integrations and reconnect your ${provider} account.`,
        },
        { status: 401 }
      );
    }

   
   // 1. Create the Service (virtual event)
    const createdService = await prisma.service.create({
      data: {
        title: parsedData.service.title,
        type: ServiceType.VIRTUAL, // hardcoded for virtual event
        description: parsedData.service.description || "",
        estimatedDuration: parsedData.service.estimatedDuration || 60,
        status: parsedData.service.status || "ACTIVE", 
        serviceAvailability: {
          create: (parsedData.service.serviceAvailability ?? [] ).map((avail) => ({
            weekDay: avail.weekDay,
            timeSlots: {
              create: (avail.timeSlots ?? []).map((slot) => ({
                startTime: slot.startTime,
                endTime: slot.endTime,
              })),
            },
          })),
        },
         individualId: individualId,
      },
    });

    // 2. Create the ShareableLink, linking to the new service
    const createdLink = await prisma.shareableLink.create({
      data: {
        location: parsedData.location,
        slug: parsedData.slug,
        type: parsedData.type,
        serviceId: createdService.id,
        linkType: parsedData.linkType,
        metaTitle: parsedData.metaTitle,
        metaDescription: parsedData.metaDescription,
        date: parsedData.date ? new Date(parsedData.date) : undefined,
        dateRangeEnd: parsedData.dateRangeEnd ? new Date(parsedData.dateRangeEnd) : undefined,
        expiresAt: parsedData.expiresAt ? new Date(parsedData.expiresAt) : undefined,
        // Add other fields as needed
      },
    });



 if ((parsedData.type = EventType.ONE_TO_ONE)) {
      //generate link as of booking meeting
    }

    return NextResponse.json(
      { message: "Event created successfully!", data: event, success: true },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Validation failed!", error: error.errors, success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create event!", error: error, success: false },
      { status: 500 }
    );
  }
}

//get request
export async function GET(req: NextRequest) {
  // Replace with your auth system
  const userId = "cmben86we0000vd8gk890533p";
  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 }
    );
  }

  try {
    const events = await prisma.event.findMany({
      where: { userId },
      include: { availability: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ data: events, success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch events", error, success: false },
      { status: 500 }
    );
  }
}
