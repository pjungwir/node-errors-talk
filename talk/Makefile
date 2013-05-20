talk:
	deck slides.md

html: assets
	# TODO: The -b option isn't really done yet:
	# it gives bad paths to css/js/etc assets
	# and doesn't run CodeRay first.
	# Easier to just fire up the server
	# and copy from View Source.
	# deck -b slides.md
	curl http://localhost:4333 > slides.html
	perl -p -i -e 's#/deck.js#deck.js#g' slides.html
	perl -p -i -e 's#/coderay.css#coderay.css#g' slides.html
	perl -p -i -e 's#/tables.css#tables.css#g' slides.html
	perl -p -i -e 's#/toc.css#toc.css#g' slides.html

assets:
	cp -r `bundle show deckrb`/public/* .
