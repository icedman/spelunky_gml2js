#!/usr/bin/python

import sys
import re

from os import listdir, mkdir, makedirs
from os.path import isdir, isfile, join, exists
from shutil import copyfile, copytree, rmtree
from pprint import pprint

output = open('./dist/index.js', 'w')
def dump(f):
    f = f.strip()
    if not f.endswith('.js'):
        return
    output.write('//-----------------------------\n')
    output.write('// ' + f + '\n')
    output.write('//-----------------------------\n\n')
    output.write(open(f, 'r').read())
    output.write('\n\n')

def dumpFiles(path):
    morePaths = []

    files = listdir(path)
    for f in files:
        fullpath = join(path, f)

        if isdir(fullpath):
            morePaths.append(fullpath)
            continue

        dump(fullpath)

    for p in morePaths:
        dumpFiles(p)

def dumpList(path):
    for f in open(path):
        dump(f)

dump('engine/polyfill.js')
dump('engine/global.js')
dump('engine/objects.js')
dump('engine/rooms.js')
dumpFiles('src/Sprites/')
dumpList('./list.txt')
dumpFiles('src/Scripts')

output.close()