#! /usr/bin/python

import xml.sax, xml.sax.handler
import string
from xml.dom.minidom import Document, parse, parseString
#! import xml.dom.ext



class includeListHandler(xml.sax.handler.ContentHandler):
	def __init__(self):
		self.result = []
		xml.sax.handler.ContentHandler.__init__(self)

	def startElement(self, name, attrs):
		if (name == 'xs:include'):
			self.result.append(attrs.get('schemaLocation',''))

class insertIncludeHandler(xml.sax.handler.ContentHandler):
	'''base=0 delete all schema tags; base=1 delete only ending tag'''
	def __init__(self, base, fileObj):
		self.base = base
		self.file = fileObj
		xml.sax.handler.ContentHandler.__init__(self)

	def startElement(self, name, attrs):
		self.text = ''
		if (name == 'xs:schema' and self.base == 0):
			pass
		elif (name != 'xs:include'):
			if name in ('FullName','Audience','Reviewer','ExistingStandards','Content','Examples','Comments','Rules','Notes','EditorialNotes'):
				if name == 'Notes':
					name = 'EditorialNotes'
				name = "sea:"+name
			attributes = []
			for a in attrs.keys():
				attributes.append(u" "+a+u'="'+attrs.get(a)+u'"')
			self.file.write("\n<%s%s>" %(name.encode('utf-8'), string.join(attributes,"").encode('utf-8') ))

	def endElement(self,name):
		if (name == 'xs:schema'):
			pass
		elif (name != 'xs:include'):
			if name in ('FullName','Audience','Reviewer','ExistingStandards','Content','Examples','Comments','Rules','Notes','EditorialNotes'):
				if name == 'Notes':
					name = 'EditorialNotes'
				name = "sea:"+name
			self.file.write("%s</%s>" %( self.text.encode('utf-8').strip(), name.encode('utf-8') ))
		self.text = ''

	def characters(self, ch):
		self.text += ch

def unique(alist):
    '''Remove duplicates from list while preserving order.'''
    set = {}
    return [set.setdefault(e,e) for e in alist if e not in set]

def traverseIncludes(includes):
	res = []
	for inc in includes:
		if not inc in incHistory:
			incHistory.append(inc)
			lister = includeListHandler()
			xml.sax.parse(inc, lister)
			tmp = lister.result
			tmp += traverseIncludes(tmp)
			res += tmp[:]
			lister = None
	return unique(res)
	

if __name__ ==  "__main__":
	
	#rootfile = raw_input("Root schema's filename:")
	rootfile = "ABCD.xsd"
	
	incHistory=[]
	files = unique(traverseIncludes([rootfile]))
	files.sort()

	resFile = file('NEW_SCHEMA.XSD','w')
	#prettyFile = file('PRETTY_SCHEMA.XSD','w')
	
	inserter = 	insertIncludeHandler(1, resFile)
	xml.sax.parse(rootfile, inserter)
	inserter = None

	for file in files:
		print "Including: "+file
		inserter = 	insertIncludeHandler(0, resFile)
		xml.sax.parse(file, inserter)
		inserter = None

	resFile.write(u"\n</xs:schema>")
	resFile.close()

	# pretty print XML
	#doc = parse('NEW_SCHEMA.XSD')
	#prettyFile.write(xml.dom.ext.PrettyPrint(doc)	)
	#prettyFile.close()
	
