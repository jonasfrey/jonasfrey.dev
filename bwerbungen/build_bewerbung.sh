#!/usr/bin/env bash
# Usage: ./build_bewerbung.sh <subfolder> [md_basename]
#   Renders <subfolder>/<md_basename>.md -> _cv.pdf (Chrome), then merges the
#   shared Beilagen (certificates) into <subfolder>/<md_basename>_bewerbung.pdf
set -euo pipefail
BASE="$(cd "$(dirname "$0")" && pwd)"
DIR="$1"
NAME="${2:-cv}"
FOLDER="$BASE/$DIR"
BEILAGEN="$BASE/zeugnisse_ausweise_etc/beilagen.pdf"

cp "$BASE/jonas_portrait.jpg" "$FOLDER/jonas_portrait.jpg"

python3 - "$FOLDER" "$NAME" << 'EOF'
import markdown, base64, pathlib, re, sys
folder, name = sys.argv[1], sys.argv[2]
d = pathlib.Path(folder)
md = (d / f"{name}.md").read_text()
for m in set(re.findall(r'src="([^"]+\.(?:jpg|jpeg|png))"', md)):
    p = d / m
    if p.exists():
        mime = "jpeg" if p.suffix.lower() in (".jpg", ".jpeg") else "png"
        b64 = base64.b64encode(p.read_bytes()).decode()
        md = md.replace(f'src="{m}"', f'src="data:image/{mime};base64,{b64}"')
body = markdown.markdown(md, extensions=["tables", "extra", "sane_lists"])
css = """
@page { size: A4; margin: 13mm 15mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color:#1a1a1a; font-size:10.2px; line-height:1.48; max-width:820px; margin:0 auto; }
h1 { font-size:25px; margin:0 0 2px; color:#0b3d5c; }
h3 { margin:0 0 6px; color:#2176ae; font-weight:600; font-size:13px; }
h2 { font-size:14.5px; color:#0b3d5c; border-bottom:2px solid #2176ae; padding-bottom:3px; margin:16px 0 8px; }
h4 { font-size:11.5px; margin:11px 0 2px; color:#0b3d5c; }
a { color:#2176ae; text-decoration:none; }
table { border-collapse:collapse; width:100%; margin:6px 0; }
td,th { border:1px solid #dbe4ea; padding:5px 8px; vertical-align:top; text-align:left; }
th { background:#eef4f8; }
blockquote { border-left:3px solid #2176ae; margin:8px 0; padding:2px 12px; color:#444; background:#f6f9fb; }
hr { border:none; border-top:1px solid #e2e2e2; margin:9px 0; }
img { border-radius:8px; }
code { background:#eef2f5; padding:1px 4px; border-radius:3px; font-size:9.5px; }
ul { margin:5px 0; padding-left:18px; }
li { margin:2px 0; }
"""
(d / f"{name}.html").write_text(
    f"<!doctype html><html><head><meta charset='utf-8'><style>{css}</style></head><body>{body}</body></html>")
EOF

google-chrome --headless=new --disable-gpu --no-sandbox \
  --print-to-pdf="$FOLDER/${NAME}_cv.pdf" --no-pdf-header-footer "$FOLDER/${NAME}.html" 2>/dev/null

pdfunite "$FOLDER/${NAME}_cv.pdf" "$BEILAGEN" "$FOLDER/${NAME}_bewerbung.pdf"
echo "Built $DIR/${NAME}_bewerbung.pdf ($(pdfinfo "$FOLDER/${NAME}_bewerbung.pdf" | awk '/Pages/{print $2}') Seiten)"
