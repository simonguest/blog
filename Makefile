.DEFAULT_TARGET: all

all: clean build

build:
	mkdir -p ./dist
	touch ./dist
	mkdir ./dist/articles
	cd ./content/live/articles; for f in *.md; do pandoc "$$f" -s -o "../../../dist/articles/$${f%.md}.html" --template=../../../templates/article.html; done

clean:
	rm -rf ./dist