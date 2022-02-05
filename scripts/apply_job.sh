#!/usr/bin/env bash

near call $CONTRACT_NAME apply_job '{"jobId": "JOB-1461965843"}' --accountId $APPLICANT_ACCOUNT_ID --amount 0.005

exit 0
