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
