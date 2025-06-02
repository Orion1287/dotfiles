
import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

const hyprland = Hyprland.get_default();

export default function Workspaces() {
  // Bind once outside map for performance
  const focusedWorkspace = bind(hyprland, "focusedWorkspace");

  return (
    <box cssClasses={["workspaces"]}>
      {
        bind(hyprland, "workspaces").as((workspaces) =>
          workspaces
            .sort((a, b) => a.id - b.id)
            .map((workspace) => (
              <button
                key={workspace.id}
                cssClasses={focusedWorkspace.as(focused =>
                  focused?.id === workspace.id ? ["active"] : []
                )}
                onClicked={() => workspace.focus()}
              >
              </button>
            ))
        )
      }
    </box>
  );
}

