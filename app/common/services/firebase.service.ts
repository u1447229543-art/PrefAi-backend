import axios from "axios";
import { JWT } from "google-auth-library";
/**
 * Send a push notification via Expo's push service.
 *
 * @param expoPushToken - The Expo push token (e.g. ExponentPushToken[xxxx...])
 * @param title - Notification title
 * @param body - Notification body
 * @param data - Optional extra payload
 */

const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];

async function getAccessToken(): Promise<string> {
  const client = new JWT({
    email: process.env.FCM_CLIENT_EMAIL,
    key: process.env.FCM_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const tokens = await client.authorize();

  if (!tokens.access_token) {
    throw new Error("Failed to generate access token from Google");
  }

  return tokens.access_token;
}

export async function sendPushNotification(
  fcmToken: string,
  title: string,
  body: string,
  data?: Record<string, any>
) {
  try {
    const accessToken = await getAccessToken();
    console.log(fcmToken, "fcmToken");
    console.log(data, "data");

    const response = await axios.post(
      `https://fcm.googleapis.com/v1/projects/${process.env.FCM_PROJECT_ID}/messages:send`,
      {
        message: {
          token: fcmToken,
          notification: {
            title,
            body,
          },
          data: data || {},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("FCM Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error sending push notification:", err);
    throw err;
  }
}
