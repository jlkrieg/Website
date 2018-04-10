TransFile="bib.py"
InFile="/users/eeh/vschneider/library/BibiliothekTL-HL" #.xls
BibFile="BibiliothekTL-HL" #.bib
path="/mnt/eeh/kind/wwweep/bibliothek"

cp ~kind/wwweep/bibliothek/BibiliothekTL-HL.bib  BibiliothekTL-HL.bib 
DIFF=$(diff -q ${BibFile}.bib ${BibFile}_old.bib) 
if [ "$DIFF" != "" ] 
then
echo 'mail'
mkdir -p tmpdir
echo -e "Log message:\nThis mail was sent automatically.\n" >> tmpdir/mail.log
echo -e "Recent changes inside the bibTex file:" >> tmpdir/mail.log 
echo -e ${diff} >> tmpdir/mail.log 
echo -e "\nThe new bibTex file is located at ${path}/${BibFile}.bib." >> tmpdir/mail.log 
else
echo 'no mail' 
mkdir -p tmpdir
echo -e "Log message:\nThis mail was sent automatically.\n" >> tmpdir/mail.log
echo -e "Recent changes inside the bibTex file:" >> tmpdir/mail.log 
echo -e ${diff} >> tmpdir/mail.log 
echo -e "\nThe new bibTex file is located at ${path}/${BibFile}.bib." >>  tmpdir/mail.log 
echo ${diff}
if ! [${diff} == ""]
then
echo really no mail
fi
fi
rm ${BibFile}_old.bib
mv ${BibFile}.bib ${BibFile}_old.bib
