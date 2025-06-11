#!/bin/sh
slstatus &
feh --bg-scale ~/.config/wallpapers/1264671.jpg &
picom -b &
brightnessctl -d amdgpu_bl1 set 255
redshift -O 4200 &
setxkbmap -option caps:escape
xrandr --output HDMI-A-0 --left-of eDP
exec dwm

