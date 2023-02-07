#!/bin/bash
source env.sh
folder="./images"



for file in $folder/*
do
  file_name="celebrities_$(basename "$file")"
  curl -X POST -F file=@"$file" -H "Authorization: Bearer $api_token" "https://api.cloudflare.com/client/v4/accounts/fb107de260e3804f1c57204b925dfb97/images/v1" -F "name=$file_name"
done
