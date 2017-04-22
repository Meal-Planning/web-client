#!/bin/bash

echo '****************************************'
echo '          Stopping web-client           '
echo '****************************************'
docker stop nutritionapp_web-client_1
echo '****************************************'
echo '          web-client stopped            '
echo '****************************************'
echo ''
echo ''
echo '****************************************'
echo '             Starting build             '
echo '****************************************'
npm run build
echo '****************************************'
echo '            Build successful            '
echo '****************************************'
echo ''
echo ''
echo '****************************************'
echo '          Starting web-client           '
echo '****************************************'
docker start nutritionapp_web-client_1
echo '****************************************'
echo '          web-client started            '
echo '****************************************'