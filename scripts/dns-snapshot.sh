#!/usr/bin/env bash
# Snapshot every DNS record that matters for sam-rad.com, so the move from
# Squarespace-hosted DNS to GoDaddy-hosted DNS can be verified by diff instead of by
# eyeballing two dashboards.
#
#   ./scripts/dns-snapshot.sh before    # run BEFORE touching anything
#   ./scripts/dns-snapshot.sh after     # run after the nameserver change propagates
#   diff /tmp/dns-before.txt /tmp/dns-after.txt
#
# An empty diff is the whole goal. If the two zones answer identically, the switch is
# invisible to visitors and to email regardless of how long propagation takes.
#
# Queries 1.1.1.1 directly rather than the local resolver, which caches aggressively
# and will happily tell you nothing changed when everything did.

set -u
DOMAIN="${DOMAIN:-sam-rad.com}"
LABEL="${1:-snapshot}"
OUT="/tmp/dns-${LABEL}.txt"
RESOLVER="${RESOLVER:-1.1.1.1}"

q() { # q <name> <type>
  printf '%-34s %-6s ' "$1" "$2"
  dig +short "@${RESOLVER}" "$1" "$2" 2>/dev/null | sort | tr '\n' ' '
  printf '\n'
}

{
  echo "# DNS snapshot: ${DOMAIN}   label=${LABEL}   $(date -u '+%Y-%m-%d %H:%M UTC')"
  echo "# resolver: ${RESOLVER}"
  echo

  echo "## nameservers  (this is what the move actually changes)"
  q "${DOMAIN}" NS
  echo

  echo "## the site"
  q "${DOMAIN}" A
  q "${DOMAIN}" AAAA
  q "www.${DOMAIN}" CNAME
  q "www.${DOMAIN}" A
  q "archive.${DOMAIN}" CNAME
  echo

  echo "## email. Get these wrong and mail stops. Five Google Workspace MX expected."
  q "${DOMAIN}" MX
  echo

  echo "## email authentication. Silently degrades deliverability if lost."
  q "${DOMAIN}" TXT
  q "google._domainkey.${DOMAIN}" TXT
  q "_dmarc.${DOMAIN}" TXT
  q "_domainkey.${DOMAIN}" TXT
  echo

  # SPF often points at another record with include:, and that record can live inside
  # this same zone (Squarespace puts one at dc-<id>._spfm.<domain>). A sweep of the
  # usual names misses it, which is exactly what happened on 14 Sep 2026. Follow every
  # include one level down so it is captured before the zone moves.
  echo "## SPF includes, followed one level"
  for inc in $(dig +short "@${RESOLVER}" "${DOMAIN}" TXT | tr -d '"' | tr ' ' '\n' | sed -n 's/^include://p'); do
    q "$inc" TXT
  done
  echo

  echo "## other"
  q "${DOMAIN}" CAA
  q "${DOMAIN}" SOA
  echo

  echo "## redirected domains, should be unaffected but confirm"
  for d in samrad.ai samradocchia.com samradofficial.com samantharadocchia.com; do
    q "$d" A
  done
  echo

  echo "## live checks"
  printf '%-34s %s\n' "https://${DOMAIN}/" "$(curl -s -o /dev/null -w '%{http_code}' -L "https://${DOMAIN}/")"
  printf '%-34s %s\n' "https://www.${DOMAIN}/" "$(curl -s -o /dev/null -w '%{http_code}' -L "https://www.${DOMAIN}/")"
  printf '%-34s %s\n' "https://${DOMAIN}/cv" "$(curl -s -o /dev/null -w '%{http_code}' -L "https://${DOMAIN}/cv")"
  printf '%-34s %s\n' "https://${DOMAIN}/blog/anything" "$(curl -s -o /dev/null -w '%{http_code}' -L "https://${DOMAIN}/blog/anything")"
} | tee "${OUT}"

echo
echo "written: ${OUT}"
