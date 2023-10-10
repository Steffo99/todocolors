#!/usr/bin/env fish

set n \n
set q "`"

jq --raw-output "(.third_party_libraries[]) | {\"dep\": (.package_name), \"license\": (.license), \"text\": (.licenses[] | \"#### \" + (.license) + \"$n$n$q$q$q$n\" + (.text) + \"$n$q$q$q\")} | \"### \" + (.dep) + \" · $q\" + (.license) + \"$q$n$n\" + (.text) + \"$n\"" < NOTICE.json > NOTICE.md
