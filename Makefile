.DEFAULT_TARGET: all

all: clean build

build:
	mkdir -p ./dist
	touch ./dist
	mkdir ./dist/articles
	cd ./content/live/articles; for f in *.md; do pandoc "$$f" -s -o "../../../dist/articles/$${f%.md}.html" --template=../../../templates/article.html; done

build-articles:
	./create-index.sh | pandoc -s -o "./dist/articles.html" --template=./templates/articles.html --metadata title="Articles"

clean:
	rm -rf ./dist