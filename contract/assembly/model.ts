import { Context } from 'near-sdk-as';
import { JobID, JobTags } from "./utils";

/**
 * @class PostedJob
 * @property title        - job title
 * @property description  - more detailed explanation of the job
 * @property jobType      - job type (full-time | contract)
 * @property salary       - job salary Eg. $1500
 * @property tags         - job tags Eg. ["UI", "Design", "Software Development"]
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
    createdOn: i64;

    constructor(id: string, jobTitle: string, jobDesc: string, jobType: string, salary: string, experience: string, tags: JobTags) {
        this.id = id;
        this.title = jobTitle;
        this.description = jobDesc;
        this.type = jobType;
        this.salary = salary;
        this.experience = experience;
        this.tags = tags;
        this.postedBy = Context.sender;
        this.createdOn = Date.now();
    }
}

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
    submittedOn: i64;

    constructor(id: string, jobId: JobID) {
        this.id = id;
        this.jobId = jobId;
        this.applicantId = Context.sender;
        this.submittedOn = Date.now();
    }
}
