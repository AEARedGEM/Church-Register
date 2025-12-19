#!/usr/bin/env python3
import re

# Read the complete wards data file
with open('wards_data_complete.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Add leading newline to ensure first state is captured
content = '\n' + content

# Split by state names (all caps lines)
states = re.split(r'\n([A-Z\s\']+)\n', content)

print(f'Total parts after split: {len(states)}')
print(f'Expected: 2 * (num_states + 1) for text before first state\n')

# Parse to understand structure better
data_dict = {}
current_state = None
all_lgas = []

for i, part in enumerate(states):
    if i % 2 == 1:  # State names are at odd indices
        current_state = part.strip().title()
        print(f'State {i}: "{current_state}"')
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
                all_lgas.append(lga_name)

print(f'\nTotal unique LGAs found: {len(set(all_lgas))}')
print(f'Total LGA instances: {len(all_lgas)}')

# Check for duplicates
from collections import Counter
counts = Counter(all_lgas)
duplicates = {k: v for k, v in counts.items() if v > 1}
if duplicates:
    print(f'\nDuplicate LGAs: {len(duplicates)}')
    for lga, count in list(duplicates.items())[:5]:
        print(f'  {lga}: {count} times')
