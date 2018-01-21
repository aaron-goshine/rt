#! /bin/bash

exec `python -m SimpleHTTPServer 8021` &

while true ;
do 
  ./walk-prjects.sh > ./raider-release.json
  sleep 1 
done 

