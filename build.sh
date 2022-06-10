function create_index() {
  ARTICLES=""
  DIR=$1/*.md
  PREFIX=$2
  for FILE in $DIR; do
    SLUG=`basename $FILE | awk -F. '{print $1}'`
    TITLE=`awk -F"title: " '/title:[\s]*/{ print $2 }' $FILE`
    CREATED=`awk -F"created: " '/created:[\s]*/{ print $2 }' $FILE`
    SYNOPSIS=`awk -F"synopsis: " '/synopsis:[\s]*/{ print $2 }' $FILE`
    ARTICLES="$ARTICLES$PREFIX/$SLUG\t$CREATED\t$TITLE\t$SYNOPSIS\n"
  done

  ## Create the markdown index
  echo $ARTICLES | grep . | sort -t$'\t' -k2.7,2.10n -k2.1,2.2n -k2.4,2.5n | tac | awk -F"\t" '
    {
    print "::: summary\n## ["$3"]("$1")";
    print "### "$2;
    print $4"\n";
    print ":::\n"
    } '
}

echo "Removing dist folder"
rm -rf ./dist

echo "Building content"
mkdir -p ./dist/articles; mkdir -p ./dist/presentations; mkdir -p ./dist/projects
for f in ./content/live/articles/*.md; do pandoc "$f" -s -o "./dist/articles/`basename ${f%.md}`" -t html --template=./template.html -M article="true" -M parent="articles"; done
for f in ./content/live/presentations/*.md; do pandoc "$f" -s -o "./dist/presentations/`basename ${f%.md}`" -t html --template=./template.html -M article="true" -M parent="presentations"; done
for f in ./content/live/projects/*.md; do pandoc "$f" -s -o "./dist/projects/`basename ${f%.md}`" -t html --template=./template.html -M article="true" -M parent="projects"; done
pandoc "./content/live/about.md" -s -o "./dist/about" --template=./template.html -t html -M article="true"

echo "Building indexes"
create_index ./content/live/articles /articles | pandoc -s -o "./dist/index.html" --template=./template.html -M title="Home"
create_index ./content/live/articles /articles | pandoc -s -o "./dist/articles/index.html" --template=./template.html -M title="Articles"
create_index ./content/live/presentations /presentations | pandoc -s -o "./dist/presentations/index.html" --template=./template.html -M title="Presentations"
create_index ./content/live/projects /projects | pandoc -s -o "./dist/projects/index.html" --template=./template.html -M title="Projects"

echo "Copying CSS"
cp -R *.css ./dist

echo "Copying images"
cp -R ./content/live/images ./dist
