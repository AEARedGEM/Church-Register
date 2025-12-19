#!/usr/bin/env python3
import re

# Read the complete wards data file
with open('wards_data_complete.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Add leading newline to ensure first state is captured
content = '\n' + content

# Split by state names (handles special characters like Ọ)
states = re.split(r'\n([A-Z\s\'\-ỌọẠạƯư]+)\n', content)

data_dict = {}
current_state = None

for i, part in enumerate(states):
    if i % 2 == 1:  # State names are at odd indices
        # Convert to proper case (e.g., "ADAMAWA" -> "Adamawa")
        current_state = part.strip().title()
        data_dict[current_state] = {}
    elif current_state and part.strip():
        # Parse LGAs and wards
        lga_pattern = r'^([^:]+):\s*(.+)$'
        for line in part.strip().split('\n'):
            line = line.strip()
            if not line or line.isupper():
                continue
            match = re.match(lga_pattern, line)
            if match:
                lga_name = match.group(1).strip()
                wards_text = match.group(2).strip()
                wards = [w.strip() for w in wards_text.split(',')]
                data_dict[current_state][lga_name] = wards

# Generate PHP code
php_lines = ["<?php return ["]
for state_name in sorted(data_dict.keys()):
    # Escape apostrophes in state name
    escaped_state = state_name.replace("'", "\\'")
    php_lines.append(f"    '{escaped_state}'=>[")
    for lga_name in sorted(data_dict[state_name].keys()):
        # Escape apostrophes in LGA name
        escaped_lga = lga_name.replace("'", "\\'")
        # Escape apostrophes in ward names
        escaped_wards = [w.replace("'", "\\'") for w in data_dict[state_name][lga_name]]
        wards_array = ','.join([f"'{w}'" for w in escaped_wards])
        php_lines.append(f"        '{escaped_lga}'=>[{wards_array}],")
    php_lines.append("    ],")
php_lines.append("]; ?>")

php_code = '\n'.join(php_lines)

# Write to PHP file
with open('database/seeders/wards_data_complete.php', 'w', encoding='utf-8') as f:
    f.write(php_code)

print(f"✓ Generated wards_data_complete.php with {len(data_dict)} states")
for state in sorted(data_dict.keys()):
    print(f"  - {state}: {len(data_dict[state])} LGAs")
