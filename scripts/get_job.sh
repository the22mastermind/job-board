#!/usr/bin/env bash

near view $CONTRACT_NAME getJobById '{"jobId": "JOB-916933002"}' --accountId $ACCOUNT_ID

exit 0
