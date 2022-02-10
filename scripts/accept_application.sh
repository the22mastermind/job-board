#!/usr/bin/env bash

# Update application status
near call $CONTRACT_NAME updateApplicationStatus '{"applicationId": "APPL-3433295645", "jobId": "JOB-3591801666", "status": "Accepted"}' --accountId $ACCOUNT_ID --amount 0.5

exit 0
