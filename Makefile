.DEFAULT_TARGET: all

all: clean build-content build-indexes copy-css copy-lib copy-images

build-content:
	mkdir -p ./dist/articles; mkdir -p ./dist/presentations; mkdir -p ./dist/projects
	for f in ./content/live/articles/*.md; do pandoc "$$f" -s -o "./dist/articles/`basename $${f%.md}`" -t html --template=./template.html -M article="true" -M parent="articles"; done
	for f in ./content/live/presentations/*.md; do pandoc "$$f" -s -o "./dist/presentations/`basename $${f%.md}`" -t html --template=./template.html -M article="true" -M parent="presentations"; done
	for f in ./content/live/projects/*.md; do pandoc "$$f" -s -o "./dist/projects/`basename $${f%.md}`" -t html --template=./template.html -M article="true" -M parent="projects"; done
	pandoc "./content/live/about.md" -s -o "./dist/about" --template=./template.html -t html -M article="true" -M title="About Simon"

build-indexes:
	./create-index.sh ./content/live/articles /articles | pandoc -s -o "./dist/index.html" --template=./template.html -M title="Home"
	./create-index.sh ./content/live/articles /articles | pandoc -s -o "./dist/articles/index.html" --template=./template.html -M title="Articles"
	./create-index.sh ./content/live/presentations /presentations | pandoc -s -o "./dist/presentations/index.html" --template=./template.html -M title="Presentations"
	./create-index.sh ./content/live/projects /projects | pandoc -s -o "./dist/projects/index.html" --template=./template.html -M title="Projects"

copy-css:
	cp -R ./styles ./dist

copy-lib:
	cp -R ./lib ./dist

copy-images:
	cp -R ./content/live/images ./dist

clean:
	rm -rf ./dist

run:
	cd ./dist; python3 ../server.py