"use server";
import {
  GOOGLE_API_CLIENT_EMAIL,
  GOOGLE_API_PRIVATE_KEY,
  GOOGLE_API_PRIVATE_KEY_ID,
  GOOGLE_API_PROJECT_ID,
} from "@/configs/google-api";
import { google } from "googleapis";

export async function getClient() {
  const glAuth = await google.auth.getClient({
    projectId: GOOGLE_API_PROJECT_ID,
    credentials: {
      type: "service_account",
      project_id: GOOGLE_API_PROJECT_ID,
      private_key_id: GOOGLE_API_PRIVATE_KEY_ID,
      private_key: GOOGLE_API_PRIVATE_KEY,
      client_email: GOOGLE_API_CLIENT_EMAIL,
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return glAuth;
}
