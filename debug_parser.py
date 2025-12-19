#!/usr/bin/env python3
import re

# Read the complete wards data file
with open('wards_data_complete.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Add leading newline to ensure first state is captured
content = '\n' + content

# Split by state names (all caps lines)
states = re.split(r'\n([A-Z\s\']+)\n', content)

data_dict = {}
current_state = None
total_lgas = 0

for i, part in enumerate(states):
    if i % 2 == 1:  # State names are at odd indices
        # Convert to proper case (e.g., "ADAMAWA" -> "Adamawa")
        current_state = part.strip().title()
        if current_state:
            data_dict[current_state] = {}
    elif current_state and part.strip():
        # Parse LGAs and wards
        lga_pattern = r'^([^:]+):\s*(.+)$'
        lgas_in_state = 0
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
                lgas_in_state += 1
                total_lgas += 1

        if lgas_in_state > 0:
            print(f'{current_state}: {lgas_in_state} LGAs')

print(f'\nTotal LGAs parsed: {total_lgas}')
print(f'Total states: {len(data_dict)}')
