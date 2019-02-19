#!/usr/bin/python
#


TARGET=file('concepts.txt','w')
SOURCE='pages'
HEADINGS=['path']
CONCEPTS={}


import os
import sys
import re
import shutil
import time
import string

class Translator:
    allchars = string.maketrans('','')
    def __init__(self, frm='', to='', delete='', keep=None):
        if len(to) == 1:
            to = to * len(frm)
        self.trans = string.maketrans(frm, to)
        if keep is None:
            self.delete = delete
        else:
            self.delete = self.allchars.translate(self.allchars, keep.translate(self.allchars, delete))
    def __call__(self, s):
        return s.translate(self.trans, self.delete)
        


      
def main(directory):
    for f in os.listdir(directory) :
        if os.path.isdir(os.path.join(directory, f)) and isConceptDir(f):
            dir = os.path.join(directory, f)
            ProcessDir(dir, f)
    CreateTabFile()
  
  
def isConceptDir(f):
    if f.startswith('AbcdConcept0'):
        return True
    elif f.startswith('AbcdConcept1'):
        return True
    elif f.startswith('AbcdConcept2'):
        return True
    return False
    
    
def ProcessDir(directory, wikiname):
    global CONCEPTdict
    #do this later
    rev = GetRevision(directory)
    if rev != "":
        readWikiPage(rev, directory)
    else:
        print "WARNING! no revision found for dir %s" % directory    
    
def GetRevision(directory):
    filename = os.path.join(directory, "current")
    revision = ""
    try:                               
        fsock = open(filename, "r", 0) 
        try:                           
            revision = fsock.read()
        finally:                        
            fsock.close()              
    except IOError:                    
        print "Unable to get revision for directory %s" % directory
    rev=revision.strip()
    return rev
    
    
def readWikiPage(rev, directory):
    conceptDict={}
    key=None
    trans = Translator(delete='= \n\r\t')
    try:
        for line in file(os.path.join(directory,'revisions',rev) ):
            if line.startswith('=== '):
                conceptDict['path']=line[4:-4]
            elif line.startswith('===='):
                key = trans(line).lower()
                if key not in HEADINGS:
                    HEADINGS.append(key)
            elif key is not None:
                if not conceptDict.has_key(key):
                    conceptDict[key]=''
                conceptDict[key]+=line.replace('\r','').replace('\t','    ').replace('\n','<br/>')
        CONCEPTS[conceptDict['path']]=conceptDict
    except IOError:
        print "REVISION %s deleted from dir %s" % (rev, directory)


def CreateTabFile():
    # write concept dict
    for h in HEADINGS:
        TARGET.write("%s/t"%h)
    for c in CONCEPTS.values():
        TARGET.write('\n')
        for h in HEADINGS:
            if c.has_key(h):
                text=c[h].strip()
                while text.startswith('<br/>'):
                    text=text[5:]
                while text.endswith('<br/>'):
                    text=text[:-5]
                TARGET.write("%s/t"%text)
            else:
                TARGET.write("/t")

  
  
if __name__ == "__main__":
  main(SOURCE)
  
  
  
