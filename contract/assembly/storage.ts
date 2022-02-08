import { PersistentVector, PersistentMap } from "near-sdk-as";
import { Job } from "./models/job";
import { Application } from "./models/application";
import { Candidate } from "./models/candidate";
import { AccountID } from './utils';

export const jobs = new PersistentVector<Job>("jobs");
export const applications = new PersistentVector<Application>("applications");
export const candidates = new PersistentMap<AccountID, Candidate>("candidates");
