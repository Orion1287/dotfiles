import Hyprland from "gi://AstalHyprland"
import { App, Astal, Gtk, Gdk, bind } from "astal/gtk4"
import { Variable } from "astal"
import Workspaces from "./Workspaces.tsx"

const hyprland = Hyprland.get_default();

const time = Variable("").poll(1000, "date '+%a %d %b · %I:%M %p'")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        visible
        cssClasses={["Bar"]}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>

        {/* Use a horizontal box for full control */}
        <box orientation={Gtk.Orientation.HORIZONTAL} hexpand vexpand>

            {/* Optional: left filler */}
           {/* Optional: left filler */}
         <box hexpand><Workspaces /></box>
            {/* Time widget aligned to the right */}
            <menubutton halign={Gtk.Align.END}>
                <label label={time()} />
                <popover>
                    <Gtk.Calendar />
                </popover>
            </menubutton>
        </box>
    </window>
}


