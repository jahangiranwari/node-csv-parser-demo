#!/bin/bash
set -eo pipefail

OIFS="$IFS"
IFS=$'\n'

usage() {
  echo "Usage: $0 [-f file] [-d directory]" 1>&2; exit 1;
}

csv_to_json() {
  file=$1
  json_file="${file%.csv}.json"
  csv-parser "$file" -o $json_file
  echo "Generated $json_file"
}

convert_files() {
  dir=$1
  for filename in $dir/*.csv; do
    [ -e "$filename" ] || continue
    csv_to_json $filename
  done
}

while getopts ":f:d:" opt; do
    case $opt in
        f)
            f=$OPTARG
            csv_to_json $f
            ;;
        d)
            d=$OPTARG
            convert_files $d
            ;;
        *)
            usage
            exit
            ;;
    esac
done
shift $((OPTIND-1))
IFS="$OIFS"

if [ -z "$f" ] && [ -z "$d" ]; then
  usage
  exit
fi
