#!/usr/bin/python

import sys
import re
from os import listdir, mkdir, makedirs
from os.path import isdir, isfile, join
from shutil import copyfile
from pprint import pprint

# from PIL import Image, ImageEnhance, ImageOps

if len(sys.argv) < 3:
    print("rip.py ./src ./dst")
    exit()

target = sys.argv[2]
path = sys.argv[1]
sheets = {}

sprites = {}

makedirs("dist/sprites", exist_ok=True)
makedirs(target + "/Sprites", exist_ok=True)
makedirs(target + "/Rooms", exist_ok=True)

def getPivot(xml):
    ox = 0
    oy = 0
    for l in open(xml):
        if "origin" in l:
            match = re.search('x="([0-9]*)', l)
            if match != None:
                ox = match.group(1)
            match = re.search('y="([0-9]*)', l)
            if match != None:
                oy = match.group(1)

    # return ox + "," + oy
    return [ox, oy]


def copyFiles(path):
    morePaths = []

    # print("enter " + path)
    global target

    files = listdir(path)
    for f in files:
        fullpath = join(path, f)

        isImage = False
        isSheet = False

        pivot = ""

        if ".images" in fullpath:
            src = fullpath + "/image 0.png"
            src2 = fullpath + "/image 1.png"
            isImage = isfile(src)
            isSheet = isfile(src2)

            # getpivot
            xml = fullpath.replace(".images", ".xml")
            pivot = getPivot(xml)

        if "Backgrounds" in fullpath and ".png" in f:
            src = fullpath
            isImage = True

        if isImage:
            tf = f

            if ".images" in f:
                idx = f.index(".images")
                tf = f[0:idx]
                print(tf + ",")
            else:
                # background
                print(tf.replace(".png", "") + ",")

            dst = join(target, tf) + ".png"

            folder = ""
            match = re.search("Sprites/([a-zA-Z]*)", src)
            if match != None:
                folder = match.group(1).lower()
                td = join(target, folder)
                if not isdir(td):
                    mkdir(td)
                dst = join(td, tf) + ".png"
                # dstTxt = join(td, tf) + ".txt"
                dstJs = join(td, tf) + ".js"

            if not tf in sprites:
                sprites[tf] = {
                    'name': tf
                }
            sprite = sprites[tf]

            makedirs(td.replace('./src/Sprites/', './dist/sprites/'), exist_ok=True)

            if not isSheet:
                # copyfile(src, dst)
                imagePath = dst.replace('./src/Sprites/', './dist/sprites/')
                copyfile(src, imagePath)
                print(src + "..")
                print("copy " + imagePath)

                # fw = open(dstJs, "w")
                # code = "class " + tf + " extends sSprite {\n"
                # code += "ox = " + pivot[0] + ";\n"
                # code += "oy = " + pivot[1] + ";\n"
                # code += "}"
                # # fw.write(pivot)
                # fw.write(code)
                # fw.close()

                if not tf in sheets:
                    sheets[tf] = { 'frames': [] }
                sheets[tf]['frames'].append({ 'frame': 0, 'name': tf, 'ox': pivot[0], 'oy': pivot[1], 'path': imagePath })

                sprite['frames'] = sheets[tf]['frames']

                # with Image.open(src) as im:
                #     w, h = im.size
                #     newSize = (w*2,h*2)
                #     im = im.resize(newSize)

                #     factor = 8
                #     if "Snake" in src:
                #         factor = 2
                #     if "character" in dst:
                #         factor = 3
                #     enhancer = ImageEnhance.Contrast(im)
                #     im = enhancer.enhance(factor)
                #     im = im.convert("LA")
                #     im.save(dst)
                # exit()

            if isSheet:
                for i in range(0, 30):
                    src2 = src.replace("0.png", str(i) + ".png")
                    dst2 = dst.replace(".png", "_" + str(i) + ".png")
                    if not isfile(src2):
                        break

                    # copyfile(src2, dst2)
                    imagePath = dst2.replace('./src/Sprites/', './dist/sprites/');
                    copyfile(src2, imagePath)

                    if not tf in sheets:
                        sheets[tf] = { 'frames': [] }
                    sheets[tf]['frames'].append({ 'frame': i, 'name': tf + "_" + str(i), 'ox': pivot[0], 'oy': pivot[1], 'path': imagePath })

                    sprite['frames'] = sheets[tf]['frames']

                    print(src2 + "..")
                    print("copy " + imagePath)

                    # with Image.open(src2) as im:
                    #     w, h = im.size
                    #     newSize = (w*2,h*2)
                    #     im = im.resize(newSize)

                    #     factor = 8
                    #     if "Snake" in src2:
                    #         factor = 2
                    #     if "character" in dst2:
                    #         factor = 3
                    #     enhancer = ImageEnhance.Contrast(im)
                    #     im = enhancer.enhance(factor)
                    #     im = im.convert("LA")
                    #     im.save(dst2)

            continue

        # print("skip " + fullpath)

        if isdir(fullpath):
            morePaths.append(fullpath)
            continue

    for p in morePaths:
        copyFiles(p)


if not isdir(target):
    mkdir(target)
copyFiles(path)

def dumpSprite(sprite):
    code = sprite['name'] + '= {\n'
    code += '\'name\': \'' + sprite['name'] + '\',\n'
    code += '\'frames\': [\n'
    for frame in sprite['frames']:
        code += '{\n'
        code += '\'ox\': ' + frame['ox'] + ',\n'
        code += '\'oy\': ' + frame['oy'] + ',\n'
        code += '\'path\': \'' + frame['path'] + '\',\n'
        code += '},\n'
    code += ']\n'
    code += '}\n'

    f = open('./src/Sprites/' + sprite['name'] + '.js', 'w')
    f.write(code)
    f.close()

    # pprint(sprite)

for s in sprites:
    dumpSprite(sprites[s])

# pprint(sheets)