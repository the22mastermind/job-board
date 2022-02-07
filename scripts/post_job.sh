#!/usr/bin/env bash

near call $CONTRACT_NAME postNewJob '{"title": "UX Developer", "description": "UX Developer needed", "jobType": "Contract", "salary": "$500", "experience": "Junior", "tags": ["UX", "Design"]}' --accountId $ACCOUNT_ID --amount 0.5

exit 0
