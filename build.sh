#!/bin/bash
function create_index() {
  ARTICLES=""
  DIR=$1/*.md
  PREFIX=$2
  for FILE in $DIR; do
    SLUG=`basename $FILE | awk -F. '{print $1}'`
    TITLE=`awk -F"title: " '/title:[\s]*/{ print $2 }' $FILE`
    READING_LENGTH=`cat $FILE | wc -w | awk {'printf "%.0f\n",$1/200'}`
    CREATED=`awk -F"created: " '/created:[\s]*/{ print $2 }' $FILE`
    SYNOPSIS=`awk -F"synopsis: " '/synopsis:[\s]*/{ print $2 }' $FILE`
    IMAGE=`awk -F"image: " '/image:[\s]*/{ print $2 }' $FILE`
    ARTICLES="$ARTICLES$PREFIX/$SLUG\t$CREATED\t$TITLE\t$SYNOPSIS\t$READING_LENGTH\t$IMAGE\n"
  done

  ## Create the markdown index
  if [ -z $IMAGE ]; then
    echo -e $ARTICLES | grep . | sort -t$'\t' -k2.7,2.10n -k2.1,2.2n -k2.4,2.5n | tac | awk -F"\t" '
      {
      print "::: summary\n## ["$3"]("$1")";
      print $4"\n";
      print "### "$2" · "$5" min read";
      print ":::\n"
      } '
  else
    echo -e $ARTICLES | grep . | sort -t$'\t' -k2.7,2.10n -k2.1,2.2n -k2.4,2.5n | tac | awk -F"\t" '
      {
      print "::: summary\n## ["$3"]("$1")";
      print "::: summary-image\n[![]("$6")]("$1")\n:::\n";
      print $4"\n";
      print "### "$2" · "$5" min read";
      print ":::\n"
      } '
  fi  
}

echo "Removing dist folder"
rm -rf ./dist

echo "Building content"
mkdir -p ./dist/articles; mkdir -p ./dist/presentations; mkdir -p ./dist/projects; mkdir -p ./dist/about
for f in ./content/articles/*.md; do mkdir "./dist/articles/`basename ${f%.md}`"; pandoc "$f" -s -o "./dist/articles/`basename ${f%.md}`/index.html" --template=./template.html -M article="true" -M parent="articles"; done
for f in ./content/presentations/*.md; do mkdir "./dist/presentations/`basename ${f%.md}`"; pandoc "$f" -s -o "./dist/presentations/`basename ${f%.md}`/index.html" --template=./template.html -M article="true" -M parent="presentations"; done
for f in ./content/projects/*.md; do mkdir "./dist/projects/`basename ${f%.md}`"; pandoc "$f" -s -o "./dist/projects/`basename ${f%.md}`/index.html" --template=./template.html -M article="true" -M parent="projects"; done
pandoc "./content/about.md" -s -o "./dist/about/index.html" --template=./template.html -M article="true"

echo "Building indexes"
create_index ./content/articles /articles | pandoc -s -o "./dist/index.html" --template=./template.html -M title="Home"
create_index ./content/articles /articles | pandoc -s -o "./dist/articles/index.html" --template=./template.html -M title="Articles"
create_index ./content/presentations /presentations | pandoc -s -o "./dist/presentations/index.html" --template=./template.html -M title="Presentations"
create_index ./content/projects /projects | pandoc -s -o "./dist/projects/index.html" --template=./template.html -M title="Projects"

echo "Copying CSS"
cp -R *.css ./dist

echo "Copying images"
cp -R ./content/images ./dist
