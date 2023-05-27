#!/usr/bin/python

import sys
import re
import json

from os import listdir, mkdir, makedirs
from os.path import isdir, isfile, join, exists
from shutil import copyfile, copytree, rmtree
from pprint import pprint

if len(sys.argv) < 2:
    print("generateRooms.py ./src")
    exit()

path = sys.argv[1]

def generateRoomCode(room, path):
    match = re.search('\/([a-zA-Z0-9\s]*)\.xml', path)
    if match == None:
        return

    roomName = match.group(1)

    # code = 'resources[\'rooms\'][\'' + roomName + '\'] = {\n'
    code = roomName + ' = {\n'
    code += '\'name\': \"' + roomName + '\",\n'
    for k in room:
        if k == 'instances':
            code += '\'instances\': [\n'
            for i in room[k]:
                if i == None:
                    continue
                code += '{\n'
                code += '\'obj\': ' + i['object'] + ',\n'
                code += '\'x\': ' + i['x'] + ',\n'
                code += '\'y\': ' + i['y'] + ',\n'
                code += '},\n'
            code += ']\n'
            continue
        if k == 'follow':
            if room[k] == '':
                room[k] = 'null'
            code += '\'' + k + '\':' + str(room[k]) + ',\n'
            continue
        code += '\'' + k + '\':' + str(room[k]) + ',\n'
    code += '}\n'

    f = open('./src/Rooms/' + roomName + '.js', 'w')
    f.write(code)
    f.close()

    # print(code)

def parseRoom(path):
    print(path)

    width = 0
    height = 0
    snapX = 0
    snapY = 0
    followBorderX = 0;
    followBorderY = 0;
    follow = '';
    instances = []
    instance = None
    
    for l in open(path):
        if "size" in l:
            match = re.search('width="([0-9]*)', l)
            if match != None:
                width = match.group(1)
            match = re.search('height="([0-9]*)', l)
            if match != None:
                height = match.group(1)
        if "snap" in l:
            match = re.search('x="([0-9]*)', l)
            if match != None:
                snapX = match.group(1)
            match = re.search('y="([0-9]*)', l)
            if match != None:
                snapY = match.group(1)

        if "objectFollowing" in l:
            match = re.search('hBorder="([0-9]*)', l)
            if match != None:
                followBorderX = match.group(1)
            match = re.search('vBorder="([0-9]*)', l)
            if match != None:
                followBorderY = match.group(1)
            match = re.search('\>([a-zA-Z0-9]*)\<', l)
            if match != None:
                follow = match.group(1)

        if instance != None:
            match = re.search('\>([a-zA-Z0-9]*)\<\/', l)
            if "<object" in l:
                if match != None:
                    instance['object'] = match.group(1)
                    if not instance['object'].startswith('o'):
                        instance['object'] = ''
            if "position" in l:
                match = re.search('x="([0-9\.]*)', l)
                if match != None:
                    instance['x'] = match.group(1)
                match = re.search('y="([0-9\.]*)', l)
                if match != None:
                    instance['y'] = match.group(1)


        if "<instance" in l:
            instance = {}

        if "</instance" in l:
            if instance != None and instance['object'] != '':
                instances.append(instance)
            instance = None

        # <objectFollowing hBorder="128" hSpeed="-1" vBorder="96" vSpeed="-1">oPlayer1</objectFollowing>

    room = {
        'width': width,
        'height': height,
        'snapX': snapX,
        'snapY': snapY,
        'followBorderX': followBorderX,
        'followBorderY': followBorderY,
        'follow': follow,
        'instances': instances
    }

    generateRoomCode(room, path)

def parseFiles(path):
    morePaths = []

    files = listdir(path)
    for f in files:
        fullpath = join(path, f)

        if "Rooms" in fullpath and ".xml" in f:
            parseRoom(fullpath)

        if isdir(fullpath):
            morePaths.append(fullpath)
            continue

    for p in morePaths:
        parseFiles(p)

parseFiles(path)