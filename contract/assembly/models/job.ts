import { Context, RNG } from 'near-sdk-as';
import { JobID, JobTags } from "../utils";

/**
 * @class PostedJob
 * @property title        - job title
 * @property description  - more detailed explanation of the job
 * @property jobType      - job type (full-time | contract)
 * @property salary       - job salary Eg. $1500
 * @property postedBy     - job creator
 * @property createdOn    - date the job was posted on
 */
@nearBindgen
export class Job {
    id: JobID;
    title: string;
    description: string;
    type: string;
    salary: string;
    experience: string;
    tags: JobTags;
    postedBy: string;
    createdOn: u64;

    constructor(jobTitle: string, jobDesc: string, jobType: string, salary: string, experience: string, tags: JobTags) {
        this.id = this.generateJobId();
        this.title = jobTitle;
        this.description = jobDesc;
        this.type = jobType;
        this.salary = salary;
        this.experience = experience;
        this.tags = tags;
        this.postedBy = Context.sender;
        this.createdOn = Context.blockTimestamp;
    }

    /**
     * Generates a new job id and returns it.
     */
     private generateJobId(): JobID {
        const id = new RNG<u32>(3, u32.MAX_VALUE);
        const jobId = "JOB-" + id.next().toString();
        return jobId;
    }
}
