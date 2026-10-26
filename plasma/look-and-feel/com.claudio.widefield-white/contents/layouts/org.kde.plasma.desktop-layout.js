var panel = new Panel
var panelScreen = panel.screen

// No need to set panel.location as ShellCorona::addPanel will automatically pick one available edge

// For an Icons-Only Task Manager on the bottom, *3 is too much, *2 is too little
// Round down to next highest even number since the Panel size widget only displays
// even numbers
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2)
panel.location = "top"

// Restrict horizontal panel to a maximum size of a 21:9 monitor
const maximumAspectRatio = 21/9;
if (panel.formFactor === "horizontal") {
    const geo = screenGeometry(panelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        panel.alignment = "center";
        panel.minimumLength = maximumWidth;
        panel.maximumLength = maximumWidth;
    }
}

// Launcher icon: CachyOS logo when available, otherwise the generic KDE one
const launcherIcon = (applicationExists("cachyos-hello") || applicationExists("cachyos-kernel-manager"))
    ? "cachyos" : "start-here-kde"

var kickoff = panel.addWidget("org.kde.plasma.kickoff")
kickoff.currentConfigGroup = ["General"]
kickoff.writeConfig("icon", launcherIcon)
kickoff.currentConfigGroup = ["Shortcuts"]
kickoff.writeConfig("global", "Alt+F1")

// Global menu right after the launcher
panel.addWidget("org.kde.plasma.appmenu")

var bpanel = new Panel
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
panel.addWidget("org.kde.plasma.panelspacer")
panel.addWidget("org.kde.plasma.marginsseparator")
panel.addWidget("org.kde.plasma.systemtray")
panel.addWidget("org.kde.plasma.marginsseparator")
// Clock with the date on the same line, e.g. "seg 26 out  14:30", 24h
let clock = panel.addWidget("org.kde.plasma.digitalclock")
clock.currentConfigGroup = ["Appearance"]
clock.writeConfig("showDate", true)
clock.writeConfig("dateDisplayFormat", 1) // 0 = adaptive, 1 = beside time, 2 = below time
clock.writeConfig("dateFormat", "custom")
clock.writeConfig("customDateFormat", "ddd d MMM")
clock.writeConfig("use24hFormat", 2) // Qt.Checked = always 24h
panel.addWidget("org.kde.plasma.showdesktop")

