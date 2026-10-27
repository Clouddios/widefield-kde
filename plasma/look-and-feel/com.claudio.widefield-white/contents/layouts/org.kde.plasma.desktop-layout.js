// Launcher icon: CachyOS logo when available, otherwise the generic KDE one
const launcherIcon = (applicationExists("cachyos-hello") || applicationExists("cachyos-kernel-manager"))
    ? "cachyos" : "start-here-kde"

// Restrict horizontal panel to a maximum size of a 21:9 monitor
const maximumAspectRatio = 21/9;

// Top bar on every screen. Screen 0 is the primary one and also gets the
// system tray; the others get launcher, global menu and clock only.
function addTopBar(screen) {
    var panel = new Panel
    panel.screen = screen
    // For an Icons-Only Task Manager on the bottom, *3 is too much, *2 is too little
    // Round down to next highest even number since the Panel size widget only displays
    // even numbers
    panel.height = 2 * Math.floor(gridUnit * 2.5 / 2)
    panel.location = "top"

    if (panel.formFactor === "horizontal") {
        const geo = screenGeometry(screen);
        const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

        if (geo.width > maximumWidth) {
            panel.alignment = "center";
            panel.minimumLength = maximumWidth;
            panel.maximumLength = maximumWidth;
        }
    }

    var kickoff = panel.addWidget("org.kde.plasma.kickoff")
    kickoff.currentConfigGroup = ["General"]
    kickoff.writeConfig("icon", launcherIcon)
    if (screen === 0) {
        kickoff.currentConfigGroup = ["Shortcuts"]
        kickoff.writeConfig("global", "Alt+F1")
    }

    // Global menu right after the launcher
    panel.addWidget("org.kde.plasma.appmenu")
    panel.addWidget("org.kde.plasma.panelspacer")

    if (screen === 0) {
        panel.addWidget("org.kde.plasma.marginsseparator")
        panel.addWidget("org.kde.plasma.systemtray")
    }
    panel.addWidget("org.kde.plasma.marginsseparator")

    // Clock with the date on the same line, e.g. "seg 26 out  14:30", 24h
    let clock = panel.addWidget("org.kde.plasma.digitalclock")
    clock.currentConfigGroup = ["Appearance"]
    clock.writeConfig("showDate", true)
    clock.writeConfig("dateDisplayFormat", 1) // 0 = adaptive, 1 = beside time, 2 = below time
    clock.writeConfig("dateFormat", "custom")
    clock.writeConfig("customDateFormat", "ddd d MMM")
    clock.writeConfig("use24hFormat", 2) // Qt.Checked = always 24h

    if (screen === 0) {
        panel.addWidget("org.kde.plasma.showdesktop")
    }
}

for (var i = 0; i < screenCount; i++) {
    addTopBar(i)
}

// Dock on the primary screen only
var bpanel = new Panel
bpanel.screen = 0
bpanel.location = "bottom"
bpanel.lengthMode = "fit"
bpanel.hiding = "dodgewindows"
bpanel.height = 64

let taskBar = bpanel.addWidget("org.kde.plasma.icontasks")
taskBar.currentConfigGroup = ["General"]
taskBar.writeConfig("launchers", [
    "preferred://filemanager",
    "preferred://browser",
    "applications:org.kde.konsole.desktop",
    "applications:systemsettings.desktop",
])
