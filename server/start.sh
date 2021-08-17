#!/bin/sh
DEBUG='classvideo-server:* mediasoup:*'

if [ -f "server.js" ]
then
	node server.js
elif [ -f "server.ts" ]
then
	ts-node server.ts
else
	echo
	echo "Do not find executable file"
fi
