#!/bin/bash

commit_type=$1
breaking_change=$2

if [ -z "$commit_type" ]; then
    echo "Usage: $0 <commit_type> [breaking-change: true|false]"
    exit 1
elif [ command -v openssl >/dev/null 2>&1 ]; then
    echo "openssl is required to generate a random commit message"
    exit 1
fi

repo_root=$(dirname $0)/../..

# Create a dummy commit
cd $repo_root/test/dummy_repo
random=$(openssl rand -hex 8)
commit_msg="$commit_type: dummy commit $random"

if [ "$breaking_change" = "true" ]; then
    commit_msg+=$'\n\nBREAKING CHANGE: dummy breaking change'
fi

echo $random > dummy.txt
git add dummy.txt
git commit -m "$commit_msg"
git push origin $(git branch --show-current)
