#!/bin/sh

echo 'Content-type: text/html'
echo ''

. ./contentdiv.cgi

contentdiv Dmesg 'Dmesg' "dmesg"
contentdiv LogStartup 'Startup log' "cat /var/log/startup.log"
contentdiv LogRTFE 'Rtfe log' "cat /var/log/rtfe.log"
contentdiv LogMessages 'Messages log' "cat /var/log/messages"

