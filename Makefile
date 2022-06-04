.DEFAULT_TARGET: all

all: clean build

build:
	mkdir -p ./dist
	touch ./dist
	mkdir ./dist/articles
	cd ./content/live/articles; for f in *.md; do pandoc "$$f" -s -o "../../../dist/articles/$${f%.md}.html" --template=../../../templates/article.html; done

build-articles:
	cd ./content/live/articles; pandoc -s -o "../../../dist/articles.html" index.md --template=../../../templates/articles.html

clean:
	rm -rf ./dist