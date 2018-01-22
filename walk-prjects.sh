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
  echo \"$project\" :
  source ../raider-release-times/git-report.sh
  echo ,
  cd - > /dev/null
done
echo "\"end\": []}"
