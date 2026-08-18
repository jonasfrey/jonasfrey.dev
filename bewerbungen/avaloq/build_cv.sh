#!/usr/bin/env bash
# Usage: ./build_cv.sh avaloq_cv    -> builds avaloq_cv.pdf from avaloq_cv.md
set -euo pipefail
cd "$(dirname "$0")"
NAME="${1:-avaloq_cv}"
python3 << EOF
import markdown, base64, pathlib, re
md = pathlib.Path("$NAME.md").read_text()
# inline any local <img src="..."> as a base64 data URI so the PDF is self-contained
for m in set(re.findall(r'src="([^"]+\.(?:jpg|jpeg|png))"', md)):
    p = pathlib.Path(m)
    if p.exists():
        mime = "jpeg" if p.suffix.lower() in (".jpg", ".jpeg") else "png"
        b64 = base64.b64encode(p.read_bytes()).decode()
        md = md.replace(f'src="{m}"', f'src="data:image/{mime};base64,{b64}"')
body = markdown.markdown(md, extensions=["tables","extra","sane_lists"])
css = """
@page { size: A4; margin: 14mm 16mm; }
* { box-sizing: border-box; }
body { font-family: -apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color:#1a1a1a; font-size:10.3px; line-height:1.5; max-width:820px; margin:0 auto; }
h1 { font-size:26px; margin:0 0 2px; color:#0b3d5c; }
h3 { margin:0 0 6px; color:#2176ae; font-weight:600; font-size:13px; }
h2 { font-size:15px; color:#0b3d5c; border-bottom:2px solid #2176ae; padding-bottom:3px; margin:18px 0 8px; }
h4 { font-size:11.5px; margin:12px 0 2px; color:#0b3d5c; }
a { color:#2176ae; text-decoration:none; }
table { border-collapse:collapse; width:100%; margin:6px 0; }
td,th { border:1px solid #dbe4ea; padding:5px 8px; vertical-align:top; text-align:left; }
th { background:#eef4f8; }
blockquote { border-left:3px solid #2176ae; margin:8px 0; padding:2px 12px; color:#444; background:#f6f9fb; }
hr { border:none; border-top:1px solid #e2e2e2; margin:10px 0; }
img { border-radius:8px; }
code { background:#eef2f5; padding:1px 4px; border-radius:3px; font-size:9.5px; }
"""
pathlib.Path("$NAME.html").write_text(
    f"<!doctype html><html><head><meta charset='utf-8'><style>{css}</style></head><body>{body}</body></html>")
EOF
google-chrome --headless=new --disable-gpu --no-sandbox \
  --print-to-pdf="$NAME.pdf" --no-pdf-header-footer "$NAME.html" 2>/dev/null
echo "Built $NAME.pdf"
