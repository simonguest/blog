.DEFAULT_TARGET: all

all: clean build build-articles copy-css copy-lib

build:
	mkdir -p ./dist/articles
	touch ./dist
	cd ./content/live/articles; for f in *.md; do pandoc "$$f" -s -o "../../../dist/articles/$${f%.md}" --template=../../../templates/article.html; done

build-articles:
	./create-index.sh /articles | pandoc -s -o "./dist/index.html" --template=./templates/articles.html --metadata title="Articles"
	cp ./dist/index.html ./dist/articles/index.html

copy-css:
	cp -R ./styles ./dist

copy-lib:
	cp -R ./lib ./dist

clean:
	rm -rf ./dist

run:
	cd ./dist; python3 ../server.py