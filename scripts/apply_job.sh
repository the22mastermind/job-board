#!/usr/bin/env bash

near call $CONTRACT_NAME applyToJob '{"jobId": "JOB-849814765"}' --accountId $APPLICANT_ACCOUNT_ID --amount 0.5

exit 0
