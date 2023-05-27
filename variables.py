#!/usr/bin/python

import json
import sys
import re
from os import listdir, mkdir, makedirs
from os.path import isdir, isfile, join
from shutil import copyfile
from pprint import pprint

objects = { 'oObject': { 'path': '' } }
variables = {}
functions = {}
arrays = {}
objectName = ''
objectPath = ''

def getVarType(path, v):
    if v in arrays:
        return 'array'
    if v in functions:
        return 'function'
    # for l in open(path):
    #     if re.search('\\b' + v + '\(', l):
    #         return 'function'
    #     if re.search('\\b' + v + '\[', l):
    #         return 'array'
    return ''

for l in open('out.txt'):
    if l.startswith('//'):
        match = re.search('\/([a-zA-Z0-9]*)\.js', l)
        if match != None:
            objectName = match.group(1).strip()
            if objectName not in objects:
                if objectName.startswith('o'):
                    objects[objectName] = {}
                objectPath = l.strip()
                # print(objectPath)
                # print(objectName)

    if not objectName.startswith('o'):
        continue

    ls = l.strip()
        
    if '[variable.other' in ls:
        varName = ls.split(' ')[0]
        if not varName in variables:
            variables[varName] = {}
        variables[varName][objectName] = { 'path': objectPath }

    if '[entity.name.function' in ls:
        varName = ls.split(' ')[0]
        functions[varName] = True

for v in variables:
    vars = variables[v]
    varKeys = list(vars.keys())
    objectName = varKeys[0]
    objectPath = vars[objectName]['path']
    varType = getVarType(objectPath, v)

    if not objectName.startswith('o'):
        continue
    
    if varType == 'function':
        functions[v] = True
    if varType == 'array':
        arrays[v] = True

    if len(varKeys) > 1:
        objectName = 'oObject'

    if v == '$' or v == '::':
        continue
    if re.search('o[A-Z]', v) != None:
        continue
    if re.search('s[A-Z]', v) != None:
        continue
    if re.search('r[A-Z]', v) != None:
        continue

    objects[objectName][v] = { 'type': varType }

# pprint(objects)
# pprint(variables)
# pprint(functions)
# pprint(arrays)

funcKeys = list(functions.keys())
funcKeys.sort()
for v in funcKeys:
    print(v + ' = ()=>{};')

# dump object variables
# objKeys = list(objects['oObject'].keys())
# objKeys.sort()
# for v in objKeys:
#     print(v + ';')

# for v in objects['oObject']:
#     print(v)

# print(json.dumps(objects, sort_keys=True, indent=4))

