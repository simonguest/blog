#!/bin/bash
ARTICLES=""
DIR=./content/live/articles/*.md
for FILE in $DIR; do
  TITLE=`awk -F"title: " '/title:[\s]*/{ print $2 }' $FILE`
  CREATED=`awk -F"created: " '/created:[\s]*/{ print $2 }' $FILE`
  SYNOPSIS=`awk -F"synopsis: " '/synopsis:[\s]*/{ print $2 }' $FILE`
  ARTICLES="$ARTICLES$FILE\t$CREATED\t$TITLE\t$SYNOPSIS\n"
done

## Create the markdown index
echo -e $ARTICLES | grep . | sort -k2 -n -t$'\t' -r | awk -F"\t" '
  {
  print "::: blog-summary\n## ["$3"]("$1")";
  print "### "$2;
  print $4"\n";
  print "::: readmore";
  print "[Read More]("$1")";
  print ":::\n"
  print ":::\n"
  } '

