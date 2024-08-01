"use server";

import { google, sheets_v4 } from "googleapis";
import { initClient } from "./initClient";
import { GOOGLE_SHEET_ID } from "@/configs/google-api";

export async function append(
  params: sheets_v4.Params$Resource$Spreadsheets$Values$Append
) {
  const client = await initClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const data = await sheets.spreadsheets.values.append({
    ...params,
    spreadsheetId: GOOGLE_SHEET_ID,
    
  });

  return data;
}
