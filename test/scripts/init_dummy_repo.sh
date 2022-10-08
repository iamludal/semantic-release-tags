#!/bin/bash

remote_url=$1

if [ -z "$remote_url" ]; then
    echo "Usage: $0 <remote_url>"
    exit 1
fi

repo_root=$(dirname $0)/../..

# Create a dummy repo
cd $repo_root/test/dummy_repo
git init
git remote add origin $remote_url
npm install
