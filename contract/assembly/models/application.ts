import { JobID } from "../utils";
import { Candidate } from './candidate';


/**
 * @class Application
 * @property id           - unique application id
 * @property jobId        - job id
 * @property applicant    - candidate profile
 * @property status       - application status. (Submitted, Viewed, or Accepted)
 * @property submittedOn  - date the application was submitted on
 */
@nearBindgen
export class Application {
    id: string;
    jobId: JobID;
    applicant: Candidate;
    status: string;
    submittedOn: u64;

    constructor(id: string, jobId: JobID, applicant: Candidate, status: string, submittedOn: u64) {
        this.id = id;
        this.jobId = jobId;
        this.applicant = applicant;
        this.status = status;
        this.submittedOn = submittedOn;
    }
}
