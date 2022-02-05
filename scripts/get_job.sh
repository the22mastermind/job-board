#!/usr/bin/env bash

near view $CONTRACT_NAME get_job '{"jobId": "JOB-1461965843"}' --accountId $ACCOUNT_ID

exit 0
