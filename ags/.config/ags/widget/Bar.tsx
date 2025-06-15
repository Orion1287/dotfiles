import AstalHyprland from "gi://AstalHyprland";
import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { Variable } from "astal"
import Workspaces from "./Workspaces.tsx"

const time = Variable("").poll(1000, "date '+%H:%M - %A %e'")
const hyprland = AstalHyprland.get_default();

export default function Bar(gdkMonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    return (
        <window
            visible
            cssClasses={["Bar"]}
            gdkmonitor={gdkMonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={App}
        >
            <box orientation={Gtk.Orientation.HORIZONTAL} hexpand vexpand>

                {/* Workspaces on the far left */}
                <Workspaces gdkMonitor={gdkMonitor} />

                {/* Expanding spacer */}
                <box hexpand />

                {/* Time widget on the far right */}
                <menubutton halign={Gtk.Align.END}>
                    <label label={time()} />
                    <popover>
                        <Gtk.Calendar />
                    </popover>
                </menubutton>

            </box>
        </window>
    );
}

