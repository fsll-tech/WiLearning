#!/bin/sh
DEBUG='classvideo-server:* mediasoup:*'

if [ -f "server.js" ]
then
	node server.js --cert certs/rtc.liweix.com.pem --key certs/rtc.liweix.com.key --eth wlan0
elif [ -f "server.ts" ]
then
	npx ts-node server.ts --cert certs/rtc.liweix.com.pem --key certs/rtc.liweix.com.key --eth wlan0
else
	echo
	echo "Do not find executable file"
fi
