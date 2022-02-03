import { PersistentMap, PersistentVector } from "near-sdk-as";
import { JobID, ApplicationData } from "./utils";
import { Job } from "./model";

export const jobs = new PersistentVector<Job>("jobs");
export const applications = new PersistentMap<JobID, ApplicationData>("applications");
