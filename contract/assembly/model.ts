import { Context, RNG } from 'near-sdk-as';
import { JobID } from "./utils";
import { applications } from "./storage";

/**
 * @class PostedJob
 * @property title        - job title
 * @property description  - more detailed explanation of the job
 * @property jobType      - job type (full-time | contract)
 * @property postedBy     - job creator
 */
@nearBindgen
export class Job {
    id: JobID;
    title: string;
    description: string;
    type: string;
    postedBy: string;

    constructor(jobTitle: string, jobDesc: string, jobType: string) {
        this.id = this.generateJobId();
        this.title = jobTitle;
        this.description = jobDesc;
        this.type = jobType;
        this.postedBy = Context.sender;
    }

    /**
     * Generates a new job id and returns it.
     */
    private generateJobId(): JobID {
        const id = new RNG<u32>(3, u32.MAX_VALUE);
        const result = "JOB-" + id.next().toString();
        if(applications.contains(result)) {
            this.generateJobId();
        }
        return result;
    }
}
