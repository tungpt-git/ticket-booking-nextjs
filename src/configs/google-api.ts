if (!process.env.GOOGLE_API_PROJECT_ID) {
  throw new Error("GOOGLE_API_PROJECT_ID must be provided");
}
if (!process.env.GOOGLE_API_PRIVATE_KEY_ID) {
  throw new Error("GOOGLE_API_PRIVATE_KEY_ID must be provided");
}
if (!process.env.GOOGLE_API_PRIVATE_KEY) {
  throw new Error("GOOGLE_API_PRIVATE_KEY must be provided");
}
if (!process.env.GOOGLE_API_CLIENT_EMAIL) {
  throw new Error("GOOGLE_API_CLIENT_EMAIL must be provided");
}
if (!process.env.GOOGLE_SHEET_ID) {
  throw new Error("GOOGLE_SHEET_ID must be provided");
}

export const GOOGLE_API_PROJECT_ID = process.env.GOOGLE_API_PROJECT_ID;
export const GOOGLE_API_PRIVATE_KEY_ID = process.env.GOOGLE_API_PRIVATE_KEY_ID;
export const GOOGLE_API_PRIVATE_KEY = process.env.GOOGLE_API_PRIVATE_KEY;
export const GOOGLE_API_CLIENT_EMAIL = process.env.GOOGLE_API_CLIENT_EMAIL;
export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
