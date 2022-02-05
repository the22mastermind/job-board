#!/usr/bin/env bash

near call $CONTRACT_NAME post_job '{"title": "UX Developer", "description": "UX Developer needed", "jobType": "Contract"}' --accountId $ACCOUNT_ID --amount 0.005

exit 0
