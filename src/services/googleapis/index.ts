/* eslint-disable import/no-anonymous-default-export */

import { append } from "./append";
import { get } from "./get";
import { initClient } from "./init-client";
import { searchAndDeleteRow } from "./searchAndDelete";

export const googleServices = Object.freeze({
  client: initClient,
  append,
  get,
  searchAndDeleteRow,
});

export const useGoogleServices = () => {
  return googleServices;
};
