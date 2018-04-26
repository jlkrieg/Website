#!/bin/sh
#This script translates the library xls file into bibTex and send out an eMail if the bibTex file changed compared with the existing file. 
#No eMail is send if no bibTex file exists. 
#The translation is done by bib.py 
#The list of recipients of the status eMail is given in the recipients file (1 address per line)

TransFile="bib.py"
InFile="/users/eeh/vschneider/library/BibiliothekTL-HL" #.xls
BibFile="BibiliothekTL-HL" #.bib
path="/users/ehs/jlkrieg/website/library"
cd $path

cp ${BibFile}.bib ${BibFile}_old.bib
python ${TransFile} ${InFile}

DIFF=$(diff -q ${BibFile}.bib ${BibFile}_old.bib) 
#if [ "$DIFF" != "" ] 
#then
#   mailto=$(cat recipients)
#   cop=$(cat sender)
#   from=${cop}
#   
#	diff=$(diff ${BibFile}.bib ${BibFile}_old.bib)
#   
#	mkdir -p tmpdir
#	echo -e "Log message:\nThis mail was sent automatically.\n" >> #tmpdir/mail.log
#	echo -e "Recent changes inside the bibTex file:" >> tmpdir/mail.log 
#	echo -e ${diff} >> tmpdir/mail.log 
#	echo -e "\nThe new bibTex file is located at ${path}/${BibFile}.bib." >> #tmpdir/mail.log
#	subject='Please update the library content.'
#	if ! [${diff} == ""]
#	then		
#		/users/eeh/kind/bin/sendEmail -f ${from} -t ${mailto} -cc ${cop} -u ${subject} -s mail.physik.hu-berlin.de -m "`cat tmpdir/mail.log`" > #/dev/null 2>&1
#	fi
#
#	rm -rf tmpdir
#fi
rm ${BibFile}_old.bib
