#!/bin/bash

CF_API_TOKEN="${CF_API_TOKEN}"
ZONE_NAME="team32.org"
RECORD_NAME="team32.org"

ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=${ZONE_NAME}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')

RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?name=${RECORD_NAME}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')

CURRENT_IP=$(curl -s http://checkip.amazonaws.com)

RESPONSE=$(curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"A\",\"name\":\"${RECORD_NAME}\",\"content\":\"${CURRENT_IP}\",\"ttl\":1,\"proxied\":false}")

if echo "$RESPONSE" | jq -e '.success' | grep -q true; then
  echo "✅ Updated ${RECORD_NAME} to ${CURRENT_IP}"
else
  echo "❌ Failed to update record"
  echo "$RESPONSE"
fi
