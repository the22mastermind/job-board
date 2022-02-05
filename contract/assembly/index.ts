import { Context, logging, PersistentVector } from 'near-sdk-as';
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
  checkJobsExist(jobId);
  let result: Job[] = [];
  for(let i = 0; i < jobs.length; i++) {
    if(jobs[i].id == jobId) {
      result.push(jobs[i]);
    }
  }
  return result;
}

/**
 * Checks if jobs exist (not empty)
 * @param jobId
 */
function checkJobsExist(jobId: JobID): void {
  assert(!jobs.isEmpty, "No jobs found!");
}

/**
 * Apply to a job by recording jobID along with accountIDs of candidates)
 * @param jobId
 */
export function apply_job(jobId: JobID): void {
  const applicant = Context.sender;
  let application: ApplicationData = [];

  if(applications.contains(jobId)) {
    application = applications.get(jobId) as ApplicationData;
  }

  // Check if applicant is not the Job creator
  const jobDetails = get_job(jobId);
  checkApplicantIsNotOwner(jobDetails[0].postedBy);

  // Check if applicant hasn't already applied to a job
  for(let i = 0; i < application.length; i ++) {
    assert(application[i] != applicant, 'You have already applied to this job!');
  }

  application.push(applicant);

  applications.set(jobId, application);
  logging.log("Application submitted successfully!");
}

/**
 * Fetch all the jobs
 * @returns An array of all the jobs
 */
export function fetch_jobs(): PersistentVector<Job> {
  assert(jobs.length > 0, 'No jobs found!');
  return jobs;
}

/**
 * Prevents Job creator to apply to his job
 * @param accountId
 */
 function checkApplicantIsNotOwner(postedBy: string): void {
  assert(Context.sender != postedBy, "You cannot apply to your own Job! Please sign in with another account");
}
