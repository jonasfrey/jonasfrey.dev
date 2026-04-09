# CV Notes

## HF Diploma in Timeline

- The "GIBB HF Informatik - Abschluss voraussichtlich 2026" entry exists in `cv.html` (line ~442)
- But it's only a plain text note (`weiterbildung-note` div), **not a proper timeline item**
- It should be added as a `timeline-item` in the Ausbildung section (like the other entries around line 420-438)
- Suggested format: `2019 - 2026 (erwartet)` / `GIBB HF Informatik` / `Abschluss voraussichtlich 2026`

## Git Sync Issue

- This repo is **not pushed to any remote**
- A different version of this project exists on a laptop somewhere
- The two versions need to be compared and combined
- `cv.html` has uncommitted local changes on this machine
- Next step: set up a remote (e.g. GitHub via `gh repo create`) to sync both copies, then merge differences
