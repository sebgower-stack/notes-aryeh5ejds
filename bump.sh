#!/bin/bash
# Usage: ./bump.sh  -> stamps current NZ time into sw.js, version.json, header label, asset ?v=
set -e; cd "$(dirname "$0")"
V=$(TZ=Pacific/Auckland date +%Y-%m-%dT%H:%M:%S)
L="Updated $(TZ=Pacific/Auckland date +'%-d %b, %-I:%M%p' | sed 's/AM$/am/;s/PM$/pm/')"
sed -i "s/^const VERSION=\".*\";/const VERSION=\"$V\";/" sw.js
sed -i "s/^const BUILD=\".*\";/const BUILD=\"$V\";/" index.html
sed -i "s#<div id=\"ver\"\([^>]*\)>[^<]*</div>#<div id=\"ver\"\1>$L</div>#" index.html
sed -i -E "s/\?v=[0-9A-Za-z:T-]+\"/?v=$V\"/g" index.html
printf '{"version":"%s","label":"%s"}\n' "$V" "$L" > version.json
echo "$V | $L"
