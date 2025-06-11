
#!/bin/bash

ACTION=$1  # "switch" or "move"
INDEX=$2   # Desired workspace index: 1–5

MON_IDX=$(hyprctl monitors -j | jq -r '
  .[] | select(.focused == true) | .id
')
COUNT=5  # workspaces per monitor

REAL_WS=$(( MON_IDX * COUNT + INDEX ))

if [ "$ACTION" = "switch" ]; then
  hyprctl dispatch workspace "$REAL_WS"
elif [ "$ACTION" = "move" ]; then
  hyprctl dispatch movetoworkspacesilent "$REAL_WS"
fi
