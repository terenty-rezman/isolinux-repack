#!/bin/sh

echo 'Content-type: text/html'
echo ''

. ./contentdiv.cgi

contentdiv Dmesg 'Dmesg' "dmesg"
contentdiv LogMessages 'Messages log' "cat /var/log/messages"

