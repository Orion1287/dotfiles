
#!/bin/bash

# Usage: switch_ws.sh switch 1
#        switch_ws.sh move 1

ACTION=$1  # "switch" or "move"
INDEX=$2   # workspace index 1–5

# Get active monitor
ACTIVE_MON=$(hyprctl monitors -j | jq -r '.[] | select(.focused==true).name')

# Workspace offset per monitor
if [ "$ACTIVE_MON" == "eDP-1" ]; then
    OFFSET=0   # laptop screen gets workspaces 1–5
else
    OFFSET=5   # external screen gets 6–10
fi

REAL_WS=$((INDEX + OFFSET))

if [ "$ACTION" == "switch" ]; then
    hyprctl dispatch workspace "$REAL_WS"
elif [ "$ACTION" == "move" ]; then
    hyprctl dispatch movetoworkspace "$REAL_WS"
fi
