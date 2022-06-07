.DEFAULT_TARGET: all

all: clean build-content build-indexes copy-css copy-lib copy-images

build-content:
	mkdir -p ./dist/articles; mkdir -p ./dist/presentations; mkdir -p ./dist/projects
	cd ./content/live/articles; for f in *.md; do pandoc "$$f" -s -o "../../../dist/articles/$${f%.md}" --template=../../../templates/template.html --metadata index="articles"; done
	cd ./content/live/presentations; for f in *.md; do pandoc "$$f" -s -o "../../../dist/presentations/$${f%.md}" --template=../../../templates/template.html --metadata index="presentations"; done
	cd ./content/live/projects; for f in *.md; do pandoc "$$f" -s -o "../../../dist/projects/$${f%.md}" --template=../../../templates/template.html --metadata index="projects"; done
	pandoc "./content/live/about.md" -s -o "./dist/about" --template=./templates/template.html --metadata index="about" --metadata aboutpage="true" --metadata title="About Simon"

build-indexes:
	./create-index.sh ./content/live/articles /articles | pandoc -s -o "./dist/index.html" --template=./templates/template.html --metadata title="Articles"
	cp ./dist/index.html ./dist/articles/index.html
	./create-index.sh ./content/live/presentations /presentations | pandoc -s -o "./dist/presentations/index.html" --template=./templates/template.html --metadata title="Presentations"
	./create-index.sh ./content/live/projects /projects | pandoc -s -o "./dist/projects/index.html" --template=./templates/template.html --metadata title="Projects"

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