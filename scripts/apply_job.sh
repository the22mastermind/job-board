#!/usr/bin/env bash

# Create candidate's profile
near call $CONTRACT_NAME createCandidateProfile '{"firstName": "John", "lastName": "Doe", "email": "johndoe@mail.com"}' --accountId $APPLICANT_ACCOUNT_ID --amount 0.5

# Apply to a job
near call $CONTRACT_NAME applyToJob '{"jobId": "JOB-3591801666"}' --accountId $APPLICANT_ACCOUNT_ID --amount 0.5

exit 0
