var ELEMENTS = 25;
const LIBRARY_CONTAINER = "libraryContent";

const SORT = {"TITLE" : 0, "AUTHOR" : 1, "YEAR" : 2, "PUB" : 3, "LANG" : 4, "LOCATION" : 5};

function clearNode(node) {
	for (i=node.childNodes.length-1; i>=0; i--) {
		node.removeChild(node.childNodes[i]);
	}
}

function cmpTitle(a,b) {
	if (a.title.toUpperCase() != b.title.toUpperCase())
		return 2*(a.title.toUpperCase()>b.title.toUpperCase())-1;
	if (a.author.toUpperCase() != b.author.toUpperCase())
		return 2*(a.author.toUpperCase()>b.author.toUpperCase())-1;
	if (a.year.toUpperCase() != b.year.toUpperCase())
		return 2*(a.year.toUpperCase()<b.year.toUpperCase())-1;
	if (a.language.toUpperCase() != b.language.toUpperCase())
		return 2*(a.language.toUpperCase()>b.language.toUpperCase())-1;
	return 0;
}

function cmpAuthor(a,b) {
	if (a.author.toUpperCase() != b.author.toUpperCase())
		return 2*(a.author.toUpperCase()>b.author.toUpperCase())-1;
	if (a.title.toUpperCase() != b.title.toUpperCase())
		return 2*(a.title.toUpperCase()>b.title.toUpperCase())-1;
	if (a.year.toUpperCase() != b.year.toUpperCase())
		return 2*(a.year.toUpperCase()<b.year.toUpperCase())-1;
	if (a.language.toUpperCase() != b.language.toUpperCase())
		return 2*(a.language.toUpperCase()>b.language.toUpperCase())-1;
	return 0;
}

function cmpYear(a,b) {
	if (a.year.toUpperCase() != b.year.toUpperCase())
		return 2*(a.year.toUpperCase()<b.year.toUpperCase())-1;
	if (a.title.toUpperCase() != b.title.toUpperCase())
		return 2*(a.title.toUpperCase()>b.title.toUpperCase())-1;
	if (a.author.toUpperCase() != b.author.toUpperCase())
		return 2*(a.author.toUpperCase()>b.author.toUpperCase())-1;
	if (a.language.toUpperCase() != b.language.toUpperCase())
		return 2*(a.language.toUpperCase()>b.language.toUpperCase())-1;
	return 0;
}

/* 	sorting by publisher is currently a bit buggy and I have no idea why -
	solved we must remove leading spaces in book informations */
function cmpPub(a,b) {
	if (a.publisher.toUpperCase() != b.publisher.toUpperCase())
		return 2*(a.publisher.toUpperCase()>b.publisher.toUpperCase())-1;
	if (a.title.toUpperCase() != b.title.toUpperCase())
		return 2*(a.title.toUpperCase()>b.title.toUpperCase())-1;
	if (a.author.toUpperCase() != b.author.toUpperCase())
		return 2*(a.author.toUpperCase()>b.author.toUpperCase())-1;
	if (a.year.toUpperCase() != b.year.toUpperCase())
		return 2*(a.year.toUpperCase()<b.year.toUpperCase())-1;
	if (a.language.toUpperCase() != b.language.toUpperCase())
		return 2*(a.language.toUpperCase()>b.language.toUpperCase())-1;
	return 0;
}

function cmpLang(a,b) {
	if (a.language.toUpperCase() != b.language.toUpperCase())
		return 2*(a.language.toUpperCase()>b.language.toUpperCase())-1;
	if (a.title.toUpperCase() != b.title.toUpperCase())
		return 2*(a.title.toUpperCase()>b.title.toUpperCase())-1;
	if (a.author.toUpperCase() != b.author.toUpperCase())
		return 2*(a.author.toUpperCase()>b.author.toUpperCase())-1;
	if (a.year.toUpperCase() != b.year.toUpperCase())
		return 2*(a.year.toUpperCase()<b.year.toUpperCase())-1;
	return 0;
}

function cmpLocation(a,b) {
	if (a.location.toUpperCase() != b.location.toUpperCase())
		return 2*(a.location.toUpperCase()>b.location.toUpperCase())-1;
	if (a.title.toUpperCase() != b.title.toUpperCase())
		return 2*(a.title.toUpperCase()>b.title.toUpperCase())-1;
	else if (a.author.toUpperCase() != b.author.toUpperCase())
		return 2*(a.author.toUpperCase()>b.author.toUpperCase())-1;
	else if (a.year.toUpperCase() != b.year.toUpperCase())
		return 2*(a.year.toUpperCase()<b.year.toUpperCase())-1;
	else if (a.language.toUpperCase() != b.language.toUpperCase())
		return 2*(a.language.toUpperCase()>b.language.toUpperCase())-1;
	return 0;
}

/* The current search expects multiple keywords seperated by spaces which
all restrict the result further by searching every keyword in author, title,
year and publisher. */
function searchBooks(keywords) {
	keywords = keywords.toUpperCase().split(" ");
	sorting = LIBRARY.sorting;
	LIBRARY = new Library();
	LIBRARY.books = defaultLIBRARY.books.slice(0);
	LIBRARY.sorting = sorting;
	for (i=0; i<keywords.length; i++) {
		LIBRARY.books = LIBRARY.books.filter(element => (element.author.toUpperCase().search(keywords[i])>=0 || element.title.toUpperCase().search(keywords[i])>=0 || element.year.toUpperCase().search(keywords[i])>=0 || element.publisher.toUpperCase().search(keywords[i])>=0));
	}
	LIBRARY.display(0);
}

function Library() {
	this.books = new Array();
	this.sorting = SORT.TITLE;
	/*
	Analyses all books that occur block-wise (seperated by \n\n) and have the following form:
		{author}{title}{year}{publisher}{ISBN}{number}{language}{location}
	*/
	this.analyse = function(response) {
		this.books = new Array();
		bookDesc = response.split("\n");
		for (i=0; i<bookDesc.length; i++) {
			desc = bookDesc[i];
			entries = new Array();
			for (j=0; j<8; j++) {
				index = desc.indexOf("}");
				entries[j] = desc.substring(desc.indexOf("{")+1, index);
				desc = desc.substr(index+1, desc.length);
			}
			this.books[i] = new Book(entries[0], entries[1], entries[2],
				entries[3], entries[4], entries[5], entries[6], entries[7]);
		}
	};
	this.display = function(n) {
		switch (this.sorting) {
			case SORT.TITLE:
				this.books.sort(cmpTitle);
				break;
			case SORT.AUTHOR:
				this.books.sort(cmpAuthor);
				break;
			case SORT.YEAR:
				this.books.sort(cmpYear);
				break;
			case SORT.PUB:
				this.books.sort(cmpPub);
				break;
			case SORT.LANG:
				this.books.sort(cmpLang);
				break;
			case SORT.LOCATION:
				this.books.sort(cmpLocation);
				break;
		}
		var container = document.getElementById(LIBRARY_CONTAINER);
		/* clear previously inserted entries */
		clearNode(container);
		/* add all entries */
		min = (n+ELEMENTS>this.books.length?this.books.length:n+ELEMENTS);
		for (i=n; i<min; i++) {
			this.books[i].display(i);
		}
		/* create navigation */
		listingBars = document.getElementById("library").getElementsByClassName("listingBar");
		clearNode(listingBars[0]);
		clearNode(listingBars[1]);
		q = n/ELEMENTS;
		span = document.createElement("span");
		span.textContent = q+1;
		listingBars[0].appendChild(document.createTextNode("["));
		listingBars[0].appendChild(span);
		listingBars[0].appendChild(document.createTextNode("]"));
		for (i=q+1; i*ELEMENTS<this.books.length&&i<q+4; i++) {
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display("+(i*ELEMENTS)+");");
			a.textContent = i+1;
			listingBars[0].appendChild(a);
		}
		for (i=q-1; i>=0&&i>q-4; i--) {
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display("+(i*ELEMENTS)+");");
			a.textContent = i+1;
			listingBars[0].insertBefore(a, listingBars[0].firstChild);
		}
		max = Math.ceil(this.books.length*1./ELEMENTS)-1;
		if (q<=max-5) {
			span = document.createElement("span");
			span.textContent = "...";
			listingBars[0].appendChild(span);
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display("+(max*ELEMENTS)+");");
			a.textContent = max+1;
			listingBars[0].appendChild(a);
		}
		else if (q==max-4) {
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display("+(max*ELEMENTS)+");");
			a.textContent = max+1;
			listingBars[0].appendChild(a);
		}
		if (q>4) {
			span = document.createElement("span");
			span.textContent = "...";
			listingBars[0].insertBefore(span, listingBars[0].firstChild);
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display(0);");
			a.textContent = 1;
			listingBars[0].insertBefore(a, listingBars[0].firstChild);
		}
		else if (q==4) {
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display(0);");
			a.textContent = 1;
			listingBars[0].insertBefore(a, listingBars[0].firstChild);
		}
		if (q<max) {
			span = document.createElement("span");
			span.setAttribute("class", "next");
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display(" + (q+1)*ELEMENTS + ");");
			a.textContent = "next " + ELEMENTS + " entries »";
			span.appendChild(a);
			listingBars[0].insertBefore(span, listingBars[0].firstChild);
		}
		if (q>0) {
			span = document.createElement("span");
			span.setAttribute("class", "previous");
			a = document.createElement("a");
			a.setAttribute("href", "javascript:LIBRARY.display(" + (q-1)*ELEMENTS + ");");
			a.textContent = "« previous " + ELEMENTS + " entries";
			span.appendChild(a);
			listingBars[0].insertBefore(span, listingBars[0].firstChild);
		}
		for (i=(q==0?1:0); i<listingBars[0].childNodes; i++) {
			listingBars[0].insertBefore(document.createTextNode("\u00A0\u00A0"), listingBars[0].childNodes[i]);
		}
		listingBars[1].parentNode.replaceChild(listingBars[0].cloneNode(true), listingBars[1]);
	};
}

/*
This is just a container for the informations about the book to keep them in
one place to ease up sorting, searching, redrawing etc.
*/
function Book(author, title, year, publisher, ISBN, number,
		language, location) {
	this.author = author;
	this.title = title;
	this.year = year;
	this.publisher = publisher;
	this.ISBN = ISBN;
	this.number = number;
	this.location = location;
	this.language = language;
	/*
	Clone the template paragraph and fill it with informations according to the
	book.
	*/
	this.display = function(index) {
		var container = document.getElementById(LIBRARY_CONTAINER);
		clone = document.getElementById("bookBase").cloneNode(true);
		clone.removeAttribute("id");
		clone.childNodes[0].textContent = this.author + " (" + this.year + ").";
		clone.childNodes[2].textContent = this.title;
      clone.childNodes[2].setAttribute("href", "javascript:onBookPressed("+index+");")
		clone.childNodes[4].textContent = this.publisher + ". (" + (this.ISBN.indexOf("ISSN") == -1 && this.ISBN.indexOf("ASIN") == -1 ? "ISBN: " : "") + this.ISBN + ").";/* what exactly is ASIN? */
		clone.childNodes[6].textContent = "Location: " + this.location;
		clone.childNodes[8].textContent = "Language: " + this.language;
		clone.childNodes[10].textContent = "Number: " + this.number;
		clone.style.display = "";
		container.appendChild(clone);
	};
}

function onSearchKeyPressed(evt) {
	if (evt.keyCode != 13)
		return true;
	searchBooks(document.getElementById("searchBooks").value);
	return false;
}

function onBookPressed(b) {
   var book = LIBRARY.books[b];
   var win = window.open("", "Bibitem: "+ book.author+" - "+book.title);
   var doc = win.document.open("text/plain");
   doc.write("@book {0,\ntitle = \"{"+ book.title + "}\",\nauthor = \"{"+book.author+"}\,\nyear = \"{"+book.year+"}\,\npublisher = \"{"+book.publisher+"}\,\nISBN = \"{"+ book.ISBN +"}\"\n}");
   doc.close();
   win.focus();
}

/*
Generate the Library object that will store all informations until reloading /
leaving the page.
*/
var defaultLIBRARY = new Library();
var LIBRARY = defaultLIBRARY;
LIBRARY.analyse(bookStr);
LIBRARY.display(0);
document.getElementById("searchBooks").onkeypress = onSearchKeyPressed;
