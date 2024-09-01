import { google, sheets_v4 } from "googleapis";
import { initClient } from "./init-client";
import { GOOGLE_SPREADSHEET_ID } from "@/configs/google-api";

export const get = async (
  params: sheets_v4.Params$Resource$Spreadsheets$Values$Get
) => {
  const client = await initClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const data = await sheets.spreadsheets.values.get({
    ...params,
    spreadsheetId: GOOGLE_SPREADSHEET_ID,
  });

  return data;
};
