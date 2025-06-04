import {
  Individual,
  VideoIntegration,
} from "@/features/individual/types/types";
import { refreshZoomToken } from "@/lib/zoom";
import { refreshGoogleToken } from "@/lib/google-meet";
import { refreshWebexToken } from "@/lib/webex";

export async function checkVideoIntegrationAuth({
  individual,
  provider,
}: {
  individual: Individual;
  provider: string;
}) {
  // Check if the individual has the required video integration
  const videoIntegration = (individual.videoIntegrations ?? []).find(
    (integration: VideoIntegration) => integration.provider === provider
  );

  let needsAuth = false;

  if (provider === "ZOOM" && videoIntegration) {
    // Check if token is expired
    if (videoIntegration.expiresAt && videoIntegration.expiresAt < new Date()) {
      if (videoIntegration.refreshToken) {
        try {
          // Attempt to refresh the token
          await refreshZoomToken(videoIntegration);
        
        } catch (err) {
          // If Zoom rejects the refresh (token expired/invalid), handle it here:
          needsAuth = true;
        }
      } else {
        // No refresh token, require re-authentication
        needsAuth = true;
      }
    }
  }

  // ---- GOOGLE MEET ----
  if (provider === "GOOGLE_MEET" && videoIntegration) {
    if (videoIntegration.expiresAt && videoIntegration.expiresAt < new Date()) {
      if (videoIntegration.refreshToken) {
        try {
           await refreshGoogleToken(videoIntegration);
         
        } catch (err) {
          needsAuth = true;
        }
      } else {
        needsAuth = true;
      }
    }
  }

  //--WEBEX--
  if (provider === "WEBEX" && videoIntegration) {
    if (videoIntegration.expiresAt && videoIntegration.expiresAt < new Date()) {
      if (videoIntegration.refreshToken) {
        try {
        await refreshWebexToken(videoIntegration);
        
        } catch (err) {
          needsAuth = true;
        }
      } else {
        needsAuth = true;
      }
    }
  }

  return {
    needsAuth,
  };
}
