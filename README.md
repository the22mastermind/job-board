job-board
==================

Job-Board is a smart contract decentralized application, running on NEAR Blockchain Protocol, that simplifies the process of hiring candidates for full-time or contract based jobs.


Features
-------------------------------------

1. Create a job post
2. View jobs posted
3. View a specific job given its ID
4. Create candidate's profile
5. Apply to a job
6. View candidates who applied to a job
7. View an application
8. Accept an application


How to use
-------------------------------------

1. Clone this repo then run `cd job-board`

2. Run `yarn` to instal dependencies

3. Run `yarn test` to run tests

4. Authorize NEAR CLI, following the commands it gives you:

      Run `near login`

5. Run `yarn dev:deploy` to deploy the contract on testnet

6. Copy the Account_id in the returned response. It looks like: `dev-1643744622686-69960108730252`. This is our contract name

7. Run `export CONTRACT_NAME=ACCOUNT_ID_COPIED_ABOVE`

8. Run `export ACCOUNT_ID=YOUR-NAME.testnet`

9. Head over `https://wallet.testnet.near.org/` and create a new account to use as APPLICANT_ACCOUNT_ID

10. Run `export APPLICANT_ACCOUNT_ID=APPLICANT_ACCOUNT_ID.testnet`

11. Interract with the deployed contract using scripts:
      
      Run `yarn post` to create a new job
      
      Run `yarn fetch` to retrieve all the jobs posted

      Run `yarn get` to retrieve a job by its ID. Before running this command, make sure you copy the returned jobId after running `yarn post` and replace it in `scripts/get_job.sh`.

      Run `yarn apply` to apply to a job. Before running this command, make sure you copy the returned jobId after running `yarn post` and replace it in `scripts/apply_job.sh`.

      If you run `yarn apply` again, the application will panic because in a real-life scenario, a candidate cannot apply to the same job more than once.

      Inside `scripts/apply_job.sh` we are running two commands. The first creates a candidate's profile since a profile is required before being able to apply to jobs. The second command applies to a job.
      
      Run `yarn get_applicants` to retrieve all the candidates who applied to a job
      
      Replace `applicationId` and `jobId` in `view_application.sh` with real values then run `yarn view_application` to view a candidate's application.

      Replace `applicationId` and `jobId` in `accept_application.sh` with real values then run `yarn accept_application` to accept a candidate's application.


Future improvements
-------------------------------------

1. Create a smart contract to hold employers details and implement cross-contract calls to Jobs

2. Create a smart contract to hold candidates CVs and implement cross-contract calls to Candidate

3. Build a React frontend for this [Mockup](https://www.figma.com/proto/l7TLJFbryvwadCpnnDjGFO/Job-Board?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2)

4. Connect frontend to smart contracts


Contributors
-------------------------------------

[Bertrand](https://github.com/the22mastermind)


References
-------------------------------------
  
[create-near-app](https://github.com/near/create-near-app)

[Node.js](https://nodejs.org/en/download/package-manager/)

[jest](https://jestjs.io/)

[NEAR accounts](https://docs.near.org/docs/concepts/account)

[NEAR Wallet](https://wallet.testnet.near.org/)

[near-cli](https://github.com/near/near-cli)
