import { Context, logging, RNG } from 'near-sdk-as';
import { Job } from './models/job';
import { Application } from './models/application';
import { Candidate } from './models/candidate';
import { JobID, JobTags } from './utils';
import { jobs, applications, candidates } from './storage';


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
  // Generate job ID
  const id = generateJobId('JOB-');

  const job = new Job(id, title, description, jobType, salary, experience, tags);
  
  logging.log(`Job: "${title}" created by "${job.postedBy}"`);
  jobs.push(job);

  return job.id;
}

/**
 * Apply to a job by recording jobID along with accountIDs of candidates)
 * @param jobId
 */
export function applyToJob(jobId: JobID): void {
  const accountId = Context.sender;
  const applicant = candidates.get(accountId) as Candidate;

  // Candidate should complete their profile before applying to jobs
  if(!applicant) {
    throw new Error("You must complete your profile before applying to jobs!");
  }

  for(let i = 0; i < applications.length; i++) {
    // Check if applicant hasn't already applied to a job
    assert(applications[i].applicant.accountId != applicant.accountId, 'You have already applied to this job!');
  }

  // Check if applicant is not the Job creator
  const jobDetails = getJobById(jobId);
  checkApplicantIsNotOwner(jobDetails.postedBy);

  // Generate application ID
  const id = generateApplicationId('APPL-');

  const newApplication = new Application(id, jobId, applicant, 'Submitted', Context.blockTimestamp);

  applications.push(newApplication);

  logging.log(`Application submitted successfully!`);
}

/**
 * Creates a candidate profile and returns it
 * @param firstName 
 * @param lastName 
 * @param email
 * @returns Candidate
 */
 export function createCandidateProfile(firstName: string, lastName: string, email: string): Candidate {
   const accountId = Context.sender;

  //  Initialize candidate profile
  const candidate = new Candidate(firstName, lastName, email);

  candidates.set(accountId, candidate);
  
  logging.log(`"${candidate.firstName}"'s profile created successfully!`);

  return candidate;
}

/**
 * Update application status (Viewed or Accepted)
 * @param applicationId
 * @param jobId
 * @param status
 */
 export function updateApplicationStatus(applicationId: string, jobId: string, status: string): void {
   // Retrieve job
   const jobDetails = getJobById(jobId);

  // Retrieve application
  for(let i = 0; i <  applications.length; i++) {
    // Check applicationId and Job creator
    if(applications[i].id == applicationId && jobDetails.postedBy == Context.sender) {
      const updatedApplication = new Application(applications[i].id, applications[i].jobId, applications[i].applicant, status, applications[i].submittedOn);
      applications.replace(i, updatedApplication);
    }
  }

 logging.log(`Application ID: "${applicationId}" status updated to "${status}" successfully!`);
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

/**
 * Generate new job id
 * @returns generated job ID
 */
function generateJobId(prefix: string): string {
  const id = new RNG<u32>(3, u32.MAX_VALUE);
  const newId = prefix + id.next().toString();
  for(let i = 0; i < jobs.length; i++) {
    if(jobs[i].id == newId) {
      generateJobId(prefix);
    }
  }
  return newId;
}

/**
 * Generate new application id
 * @returns generated application ID
 */
function generateApplicationId(prefix: string): string {
  const id = new RNG<u32>(3, u32.MAX_VALUE);
  const newId = prefix + id.next().toString();
  for(let i = 0; i < applications.length; i++) {
    if(applications[i].id == newId) {
      generateApplicationId(prefix);
    }
  }
  return newId;
}
