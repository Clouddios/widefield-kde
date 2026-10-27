// Launcher icon: CachyOS logo when available, otherwise the generic KDE one
const launcherIcon = (applicationExists("cachyos-hello") || applicationExists("cachyos-kernel-manager"))
    ? "cachyos" : "start-here-kde"

// Top bar on every screen. Screen 0 is the primary one and also gets the
// system tray; the others get launcher, global menu and clock only.
function addTopBar(screen) {
    var panel = new Panel
    panel.screen = screen
    // Thin, full-width bar glued to the top edge, like the macOS menu bar.
    // Rounded to an even number since the Panel size widget only displays even numbers
    panel.location = "top"
    panel.height = 2 * Math.round(gridUnit * 1.5 / 2)
    panel.floating = false

    var kickoff = panel.addWidget("org.kde.plasma.kickoff")
    kickoff.currentConfigGroup = ["General"]
    kickoff.writeConfig("icon", launcherIcon)
    if (screen === 0) {
        kickoff.currentConfigGroup = ["Shortcuts"]
        kickoff.writeConfig("global", "Alt+F1")
    }

    // Global menu right after the launcher
    panel.addWidget("org.kde.plasma.appmenu")
    // Two flexible spacers around the clock keep it centered on the panel
    panel.addWidget("org.kde.plasma.panelspacer")

    // Clock with the date on the same line, e.g. "seg 26 out  14:30", 24h
    let clock = panel.addWidget("org.kde.plasma.digitalclock")
    clock.currentConfigGroup = ["Appearance"]
    clock.writeConfig("showDate", true)
    clock.writeConfig("dateDisplayFormat", 1) // 0 = adaptive, 1 = beside time, 2 = below time
    clock.writeConfig("dateFormat", "custom")
    clock.writeConfig("customDateFormat", "ddd d MMM")
    clock.writeConfig("use24hFormat", 2) // Qt.Checked = always 24h

    panel.addWidget("org.kde.plasma.panelspacer")

    if (screen === 0) {
        panel.addWidget("org.kde.plasma.systemtray")
        panel.addWidget("org.kde.plasma.marginsseparator")
        panel.addWidget("org.kde.plasma.showdesktop")
    }
}

for (var i = 0; i < screenCount; i++) {
    addTopBar(i)
}

// Vertical dock on the right edge of the primary screen
var bpanel = new Panel
bpanel.screen = 0
bpanel.location = "right"
bpanel.lengthMode = "fit"
bpanel.hiding = "dodgewindows"
bpanel.floating = true
bpanel.height = 44

let taskBar = bpanel.addWidget("org.kde.plasma.icontasks")
taskBar.currentConfigGroup = ["General"]
taskBar.writeConfig("launchers", [
    "preferred://filemanager",
    "preferred://browser",
    "applications:org.kde.konsole.desktop",
    "applications:systemsettings.desktop",
])
