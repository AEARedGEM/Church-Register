import pathlib
from pathlib import Path
root = Path('resources/js')
replacements = [('indigo','emerald'), ('blue','emerald')]
updated = 0
for path in root.rglob('*.tsx'):
    text = path.read_text(encoding='utf-8')
    new = text
    for old, newtok in replacements:
        new = new.replace(old, newtok)
    if new != text:
        path.write_text(new, encoding='utf-8')
        print('Updated', path)
        updated += 1
print('Files updated:', updated)
