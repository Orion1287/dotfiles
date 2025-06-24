#!/bin/bash

spotify &

# Wait for the window to appear
sleep 3

# Minimize the Spotify window
wmctrl -r "Spotify" -b add,hidden

