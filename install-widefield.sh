#! /usr/bin/env bash
# Widefield: installs the WhiteSur base (Plasma style, colors, window decoration)
# and the Widefield White / Widefield Dark global themes for the current user.

set -euo pipefail

SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOOKFEEL_DIR="$HOME/.local/share/plasma/look-and-feel"
VARIANTS=('com.claudio.widefield-white' 'com.claudio.widefield-dark')

if [[ "$UID" -eq 0 ]]; then
  echo "Run as your normal user, not root: Widefield installs to ~/.local/share." >&2
  exit 1
fi

echo "==> Installing WhiteSur base (style, colors, decoration)..."
(cd "$SRC_DIR" && ./install.sh)

# The global themes pick widgetStyle=kvantum / kvantum-dark, but Kvantum's
# own theme choice lives outside kdeglobals. "WhiteSur" makes kvantum-dark
# use WhiteSurDark automatically.
KVANTUM_CONFIG="$HOME/.config/Kvantum/kvantum.kvconfig"
current_kvantum="$(kreadconfig6 --file "$KVANTUM_CONFIG" --group General --key theme 2>/dev/null || true)"
if [[ "$current_kvantum" != "WhiteSur" ]]; then
  echo "==> Setting Kvantum theme to WhiteSur (was: ${current_kvantum:-none})..."
  mkdir -p "$(dirname "$KVANTUM_CONFIG")"
  kwriteconfig6 --file "$KVANTUM_CONFIG" --group General --key theme WhiteSur
fi

echo "==> Installing Widefield global themes..."
mkdir -p "$LOOKFEEL_DIR"
for variant in "${VARIANTS[@]}"; do
  rm -rf "${LOOKFEEL_DIR:?}/${variant}"
  cp -r "$SRC_DIR/plasma/look-and-feel/${variant}" "$LOOKFEEL_DIR/"
  echo "    ${variant}"
done

echo
echo "Done. Check with: kpackagetool6 -t Plasma/LookAndFeel -l | grep widefield"
echo "Apply in System Settings > Colors & Themes > Global Theme,"
echo "ticking \"Desktop and window layout\" to get the top bar + dock."
