if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID must be provided");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET must be provided");
}
export const GoogleClientId = process.env.GOOGLE_CLIENT_ID;
export const GoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
