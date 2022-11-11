#!/usr/bin/env bash

# get url from parameter url
url=$1

# create folder font
mkdir -p font

# load content of url wget
content=$(curl -s $url -o font.css -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'User-Agent: AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116')

pat="https://fonts.gstatic.com/s/[^/]+/v[^/]+/[^/]+\.woff2";
# open font.css read line by line
while read line; do
    # if line contains google font url with woff2
    if [[ $line =~ $pat ]]; then
        # get font name from line
        fontname=${BASH_REMATCH[0]}
        # get font name from url
        fontname=${fontname##*/}
        # get font name from url
        fontname=${fontname%.woff2}
        echo "downloaded $fontname.woff2"
        # download font with curl
        curl -s ${BASH_REMATCH[0]} -o font/$fontname.woff2 -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'User-Agent: AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116'
    fi
done < font.css
