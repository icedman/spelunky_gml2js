
from pprint import pprint

obj = {
    'oBlock': { 'parent': 'oSolid' },
    'oSprite': { 'parent': 'oObject' },
    'oObject': { 'parent': '' },
    'oScreen': { 'parent': 'oObject' },
    'oDrawnSprite': { 'parent': 'oSprite' },
    'oSolid': { 'parent': 'oDrawnSprite' },
}

# pprint(obj)

objects = []

for k in obj:
    obj[k]['name'] = k
    obj[k]['level'] = 0
    objects.append(obj[k])

while True:
    didUpdate = False
    for k in obj:
        p = obj[k]['parent']
        if not p in obj:
            continue
        if obj[k]['level'] <= obj[p]['level']:
            obj[k]['level'] = obj[p]['level'] + 1
            didUpdate = True
    if not didUpdate:
        break

def sortKey(obj):
    return obj['level']
objects.sort(key = sortKey)
pprint(objects)