import { u128 } from 'near-sdk-as';

export type AccountID = string;

export type ApplicationData = Array<string>;

export type JobID = string;

export const GAS = u128.from("200000000000000000000000");
