#!/usr/bin/env python3
import re

# Read the file directly - no processing
with open('wards_data_complete.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

state_count = 0
lga_count = 0
ward_count = 0
current_state = None
state_lga_counts = {}

for line in lines:
    line = line.rstrip('\n')

    # Check if it's an all-caps state header
    if line and line.isupper() and ':' not in line:
        current_state = line.strip()
        state_count += 1
        state_lga_counts[current_state] = 0
        print(f'State: {current_state}')
    # Check if it's an LGA line (has colon)
    elif ':' in line and current_state:
        parts = line.split(':')
        lga_name = parts[0].strip()
        wards_text = ':'.join(parts[1:]).strip()  # Rejoin in case there are colons in ward names

        if lga_name and wards_text:
            state_lga_counts[current_state] += 1
            lga_count += 1

            # Count wards (comma-separated)
            wards = [w.strip() for w in wards_text.split(',')]
            ward_count += len(wards)

print(f'\nFinal count from raw file:')
print(f'States: {state_count}')
print(f'LGAs: {lga_count}')
print(f'Wards: {ward_count}')
print(f'\nLGAs per state:')
for state in sorted(state_lga_counts.keys()):
    count = state_lga_counts[state]
    if count > 0:
        print(f'  {state}: {count}')
