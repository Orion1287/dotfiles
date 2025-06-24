import AstalMpris from "gi://AstalMpris";
import Gio from "gi://Gio";
import { bind, Variable } from "astal";
import { Button, Label } from "astal/gtk4/widget";
import { Gtk, astalify } from "astal/gtk4";

// MPRIS player
const spotify = AstalMpris.Player.new("spotify");

// Playback status: "" (pause) if playing, "" (play) otherwise
const playPauseLabel = Variable.derive(
  [bind(spotify, "playback_status")],
  (status) =>
    status === AstalMpris.PlaybackStatus.PLAYING ? "" : ""
);

// Reactive cover art (fallback to null)
export const art = Variable(spotify.get_cover_art() ?? "").observe(
  spotify,
  "notify::cover-art",
  () => spotify.get_cover_art() ?? ""
);

// Picture widget
export const Picture = astalify<Gtk.Picture, Gtk.Picture.ConstructorProps>(
  Gtk.Picture,
  {},
);

export default function Mpris() {
  return (
    <overlay>
      <Picture
        cssClasses={["cover_art"]}
        widthRequest={120}
        heightRequest={120}
        visible={art().as((cover_art) => !!cover_art)}
        file={art().as((cover_art) =>
          cover_art ? Gio.file_new_for_path(cover_art) : null
        )}
      />

      <box
        type="overlay clip"
        orientation={Gtk.Orientation.VERTICAL}
        cssClasses={["music_overlay"]}
        spacing={15}
        valign={Gtk.Align.CENTER}
        vexpand
      >
        {/* Title + Artist */}
        <box orientation={Gtk.Orientation.VERTICAL} spacing={10} valign={Gtk.Align.CENTER}>
          <label
            label={bind(spotify, "title", (t) => String(t ?? "Nothing Playing"))}
            halign={Gtk.Align.CENTER}
            widthChars={30}
            ellipsize="end"
          />
          <label
            label={bind(spotify, "artist", (a) => String(a ?? "Unknown Artist"))}
            cssClasses={["artist"]}
            halign={Gtk.Align.CENTER}
          />
        </box>

        {/* Playback Controls */}
        <box
          cssClasses={["Controls"]}
          halign={Gtk.Align.CENTER}
          spacing={20}
          valign={Gtk.Align.CENTER}
        >
          <Button
            cssClasses={["material"]}
            label="󰒮"
            onClicked={() => spotify.previous()}
            sensitive={bind(spotify, "available", (a) => !!a)}
          />
          <Button
            cssClasses={["material"]}
            label={bind(playPauseLabel)}
            onClicked={() => spotify.play_pause()}
            sensitive={bind(spotify, "available", (a) => !!a)}
          />
          <Button
            cssClasses={["material"]}
            label="󰒭"
            onClicked={() => spotify.next()}
            sensitive={bind(spotify, "available", (a) => !!a)}
          />
        </box>
      </box>
    </overlay>
  );
}

