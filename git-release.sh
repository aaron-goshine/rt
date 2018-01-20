#! /bin/bash

project=$(basename `pwd`)

echo "["
git log --tags --simplify-by-decoration --pretty="format:%ai %d" |
  egrep  -v "(scraper | lastGreenBuild)" |
  head -n 1|
  awk 'BEGIN { FS=" " }{print "{\"time\": \""$1 " " $2 " " $3"\", \"name\": \"'$project'\" }"}'

# last scraper release 
git log --tags --simplify-by-decoration --pretty="format:%ai %d" |
  egrep "scraper" |
  head -n 1|
  awk 'BEGIN { FS=" " }{print ",{\"time\": \""$1 " " $2 " " $3"\", \"name\": \"'$project'-scraper\" }"}'

# last scraper release 
git log --tags --simplify-by-decoration --pretty="format:%ai %d" |
  egrep  "lastGreenBuild" |
  head -n 1|
  awk 'BEGIN { FS=" " }{print ",{\"time\": \""$1 " " $2 " " $3"\", \"name\": \"'$project'-green-build\" }"}'
echo "]"


