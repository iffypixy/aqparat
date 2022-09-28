import {RootState} from "@shared/lib/store";

const state = (s: RootState) => s.viewer;

export const credentials = (s: RootState) => state(s)[state(s).type!];
export const type = (s: RootState) => state(s).type;
