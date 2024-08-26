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

if [[ -z "${LOGO_SIZE}" ]]; then
    LOGO_SIZE="M"
fi

if [[ -z "${DM_LOGO_COLOR}" ]]; then
    DM_LOGO_COLOR="#FFFFFF"
fi

if [[ -z "${LM_LOGO_COLOR}" ]]; then
    LM_LOGO_COLOR="#000000"
fi

if [[ "${DM_LOGO_COLOR}" = "original" ]]; then
    DM_LOGO_COLOR=""
fi

if [[ "${LM_LOGO_COLOR}" = "original" ]]; then
    LM_LOGO_COLOR=""
fi

if [[ ! -f /app/build/config.json ]]; then
    touch /app/build/config.json
else
    rm touch /app/build/config.json
    touch touch /app/build/config.json
fi

case "$LOGO_SIZE" in
    xs|XS|Xs|xS)
        TAILWIND_LOGO_SIZE="w-12"
        ;;
    s|S)
        TAILWIND_LOGO_SIZE="w-16"
        ;;
    m|M)
        TAILWIND_LOGO_SIZE="w-20"
        ;;
    l|L)
        TAILWIND_LOGO_SIZE="w-24"
        ;;
    xl|XL|Xl|xL)
        TAILWIND_LOGO_SIZE="w-32"
        ;;
esac

echo "================== DockStat =================="
echo "API_URL               : ${API_URL}"
echo "DEFAULT_THEME         : ${DEFAULT_THEME}"
echo "SECRET                : ${SECRET}"
echo "LOGO SIZE             : ${LOGO_SIZE}"
echo "TAILWIND LOGO SIZE    : ${TAILWIND_LOGO_SIZE}"
echo "DARK MODE LOGO COLOR  : ${DM_LOGO_COLOR}"
echo "LIGHT MODE LOGO COLOR : ${LM_LOGO_COLOR}"
echo "================== DockStat =================="

echo "
{
    \"API_URL\": \"${API_URL}\",
    \"DEFAULT_THEME\": \"${DEFAULT_THEME}\",
    \"SECRET\": \"${SECRET}\",
    \"LOGO_SIZE\": \"${TAILWIND_LOGO_SIZE}\",
    \"DARK_MODE_LOGO_COLOR\": \"$(echo "${DM_LOGO_COLOR}" | tr -d '#')\",
    \"LIGHT_MODE_LOGO_COLOR\": \"$(echo "${LM_LOGO_COLOR}" | tr -d '#')\"
}
" > /app/build/config.json

exec serve -s build
