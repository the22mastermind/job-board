import { PersistentVector } from "near-sdk-as";
import { Job } from "./models/job";
import { Application } from "./models/application";

export const jobs = new PersistentVector<Job>("jobs");
export const applications = new PersistentVector<Application>("applications");
