import { google } from "googleapis";
import { initClient } from "./init-client";
import {
  GOOGLE_RESVERATION_SHEET_ID,
  GOOGLE_SPREADSHEET_ID,
} from "@/configs/google-api";

type Params = {
  sheetId?: number;
  spreadsheetId?: string;
  range: string;
  searchValue: string;
  _client?: Awaited<ReturnType<typeof initClient>>;
};

export async function searchAndDeleteRow({
  sheetId = GOOGLE_RESVERATION_SHEET_ID,
  spreadsheetId = GOOGLE_SPREADSHEET_ID,
  range,
  searchValue,
  _client,
}: Params) {
  console.log("=== searchAndDeleteRow ===");
  const client = _client ?? (await initClient());
  const sheets = google.sheets({ version: "v4", auth: client });

  // Step 1: Get the data from the sheet
  const getRows = {
    spreadsheetId: spreadsheetId,
    range: range, // Specify the column to search in (e.g., A:A)
    auth: client,
  };

  try {
    const response = await sheets.spreadsheets.values.get(getRows);
    const rows = response.data.values;

    if (!rows) {
      console.log("No data found.");
      return;
    }

    // Step 2: Search for the value
    let rowIndex = -1;
    rows.forEach((row, index) => {
      if (row[0] === searchValue) {
        rowIndex = index;
      }
    });

    if (rowIndex === -1) {
      console.log(`Value "${searchValue}" not found in range ${range}.`);
      return;
    }

    // Step 3: Delete the row

    const deleteResponse = await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      auth: client,
      requestBody: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: sheetId,
                dimension: "ROWS",
                startIndex: rowIndex,
                endIndex: rowIndex + 1,
              },
            },
          },
        ],
      },
    });
    console.log(`Deleted row at index ${rowIndex + 1}`);
    console.log(deleteResponse);
  } catch (err) {
    console.error("Error:", err);
  }
}
