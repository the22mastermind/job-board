job-board
==================

This app was initialized with [create-near-app]


Step 0: Installation
-------------------------------------

1. Clone this repo

2. Run `yarn` to instal dependencies

3. Run `yarn test` to run tests

4. Authorize NEAR CLI, following the commands it gives you:

      near login

5. Run `near dev-deploy out/main.wasm` to deploy the contract on testnet

6. Copy the Account_id in the returned response. It looks like: `dev-1643744622686-69960108730252`. This is our contract name

7. Run `export CONTRACT_NAME=ACCOUNT_ID_COPIED_ABOVE`

8. Run `export ACCOUNT_ID=YOUR-NAME.testnet`

9. Head over `https://wallet.testnet.near.org/` and create a new account to use as APPLICANT_ACCOUNT_ID

10. Run `export APPLICANT_ACCOUNT_ID=APPLICANT_ACCOUNT_ID.testnet`

11. Deploy the contract to testnet
      
      Run `yarn dev:deploy:contract`

12. Interract with the deployed contract using scripts:
      
      Run `yarn post_job` to create a new job
      
      Run `yarn fetch_jobs` to retrieve all the jobs

      Run `yarn get_job` to retrieve a job by its ID

      Run `yarn apply_job` to apply to a job


References
-------------------------------------
  
[create-near-app]: https://github.com/near/create-near-app
[Node.js]: https://nodejs.org/en/download/package-manager/
[jest]: https://jestjs.io/
[NEAR accounts]: https://docs.near.org/docs/concepts/account
[NEAR Wallet]: https://wallet.testnet.near.org/
[near-cli]: https://github.com/near/near-cli
[gh-pages]: https://github.com/tschaub/gh-pages
