"use server";

import { google } from "googleapis";
import { initClient } from "./init-client";
import { Readable } from "stream";

const folderId = "1SrdggD-sv_tbGDCSv2go_xTMrolPXrvR";

export async function upload(
  file: File,
  _client?: Awaited<ReturnType<typeof initClient>>
) {
  const auth = _client ?? (await initClient());

  const drive = google.drive({ version: "v3", auth });
  const mimeType = file.type;

  const fileMetadata = {
    name: file.name,
    parents: [folderId],
    mimeType,
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: {
      mimeType,
      body: Readable.from(file.stream() as any),
    },
    fields: "id",
    supportsAllDrives: true,
  });

  return response.data.id;
}
