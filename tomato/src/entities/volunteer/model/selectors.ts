import {RootState} from "@shared/lib/store";

const state = (s: RootState) => s.volunteer;

export const volunteer = (s: RootState) => state(s).volunteer;
