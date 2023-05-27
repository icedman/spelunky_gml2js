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

for l in open('undefined.txt'):
    if l.startswith('/'):
        match = re.search('\/([a-zA-Z0-9]*)\.js', l)
        if match != None:
            objectName = match.group(1)
            if objectName not in objects:
                objects[objectName] = {}
                objectPath = l

    if 'error' in l:
        match = re.search('\'([a-zA-Z_0-9]*)\' is not defined', l)
        if match != None:
            varName = match.group(1)

            # skip object name
            if re.search('\\b(o|s|r)[A-Z]{1,2}', varName):
                continue

            if not varName in variables:
                variables[varName] = {}

            variables[varName][objectName] = { 'path': objectPath.strip() }

def getVarType(path, v):
    if v in arrays:
        return 'array'
    if v in functions:
        return 'function'
    for l in open(path):
        if re.search('\\b' + v + '\(', l):
            return 'function'
        if re.search('\\b' + v + '\[', l):
            return 'array'
    return ''

for v in variables:
    vars = variables[v]
    varKeys = list(vars.keys())
    objectName = varKeys[0]
    objectPath = vars[objectName]['path']
    varType = getVarType(objectPath, v)
    
    if varType == 'function':
        functions[v] = True
    if varType == 'array':
        arrays[v] = True

    if len(varKeys) > 1:
        objectName = 'oObject'

    objects[objectName][v] = { 'type': varType }

# pprint(objects)
# pprint(variables)
# pprint(functions)
# pprint(arrays)

print(json.dumps(objects, sort_keys=True, indent=4))