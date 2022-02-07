#!/usr/bin/env bash

near view $CONTRACT_NAME getApplicants '{"jobId": "JOB-849814765"}' --accountId $ACCOUNT_ID

exit 0
