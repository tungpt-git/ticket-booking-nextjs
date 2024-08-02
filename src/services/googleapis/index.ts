/* eslint-disable import/no-anonymous-default-export */

import { append } from "./append";
import { initClient } from "./initClient";

export const googleServices = Object.freeze({
  client: initClient,
  append,
});

export const useGoogleServices = () => {
  return googleServices;
};
