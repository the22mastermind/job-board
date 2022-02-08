#!/usr/bin/env bash

near view $CONTRACT_NAME getApplicants '{"jobId": "JOB-3875970732"}' --accountId $ACCOUNT_ID

exit 0
