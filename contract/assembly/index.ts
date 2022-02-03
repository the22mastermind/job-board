import { Context, logging } from 'near-sdk-as';
import { Job } from './model';
import { JobID, ApplicationData } from './utils';
import { jobs, applications } from './storage';

/**
 * Creates a new job and returns the job id
 * @param title 
 * @param description 
 * @param jobType
 * @returns JobID
 */
export function post_job(title: string, description: string, jobType: string): JobID {
  const job = new Job(title, description, jobType);
  const jobId = job.id;
  logging.log(`Job: "${title}" created by "${job.postedBy}"`);
  jobs.push(job);

  return jobId;
}

/**
 * Retrieves a job by its ID
 * @param jobId
 * @returns job details from an array of all the jobs
 */
export function get_job(jobId: JobID): Job[] {
  checkJobId(jobId);
  let result: Job[] = [];
  for(let i = 0; i < jobs.length; i++) {
    if(jobs[i].id == jobId) {
      result.push(jobs[i]);
    }
  }
  return result;
}

/**
 * Checks if game ID exists.
 * @param jobId
 */
function checkJobId(jobId: JobID): void {
  assert(applications.contains(jobId), "Job ID not found!");
}

/**
 * Apply to a job by recording jobID along with accountIDs of candidates)
 * @param jobId
 */
export function apply_job(jobId: JobID): void {
  // checkJobId(jobId);
  const applicant = Context.sender;
  let application: ApplicationData = [];

  if(applications.contains(jobId)) {
    application = applications.get(jobId) as ApplicationData;
  }

  // Check if applicant hasn't already applied to a job
  for(let i = 0; i < application.length; i ++) {
    assert(application[i] != jobId, 'You have already applied to this job!');
  }

  application.push(applicant);

  applications.set(jobId, application);
  logging.log("Application submitted successfully!");
}
