infile  = open("/mnt/eeh/kind/wwweep/bibliothek/BibiliothekTL-HL.bib","r" )
outfile = open("bibliothekshortened.js","w")
outfile.write("var bookStr = ")
i=0
for line in infile:
    textline=line.rstrip()
    print textline
    if "author = " in textline:
        if i>1:
            outfile.write("\\n\"+\n")
        str="\""+textline[11:-1]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)

    if "title = " in textline:
        str=textline[10:-1]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)
    
    if "year = " in textline:
        str=textline[9:-1]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)
            
    if "publisher = " in textline:
        str=textline[14:-1]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)
            
    if "ISBN = " in textline:
        str=textline[9:-1]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)
	
    if "number = " in textline:
        str=textline[11:-1]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)

        
    if "Note = {Language: " in textline:
        str="{"+textline[20:-1]+"}"
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)
            
    if "Located: " in textline:
        str="{"+textline[9:]
        if str =="" or str ==" ":
            outfile.write("{n.a.}")
        else:
            outfile.write(str)
            
    i=i+1
    
outfile.write("\";")
infile.close()
outfile.close()
