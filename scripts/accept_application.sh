#!/usr/bin/env bash

# Update application status
near call $CONTRACT_NAME updateApplicationStatus '{"applicationId": "APPL-3038621156", "jobId": "JOB-3875970732", "status": "Accepted"}' --accountId $ACCOUNT_ID --amount 0.5

exit 0
