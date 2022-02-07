import { Context, RNG } from 'near-sdk-as';
import { JobID } from "../utils";


/**
 * @class Application
 * @property id           - unique application id
 * @property jobId        - job id
 * @property applicantId  - candidate id
 * @property submittedOn  - date the application was submitted on
 */
@nearBindgen
export class Application {
    id: string;
    jobId: JobID;
    applicantId: string;
    submittedOn: u64;

    constructor(jobId: JobID) {
        this.id = this.generateApplicationId();
        this.jobId = jobId;
        this.applicantId = Context.sender;
        this.submittedOn = Context.blockTimestamp;
    }

    /**
     * Generates a new applicantion id and returns it.
     */
     private generateApplicationId(): string {
        const id = new RNG<u32>(3, u32.MAX_VALUE);
        const applicationId = "APPL-" + id.next().toString();
        return applicationId;
    }
}
