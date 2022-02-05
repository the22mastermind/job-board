import { PersistentVector } from "near-sdk-as";
import { Job , Application} from "./model";

export const jobs = new PersistentVector<Job>("jobs");
export const applications = new PersistentVector<Application>("applications");
