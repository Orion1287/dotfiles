import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import { Gdk } from "astal/gtk4";

const hyprland = Hyprland.get_default();

export default function Workspaces({ gdkMonitor }: { gdkMonitor: Gdk.Monitor }) {
    const focusedWorkspace = bind(hyprland, "focusedWorkspace");
    const monitorName = gdkMonitor.get_connector();

    return (
        <box cssClasses={["workspaces"]}>
            {
                bind(hyprland, "workspaces").as((workspaces) => {
                    const filtered = workspaces
                        .filter(ws => ws.monitor?.name === monitorName)
                        .sort((a, b) => a.id - b.id);

                    log(`🧪 GDK Monitor Name: ${monitorName}`);
                    log(`🎯 Matching workspaces: ${JSON.stringify(filtered.map(w => w.name))}`);

                    return filtered.map((workspace) => (
                        <button
                            key={workspace.id}
                            cssClasses={focusedWorkspace.as(focused =>
                                focused?.id === workspace.id ? ["active"] : []
                            )}
                            onClicked={() => workspace.focus()}
                        >
                            {workspace.name}
                        </button>
                    ));
                })
            }
        </box>
    );
}

