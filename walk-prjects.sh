#!/bin/bash

declare -a projects=(
"raider-admin"
"raider-android"
"raider-api"
"raider-ios"
"raider-orders"
"raider-website")

echo "{"
for project in "${projects[@]}"; 
do 
  cd ../$project > /dev/null
  # uncomment this to out put separate files per projects
  # source ../raider-release-times/git-release.sh > ../raider-release-times/$project.json
  echo \"$project\" :
  source ../raider-release-times/git-release.sh
  echo ,
  cd - > /dev/null
done
echo "\"end\": []}"
