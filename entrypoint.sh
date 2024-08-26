#!/bin/bash

API_URL="${API_URL//\"}"
DEFAULT_THEME="${DEFAULT_THEME//\"}"
SECRET="${SECRET//\"}"
LOGO_SIZE="${LOGO_SIZE//\"}"
DM_LOGO_COLOR="${DM_LOGO_COLOR//\"}"
LM_LOGO_COLOR="${LM_LOGO_COLOR//\"}"

if [[ -z "${DEFAULT_THEME}" ]]; then
    DEFAULT_THEME="dracula"
fi

if [[ ! -f /app/build/config.json ]]; then
    touch /app/build/config.json
else
    rm touch /app/build/config.json
    touch touch /app/build/config.json
fi

case "$LOGO_SIZE" in
    s|S)
        LOGO_SIZE="s"
        ;;
    m|M)
        LOGO_SIZE="m"
        ;;
    l|L)
        LOGO_SIZE="l"
        ;;
    xl|XL|Xl|xL)
        LOGO_SIZE="xl"
        ;;
esac

echo "================== DockStat =================="
echo "API_URL               : ${API_URL}"
echo "DEFAULT_THEME         : ${DEFAULT_THEME}"
echo "SECRET                : ${SECRET}"
echo "LOGO SIZE             : ${LOGO_SIZE}"
echo "DARK MODE LOGO COLOR  : ${DM_LOGO_COLOR}"
echo "LIGHT MODE LOGO COLOR : ${LM_LOGO_COLOR}"
echo "================== DockStat =================="

echo "
{
    \"API_URL\": \"${API_URL}\",
    \"DEFAULT_THEME\": \"${DEFAULT_THEME}\",
    \"SECRET\": \"${SECRET}\",
    \"LOGO_SIZE\": \"${LOGO_SIZE}\",
    \"DARK_MODE_LOGO_COLOR\": \"$(echo "${DM_LOGO_COLOR}" | tr -d '#')\",
    \"LIGHT_MODE_LOGO_COLOR\": \"$(echo "${LM_LOGO_COLOR}" | tr -d '#')\"
}
" > /app/build/config.json

exec serve -s build
