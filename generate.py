#!/usr/bin/python

import sys
import re

from os import listdir, mkdir, makedirs
from os.path import isdir, isfile, join
from shutil import copyfile
from pprint import pprint

if len(sys.argv) < 2:
    print("globals.py ./src")
    exit()

path = sys.argv[1]
objects = {}
events = {}
sprites = {}
parseStatus = { 'withinComment': False }

parseWhat = "xml"
if len(sys.argv) > 2:
    parseWhat = sys.argv[2]

def cleanUpCode(l):
    ls = l.strip()
    if ls.startswith("/*"):
        parseStatus['withinComment'] = True
        return l
    if parseStatus['withinComment'] and ls.endswith("*/"):
        parseStatus['withinComment'] = False
        return l
    if parseStatus['withinComment'] == True:
        return l

    l = l.replace("&gt;", ">")
    l = l.replace("&lt;", "<")
    l = l.replace("&amp;&amp;", "&&")
    l = l.replace(" and not", " && !")
    l = l.replace(" and ", " && ")
    l = l.replace(" or ", " || ")
    l = l.replace(" not ", " !")
    l = l.replace("(not ", "(!")
    l = l.replace(" mod ", " % ")

    ls = l.strip()
    if ls.endswith(" and"):
        l = l.replace(" and", " &&")
    if ls.endswith(" or"):
        l = l.replace(" or", " ||")

    # repeat statements
    match = re.search('repeat\(([0-9]*)\)', l)
    if match != None:
        # print(match.group(1))
        fr = "for(r=0;r<c;r++)"
        l = l.replace(match.group(0), fr)

    # single line if statements - without parenthesis
    ls = l.strip()
    if ls.startswith("if ") and (ls.find("(") == -1 or ls.find("(") > 4):
        match = re.search('\s([a-zA-Z0-9\.]*\s{0,1}=)', l)
        didClose = False
        if match != None:
            l = l.replace(match.group(1), ") " + match.group(1))
            didClose = True
        else:
            match = re.search('\s([a-zA-Z0-9]*)\(', l)
            if match != None:
                l = l.replace(match.group(1), ") " + match.group(1))
                didClose = True
            else:
                match = re.search('\s(return)\s', l)
                if match != None:
                    l = l.replace(match.group(1), ") " + match.group(1))
                    didClose = True
                
        l = l.replace("if ", "if (")
        if not didClose:
            l = l.rstrip() + ")\n"

    # if = equality condition
    ls = l.strip()
    if ls.startswith("if (") and (ls.endswith(")") or ls.endswith("&&")):
        l = l.replace(" = ", " == ")

    # return = equality condition
    ls = l.strip()
    if ls.startswith("return "):
        l = l.replace(" = ", " == ")

    # single line with
    ls = l.strip()
    if ls.startswith("with ") and ls.endswith("}"):
        match = re.search("with ([a-zA-Z0-9]*)\s", l)
        if match != None:
            withWhat = match.group(1)
            ls = ls.replace("with " + withWhat, "")
            l = "[instances_of(" + withWhat + ")].forEach(($) => { with($)\n" + ls + "\n})\n"

    # float suffix 0.5f
    for i in range(1, 10):
        match = re.search("([0-9\.]f)", l)
        if match == None:
            break
        numf = match.group(1)
        num = numf.replace("f", "")
        l = l.replace(numf, num)

    #globalvar debug
    if ls.startswith("globalvar"):
        l = l.replace("globalvar ", "// globalvar ")

    # with ... unhandled with
    # ls = l.strip()
    # if ls.startswith("with "):
    #     l = "// " + ls + "\n"
        
    # if ... with ...
    ls = l.strip()
    if ls.startswith("if") and " with " in ls:
        i = ls.find( "with ")
        l1 = ls[0:i]
        l2 = cleanUpCode(ls[i:])
        l = l1 + "{\n" + l2 + "\n}\n"
        # print(l)

    # specific fixes
    l = l.replace("\"\\\"", "\"\\\\\"")
    l = l.replace("if !(", "if (!")
    l = l.replace("for(int ", "for(")
    l = l.replace("bool ", "")

    # oDarkFall
    if ls.startswith("if ()"):
        l = ls.replace("if ()", "if (") + ")\n"

    # oShopKeeper
    if ls.startswith("i = (int)((float)dist/16.0 * 1.5)"):
        l = "i = Math.floor(dist/16.0 * 15)\n"

    # oLeaves
    if ls.startswith("if") and ls.endswith("))and"):
        l = ls.replace("))and", ")) &&\n")

    # oSprintTrap
    # if (status == IDLE && abs(other.x-(x+8)) < 6 && !other.held && counter = 0 &&

    # scrGetKey
    ls = l.strip()
    if ls.endswith("\" break; }"):
        l = l.replace("\" break", "\"; break");

    # canLandOnPlatform
    if ls.startswith("return object_index=oCharacter"):
        l = l.replace("x=o", "x==o")
        l = l.replace("x)=o", "x)==o")

    ls = l.strip()
    match = re.search("int r1\s{0,1}=", ls)
    if match != None:
        if ls.endswith(";"):
            ls = ls[0:len(ls)-1]
        l = ls.replace(match.group(0), "r1 = Math.floor(") + ")\n"
        # print(l)

    return l

def parseXMLFileEvent(path):
    match = re.search('\/([a-zA-Z0-9\s]*).events\/', path)
    if match == None:
        return

    parseStatus = { 'withinComment': False }

    objectName = match.group(1)

    kind = '?'
    category = '?'
    collisionWith = '?'
    actionType = '?'
    functionName = '?'

    code = ''
    expression = ''
    readingCode = False
    readingExpr = False

    actions = []
    
    for l in open(path):
        if not readingCode:
            readingCode = "<argument kind=\"STRING\">" in l
            if readingCode:
                l = l.lstrip().replace("<argument kind=\"STRING\">", "")

        if not readingExpr:
            readingExpr = "<argument kind=\"EXPRESSION\">" in l
            if readingExpr:
                l = l.lstrip().replace("<argument kind=\"EXPRESSION\">", "")

        if readingCode:
            if "</argument>" in l:
                readingCode = False
                l = l.replace("</argument>", "")
                code += cleanUpCode(l)

        if readingExpr:
            if "</argument>" in l:
                readingExpr = False
                l = l.replace("</argument>", "")
                expression += cleanUpCode(l)

        if readingCode:
            code += cleanUpCode(l)
        if readingExpr:
            expression += cleanUpCode(l)

        if '</action>' in l:
            if kind == 'VARIABLE':
                code = code.strip() + " = " + expression.strip()
            if actionType == 'FUNCTION':
                code = functionName + "()"
            if actionType == 'NONE':
                code = ''

            if collisionWith != '?':
                category += "_" + collisionWith

            action = {
                'category': category,
                'kind': kind,
                'actionType': actionType,
            }

            if code != '':
                action['code'] = code

            actions.append(action)
            #reset
            code = ''
            collisionWith = '?'
            actionType = '?'
            functionName = '?'
            continue

        match = re.search('category="([a-zA-Z0-9]*)"', l)
        if match != None:
            category = match.group(1)
        match = re.search('with="([a-zA-Z0-9]*)"', l)
        if match != None:
            collisionWith = match.group(1)

        match = re.search('<[a-zA-Z0-9]*>(.*)</', l)
        if match != None:
            val = match.group(1)
            match = re.search('<([a-zA-Z0-9]*)>', match.group(0))
            if match != None:
                name = match.group(1)
                if name == 'kind':
                    kind = val
                if name == 'actionType':
                    actionType = val
                if name == 'functionName':
                    functionName = val

    if objectName not in events:
        events[objectName] = []

    for a in actions:
        events[objectName].append(a)
    # pprint(actions)

def parseXMLFile(path):
    # print('---------------------------')
    # print(path)

    match = re.search('\/([a-zA-Z0-9\s]*)\.xml', path)
    if match == None:
        return

    objectName = match.group(1)
    
    obj = {
        'path': path
    }
    for l in open(path):
        if l.startswith('<event'):
            parseXMLFileEvent(path)
            return

        match = re.search('<[a-zA-Z0-9]*>(.*)</', l)
        if match != None:
            val = match.group(1)
            match = re.search('<([a-zA-Z0-9]*)>', match.group(0))
            if match != None:
                name = match.group(1)
                obj[name] = val

    if objectName[0] == 'o':
        objects[objectName] = obj
    if objectName[0] == 's':
        sprites[objectName] = obj

def parseGMLFile(path):
    parseStatus = { 'withinComment': False }

    makedirs("src/Scripts", exist_ok=True)

    match = re.search('\/([a-zA-Z0-9\s]*)\.gml', path)
    if match == None:
        return

    scriptName = match.group(1)

    code = ""
    for l in open(path):
        l = cleanUpCode(l)
        code += l

    code = cleanUpCode2(code)

    f = open('src/Scripts/' + scriptName + '.js', 'w')
    f.write(code)
    f.close()

def parseFiles(path):
    morePaths = []

    files = listdir(path)
    for f in files:
        fullpath = join(path, f)

        if parseWhat == "xml" and ".xml" in f:
            parseXMLFile(fullpath)

        if parseWhat == "gml" and ".gml" in f:
            parseGMLFile(fullpath)

        if isdir(fullpath):
            morePaths.append(fullpath)
            continue

    for p in morePaths:
        parseFiles(p)

def cleanUpCode2(code):
    cleanCode = ''
    lines = code.split("\n")
    idx = 0
    closeBrackets = []
    withinComment = False
    for l in lines:
        ls = l.strip()

        if ls.startswith("/*"):
            withinComment = True
        if withinComment and ls.endswith("*/"):
            withinComment = False

        if withinComment:
            idx += 1
            cleanCode += l + "\n"
            continue

        # arguments
        for i in range(0,5):
            si = str(i)
            l = l.replace("argument" + si, "arguments[" + si + "]")
            
        closeBracket = ''
        if len(closeBrackets) > 0:
            closeBracket = closeBrackets[len(closeBrackets)-1]
        if closeBracket != "" and l.rstrip() == closeBracket:
            l = closeBracket.strip() + "})\n"
            closeBracket = ""
            closeBrackets.pop()
        if ls.startswith("with "):
            match = re.search("with ([a-zA-Z0-9]*)", ls)
            if match != None:
                withWhat = match.group(1)
                ls = ls.replace("with " + withWhat, "")
                l = "[instances_of(" + withWhat + ")].forEach(($) => { with($)\n"
                closeBracket = lines[idx+1].rstrip().replace("{", "}")
                closeBrackets.append(closeBracket)
        cleanCode += l + "\n"
        idx += 1
    return cleanCode

def generateClassCode(k, obj):
    path = obj['path']
    match = re.search('spelunky\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]*)', path)
    dst = 'src/' + match.group(1) + '/'
    if k != match.group(2):
        dst += match.group(2)
    dstFile = dst + '/' + k + '.js'

    makedirs(dst, exist_ok=True)

    eventCodes = {}
    if k in events:
        objectEvents = events[k]
        for e in objectEvents:
            if not 'code' in e:
                continue
            if e['category'] not in eventCodes:
                eventCodes[e['category']] = ''
            eventCodes[e['category']] += cleanUpCode2(e['code']) + '\n\n'

    code = ""

    # always disable use strict!
    # code += '"use strict"\n\n'

    if k in events:
        objectEvents = events[k]
        for e in eventCodes:
            code += 'function ' + k + "_" + e + '($) { with($) {\n\n'
            code += eventCodes[e]
            code += '\n\n}}\n\n'

    extends = "oObject"
    if 'parent' in obj:
        extends = obj['parent']
    code += "class " + k + " extends " + extends + " {\n"
    code += "// variables\n\n"
    code += "}\n"

    f = open(dstFile, 'w')
    f.write(code)
    f.close()

def generateCode():
    for k in objects:
        obj = objects[k]
        generateClassCode(k, obj)

parseFiles(path)
generateCode()

# pprint(objects)
# pprint(events)



