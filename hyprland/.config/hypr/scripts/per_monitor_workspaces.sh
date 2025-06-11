
#!/bin/bash

# Usage: per_monitor_workspace.sh switch 1
#        per_monitor_workspace.sh move 1

ACTION=$1       # "switch" or "move"
INDEX=$2        # 1–5

# Get active monitor based on cursor position
CURSOR_X=$(hyprctl cursorpos | cut -d, -f1)
MONITOR=$(hyprctl monitors -j | jq -r --argjson cx "$CURSOR_X" '
  sort_by(.x) | reverse | map(select($cx >= .x)) | .[0].name
')

# Optional: match specific monitor name
if [ "$MONITOR" = "eDP-1" ]; then
  OFFSET=0
else
  OFFSET=5
fi

REAL_WS=$((INDEX + OFFSET))

if [ "$ACTION" == "switch" ]; then
  hyprctl dispatch workspace "$REAL_WS"
elif [ "$ACTION" == "move" ]; then
  hyprctl dispatch movetoworkspace "$REAL_WS"
fi
