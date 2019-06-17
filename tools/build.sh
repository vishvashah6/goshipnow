#!/bin/sh

if [ "$1" = "" ]; then
  echo "usage: $0 <target>"
  exit
fi

if [ "$OS" != 'Windows_NT' ]; then
  rootDir=~/projects/goshipnowweb
else
  rootDir=/c/projects/goshipnowweb
fi

cd $rootDir
if [ $? -gt 0 ]; then
  echo Could not cd to $rootDir
  exit 1
fi

if [ "$1" = "staging" ]; then
  export options="--env=staging"
elif [ "$1" = "production" ]; then
  export options="--prod --env=prod"
elif [ "$1" = "development" ]; then
  export options="--env=dev"
else 
  echo "Fatal: invalid build target '$1'"
  exit
fi

echo "Build options: $options ..."
ng build $options
