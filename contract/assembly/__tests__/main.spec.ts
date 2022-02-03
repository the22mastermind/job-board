import { Context, VMContext } from 'near-sdk-as';
import { post_job, apply_job } from '..';
import { jobs, applications } from '../storage';
import { ApplicationData, GAS } from '../utils';

const CREATOR = "jirf.testnet";
const TITLE = 'Senior Blockchain Developer';
const DESCRIPTION = 'Senior Blockchain Developer wanted ASAP.';
const TYPE = 'Full-Time';
const JOHN = 'john.testnet';
const JANE = 'jane.testnet';

describe('Creates a new job', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(CREATOR);
  });

  it('should retrieve no jobs', () => {
    expect(jobs.length).toBe(0, 'should contain no jobs');
  })

  it('should create a new job', () => {
    const jobId = post_job(TITLE, DESCRIPTION, TYPE);

    expect(jobs.length).toBe(1, 'should contain one job');
    expect(jobs[0].id).toStrictEqual(jobId, `job ID should equal ${jobId}`);
    expect(jobs[0].title).toStrictEqual(TITLE, `job title should be ${TITLE}`);
  })

  it('should retrieve jobs', () => {
    const title = 'UI/UX Designer';

    const jobId = post_job(TITLE, DESCRIPTION, TYPE);
    const nextJobId = post_job(title, DESCRIPTION, TYPE);

    expect(jobs.length).toBe(2, 'should contain two job');
    expect(jobs[0].title).toStrictEqual(TITLE, `job title should be ${TITLE}`);
    expect(jobs[1].title).toStrictEqual(title, `Job title should be ${title}`);
    expect(jobId).not.toBe(nextJobId, 'Job IDs should be different');
    expect(jobs[1].postedBy).toBe(Context.sender, 'Sender ID should equal postedBy');
  })
})

describe('Apply to a job', () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(GAS);
    VMContext.setSigner_account_id(JOHN);
  });

  it('Should retrieve no applications (empty)', () => {
    const jobId = post_job(TITLE, DESCRIPTION, TYPE);
    const currentApplications = applications.get(jobId, []) as ApplicationData;
    
    expect(currentApplications.length).toStrictEqual(0, 'should contain no applications');
  })

  it('A candidate applies to a job', () => {
    const jobId = post_job(TITLE, DESCRIPTION, TYPE);
    apply_job(jobId);

    const currentApplications = applications.get(jobId) as ApplicationData;

    expect(currentApplications.length).toStrictEqual(1, 'Should contain one application');
    expect(currentApplications[0]).toStrictEqual(Context.sender, 'Should be ID of John');
  })

  it('Two candidates apply to the same job', () => {
    const jobId = post_job(TITLE, DESCRIPTION, TYPE);
    // Apply as John
    apply_job(jobId);

    let currentApplications = applications.get(jobId) as ApplicationData;
    
    expect(currentApplications.length).toBe(1, 'Should contain one application');
    expect(currentApplications[0]).toStrictEqual(Context.sender, 'Should contain ID of John');

    VMContext.setSigner_account_id(JANE);
    // Apply as Jane
    apply_job(jobId);

    currentApplications = applications.get(jobId) as ApplicationData;

    expect(currentApplications.length).toBe(2, 'Should contain two applications');
    expect(currentApplications[1]).toStrictEqual(Context.sender, 'Should contain ID of Jane');
  })
})
