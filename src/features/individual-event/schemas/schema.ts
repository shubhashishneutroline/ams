import { z } from 'zod'
import { EventType, LinkType} from '../types/types';
import { WeekDays } from '@/app/(admin)/service/_types/service';
import { serviceSchema } from '@/app/(admin)/service/_schemas/service';

export const eventTypeEnum = z.nativeEnum(EventType);
export const linkTypeEnum = z.nativeEnum(LinkType);
export const weekDaysEnum = z.nativeEnum(WeekDays);

// export const meetingSchema = z.object({
//     eventId: z.string().min(1, "Event ID is required"),
//     timeSlot: z.coerce.date(),
//     bookedByName: z.string().optional(),/* .min(1, "Name is required"), */
//     bookedByEmail: z.string().email("Invalid email"),
//     customAnswers: z.any().optional(),
  
//     videoUrl: z.string().url("Invalid video URL").optional(),
//     videoProvider: videoProviderEnum.optional(),
//     slug: z.string().optional(), // Assuming slug is optional during creation
//   })
  
export const shareableLinkSchema = z.object({
  id: z.string(),
  location: z.string(),
  slug: z.string(),
  type: eventTypeEnum,
  appointmentId: z.string().optional(),
  serviceId: z.string().optional(),
  resourceId: z.string().optional(),
  serviceTimeId: z.string().optional(),
  date: z.string().optional(),
  dateRangeEnd: z.string().optional(),
  linkType: linkTypeEnum,
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  createdAt: z.string(),
  expiresAt: z.string().optional(),
});

export const shareableLinkWithServiceSchema = shareableLinkSchema.extend({
  service: serviceSchema,
});