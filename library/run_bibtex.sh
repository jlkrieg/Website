TransFile="bib.py"
BibFile="BibiliothekTL-HL" #.bib
path="/users/ehs/jlkrieg/website/library"
path2="/users/ehs/jlkrieg/Desktop"
now=$(date)

cd ${path}
mv ${BibFile}.bib ${BibFile}_old.bib
python for_bibtex/${TransFile}
DIFF=$(diff -q ${BibFile}.bib ${BibFile}_old.bib) 
if [ "$DIFF" != "" ] 
then
	python bibtojs.py
	echo 'change'
	cd ${path2}
	echo -e "$now" >> bibtex.log
	echo -e "change \n" >> bibtex.log
else
	echo 'no change'
	cd ${path2}
	echo -e "$now" >> bibtex.log
	echo -e " no change \n" >> bibtex.log
fi
cd ${path}
rm ${BibFile}_old.bib

