import { PersistentMap, PersistentVector } from "near-sdk-as";
import { JobID } from "./utils";
import { Job, Application } from "./model";

export const jobs = new PersistentVector<Job>("jobs");
export const applications = new PersistentMap<JobID, Application[]>("applications");
