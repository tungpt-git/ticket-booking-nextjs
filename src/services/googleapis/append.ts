"use server";

import { google, sheets_v4 } from "googleapis";
import { initClient } from "./init-client";
import { GOOGLE_SPREADSHEET_ID } from "@/configs/google-api";

export async function append(
  params: sheets_v4.Params$Resource$Spreadsheets$Values$Append,
  _client?: Awaited<ReturnType<typeof initClient>>
) {
  const client = _client ?? (await initClient());
  const sheets = google.sheets({ version: "v4", auth: client });

  const data = await sheets.spreadsheets.values.append({
    ...params,
    spreadsheetId: GOOGLE_SPREADSHEET_ID,
  });

  return data;
}
