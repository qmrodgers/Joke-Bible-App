#!/bin/bash

source env.sh

folder="./public/images/"

for file in $folder/*
do
    mv file "celebrities_$file"
done
