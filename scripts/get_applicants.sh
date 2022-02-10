#!/usr/bin/env bash

near view $CONTRACT_NAME getApplicants '{"jobId": "JOB-3591801666"}' --accountId $ACCOUNT_ID

exit 0
