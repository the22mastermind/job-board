import { Context, VMContext } from 'near-sdk-as';
import {
  postNewJob,
  applyToJob,
  fetchJobs,
  getJobById,
  getApplicants,
  createCandidateProfile,
  updateApplicationStatus,
} from '..';
import { jobs, applications } from '../storage';
import { GAS } from '../utils';

const CREATOR = "jirf.testnet";
const TITLE = 'Senior Blockchain Developer';
const DESCRIPTION = 'Senior Blockchain Developer wanted ASAP.';
const TYPE = 'Full-Time';
const SALARY = '$2000';
const XP = 'Expert';
const TAGS = [
  'Blockchain',
  'Smart Contract',
  'Software Developement',
  'React',
  'NEAR',
];
const JOHN = 'john.testnet';
const JANE = 'jane.testnet';

describe('postNewJob()', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(CREATOR);
  });

  it('should create a new job', () => {
    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    expect(jobs.length).toBe(1, 'should contain one job');
    expect(jobs[0].id).toStrictEqual(jobId, `job ID should equal ${jobId}`);
    expect(jobs[0].title).toStrictEqual(TITLE, `job title should be ${TITLE}`);
    expect(jobs[0].tags).toStrictEqual(TAGS, `job tags should be ${TAGS}`);
    expect(jobs[0].postedBy).toStrictEqual(CREATOR, `job creator should be ${CREATOR}`);
    expect(jobs[0].createdOn);
  })

  it('should create two new jobs', () => {
    const title = 'UI/UX Designer';

    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);
    const nextJobId = postNewJob(title, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    expect(jobs.length).toBe(2, 'should contain two jobs');
    expect(jobs[0].title).toStrictEqual(TITLE, `first job's title should be ${TITLE}`);
    expect(jobs[1].title).toStrictEqual(title, `second job's title should be ${title}`);
    expect(jobId).not.toBe(nextJobId, 'first and second job IDs should be different');
    expect(jobs[1].postedBy).toBe(Context.sender, 'job creator should be postedBy');
  })
})

describe('ApplyToJob()', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(JOHN);
  });

  it('should retrieve no applications when none has been created', () => {
    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);
    
    expect(applications.length).toStrictEqual(0, 'should contain no applications');
  })

  it('should retrieve a job application when it has been created', () => {
    VMContext.setSigner_account_id(CREATOR);

    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    // Log in as John
    VMContext.setSigner_account_id(JOHN);

    // Create candidates's profile
    createCandidateProfile('John', 'Doe', 'johndoe@mail.com');

    // Apply as John
    applyToJob(jobId);

    expect(applications.length).toStrictEqual(1, 'Should contain one application');
    expect(applications[0].applicant.accountId).toStrictEqual(Context.sender, `application sender ID should be ${JOHN}`);
    expect(applications[0].id);
    expect(applications[0].jobId);
    expect(applications[0].jobId).toStrictEqual(jobId, `job id should be ${jobId}`);
    expect(applications[0].status);
    expect(applications[0].status).toStrictEqual('Submitted', 'application status should be `Submitted`');
    expect(applications[0].submittedOn);
  })

  it('should retrieve job applications when they have been created', () => {
    VMContext.setSigner_account_id(CREATOR);

    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    // Login as John
    VMContext.setSigner_account_id(JOHN);

    // Create candidate's profile
    createCandidateProfile('John', 'Doe', 'johndoe@mail.com');

    // Apply as John
    applyToJob(jobId);

    // Login as Jane
    VMContext.setSigner_account_id(JANE);

    // Create candidate's profile
    createCandidateProfile('Jane', 'Doe', 'janedoe@mail.com');
    
    // Apply as Jane
    applyToJob(jobId);

    expect(applications.length).toBe(2, 'should contain two applications');
    expect(applications[0].applicant.accountId).toStrictEqual(JOHN, `first applicant should be ${JOHN}`);
    expect(applications[1].applicant.accountId).toStrictEqual(JANE, `second applicant should be ${JANE}`);
  })
})

describe('getJobById()', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(CREATOR);
  });

  it('should retrieve job details given the job ID', () => {
    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);
    const jobDetails = getJobById(jobId);
    
    expect(jobDetails.id).toStrictEqual(jobId, 'job ID should match');
    expect(jobDetails.title).toStrictEqual(TITLE, `job title should be ${TITLE}`);
    expect(jobDetails.description);
    expect(jobDetails.type);
    expect(jobDetails.salary);
    expect(jobDetails.experience);
    expect(jobDetails.tags);
    expect(jobDetails.createdOn);
  })
})

describe('fetchJobs()', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(CREATOR);
  });

  it('should retrieve all the jobs created', () => {
    const title = 'UI/UX Designer';
    postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);
    postNewJob(title, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    const postedJobs = fetchJobs();
    
    expect(postedJobs.length).toBe(2, 'should contain 2 jobs');
    expect(postedJobs[0].title).toStrictEqual(TITLE, `first job title should be ${TITLE}`);
    expect(postedJobs[1].title).toStrictEqual(title, `second job title should be ${title}`);
  })
})

describe('getApplicants()', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(CREATOR);
  });

  it('should retrieve all the candidates who applied for a job', () => {
    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    // Login as John
    VMContext.setSigner_account_id(JOHN);

    // Create profile
    createCandidateProfile('John', 'Doe', 'johndoe@mail.com');
    
    // Apply as John
    applyToJob(jobId);

    // Login as Jane
    VMContext.setSigner_account_id(JANE);

    // Create profile
    createCandidateProfile('Jane', 'Doe', 'janedoe@mail.com');
    
    // Apply as Jane
    applyToJob(jobId);

    const receivedApplications = getApplicants(jobId);

    expect(receivedApplications.length).toBe(2, 'should contain 2 applications from 2 different candidates');
    expect(receivedApplications[0].id);
    expect(receivedApplications[0].submittedOn);
    expect(receivedApplications[0].jobId).toStrictEqual(jobId, `job ID should be ${jobId}`);
    expect(receivedApplications[0].applicant.accountId).toStrictEqual(JOHN, `first applicandt ID should be ${JOHN}`);
    expect(receivedApplications[1].applicant.accountId).toStrictEqual(JANE, `second applicandt ID should be ${JANE}`);
  })
})

describe('updateApplicationStatus()', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(CREATOR);
  });

  it('should update an application status to "Viewed"', () => {
    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    // Login as John
    VMContext.setSigner_account_id(JOHN);

    // Create profile
    createCandidateProfile('John', 'Doe', 'johndoe@mail.com');
    
    // Apply as John
    applyToJob(jobId);

    // Login as job creator
    VMContext.setSigner_account_id(CREATOR);

    const receivedApplications = getApplicants(jobId);

    // Mark application as 'Viewed'
    updateApplicationStatus(receivedApplications[0].id, jobId, 'Viewed');
    
    expect(applications[0].id);
    expect(applications[0].status).toStrictEqual('Viewed', 'Updated application status should equal "Viewed"');
    expect(applications[0].jobId).toStrictEqual(jobId, `job ID should be ${jobId}`);
    expect(applications[0].applicant.accountId).toStrictEqual(JOHN, `first applicandt ID should be ${JOHN}`);
  })

  it('should update an application status to "Accepted"', () => {
    const jobId = postNewJob(TITLE, DESCRIPTION, TYPE, SALARY, XP, TAGS);

    // Login as John
    VMContext.setSigner_account_id(JOHN);

    // Create profile
    createCandidateProfile('John', 'Doe', 'johndoe@mail.com');
    
    // Apply as John
    applyToJob(jobId);

    // Login as job creator
    VMContext.setSigner_account_id(CREATOR);

    const receivedApplications = getApplicants(jobId);

    // Mark application as 'Viewed'
    updateApplicationStatus(receivedApplications[0].id, jobId, 'Accepted');
    
    expect(applications[0].id);
    expect(applications[0].status).toStrictEqual('Accepted', 'Updated application status should equal "Accepted"');
    expect(applications[0].jobId).toStrictEqual(jobId, `job ID should be ${jobId}`);
    expect(applications[0].applicant.accountId).toStrictEqual(JOHN, `first applicandt ID should be ${JOHN}`);
  })
})
