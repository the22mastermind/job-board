#!/usr/bin/env bash

near view $CONTRACT_NAME getJobById '{"jobId": "JOB-849814765"}' --accountId $ACCOUNT_ID

exit 0
