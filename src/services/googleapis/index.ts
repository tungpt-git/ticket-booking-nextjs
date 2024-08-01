/* eslint-disable import/no-anonymous-default-export */

import { append } from "./append";
import { initClient } from "./initClient";

export const googleServices = {
  client: initClient,
  append,
};

export const useGoogleServices = () => {
  return googleServices
};
