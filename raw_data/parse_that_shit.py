import os
import simplejson as json

DATA_DIR = os.path.dirname(os.path.abspath(__file__))

def load_sinks():
    with open(os.path.join(DATA_DIR, 'energy_sinks.csv')) as f:
        return f.read()

def sluggify(string):
    return string.lower().replace(' ', '_').replace('(', '').replace(')', '').replace('-', '_').replace('/', '')

def parse_sinks():
    d = {
        'sinks': {},
        'categories': {},
    }
    section = None
    for line in load_sinks().splitlines():
        row = line.split(',')
        if not row[2] and not row[8]:
            section = row[0]
            d['categories'][sluggify(section)] = {
                'name': section,
            }
        else:
            d['sinks'][sluggify(row[0])] = {
                'name': row[0],
                'wattage': row[2],
                'standby_wattage': row[8],
                'categories': sluggify(section),
            }
    return d

def save_sinks():
    with open(os.path.join(DATA_DIR, 'energy_sinks.json'), 'w') as f:
        f.write(json.dumps(parse_sinks(), indent=4))


if __name__ == '__main__':
    save_sinks()
