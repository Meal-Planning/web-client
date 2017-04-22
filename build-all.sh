#!/bin/bash

echo '****************************************'
echo '        Stopping docker-compose         '
echo '****************************************'
cd ../nutrition-app/
docker-compose stop
echo '****************************************'
echo '        docker-compose stopped          '
echo '****************************************'
echo ''
echo ''
echo '****************************************'
echo '             Starting build             '
echo '****************************************'
cd ../web-client/
npm run build
echo '****************************************'
echo '            Build successful            '
echo '****************************************'
echo ''
echo ''
echo '****************************************'
echo '        Starting docker-compose         '
echo '****************************************'
cd ../nutrition-app/
docker-compose start
echo '****************************************'
echo '        docker-compose started          '
echo '****************************************'