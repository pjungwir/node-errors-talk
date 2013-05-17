talk:
	deck slides.md

html: assets
	# TODO: The -b option isn't really done yet:
	# it gives bad paths to css/js/etc assets
	# and doesn't run CodeRay first.
	# Easier to just fire up the server
	# and copy from View Source.
	deck -b slides.md

assets:
	cp -r `bundle show deckrb`/public/* .
