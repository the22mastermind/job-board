import { Context, VMContext } from 'near-sdk-as';
import { post_job } from '..';
import { jobs } from '../storage';
import { GAS } from '../utils';

const CREATOR = "jirf.testnet";
const TITLE = 'Senior Blockchain Developer';
const DESCRIPTION = 'Senior Blockchain Developer wanted ASAP.';
const TYPE = 'Full-Time';

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
