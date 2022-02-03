import { logging } from 'near-sdk-as';
import { Job } from './model';
import { JobID } from './utils';
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
  const jobId = job.id
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
