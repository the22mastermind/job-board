job-board Smart Contract
==================

A Smart Contract for a Job Board DApp using the NEAR Blockchain Protocol.


Exploring The Code
==================

1. The main smart contract code lives in `assembly/index.ts`

2. The models are defined in `assembly/models/` and storage in `assembly/storage.ts`


Public functions
==================

1. **postNewJob()**: Allows the creation of a new job post

2. **applyToJob()**: Allows a candidate to apply to a job

3. **createCandidateProfile()**: Allows a candidate to create a profile which is a requirement before applying for jobs

4. **updateApplicationStatus()**:

   - Sets the candidate's application status to "Viewed" when a job creator views it

   - Allows the job creator to accept a candidate's application


Public functions
==================

1. **getJobById()**: Retrieves a job details given job ID

2. **fetchJobs()**: Retrieves all the jobs posted

3. **getApplicants()**: Retrieves candidate applications for a specific job.

