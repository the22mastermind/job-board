import { Context, logging } from 'near-sdk-as';
import { Job } from './models/job';
import { Application } from './models/application';
import { JobID, JobTags } from './utils';
import { jobs, applications } from './storage';


// CHANGE METHODS (They change contract state)

/**
 * Creates a new job and returns the job id
 * @param title 
 * @param description 
 * @param jobType
 * @param salary
 * @param experience
 * @param tags
 * @returns JobID
 */
export function postNewJob(title: string, description: string, jobType: string, salary: string, experience: string, tags: JobTags): JobID {
  const job = new Job(title, description, jobType, salary, experience, tags);
  
  logging.log(`Job: "${title}" created by "${job.postedBy}"`);
  jobs.push(job);

  return job.id;
}

/**
 * Apply to a job by recording jobID along with accountIDs of candidates)
 * @param jobId
 */
export function applyToJob(jobId: JobID): void {
  const applicant = Context.sender;

  for(let i = 0; i < applications.length; i++) {
    // Check if applicant hasn't already applied to a job
    assert(applications[i].applicantId != applicant, 'You have already applied to this job!');
  }

  // Check if applicant is not the Job creator
  const jobDetails = getJobById(jobId);
  checkApplicantIsNotOwner(jobDetails.postedBy);

  const newApplication = new Application(jobId);

  applications.push(newApplication);

  logging.log(`Application submitted successfully!`);
}


// VIEW METHODS  (They don't change contract state)

/**
 * Retrieves a job by its ID
 * @param jobId
 * @returns job details
 */
export function getJobById(jobId: JobID): Job {
  checkJobsExist(jobId);
  let result: Job[] = [];
  for(let i = 0; i < jobs.length; i++) {
    if(jobs[i].id == jobId) {
      result.push(jobs[i]);
    }
  }
  return result[0];
}

/**
 * Fetch all the jobs
 * @returns An array of all the jobs
 */
export function fetchJobs(): Job[] {
  let postedJobs: Job[] = [];
  for(let i = 0; i < jobs.length; i++) {
    if(jobs[i]) {
      postedJobs.push(jobs[i]);
    }
  }
  return postedJobs;
}

/**
 * Fetch applications submitted for a job
 * @returns An array of applications for a job
 */
export function getApplicants(jobId: JobID): Application[] {
  let candidates: Application[] = [];
  for(let i = 0; i < applications.length; i++) {
    if(applications[i].jobId == jobId) {
      candidates.push(applications[i]);
    }
  }
  return candidates;
}


// HELPER METHODS

/**
 * Checks if jobs exist (not empty)
 * @param jobId
 */
function checkJobsExist(jobId: JobID): void {
  assert(!jobs.isEmpty, "No jobs found!");
}

/**
 * Prevents Job creator to apply to his job
 * @param accountId
 */
 function checkApplicantIsNotOwner(postedBy: string): void {
  assert(Context.sender != postedBy, "You cannot apply to your own Job! Please sign in with another account");
}
