#!/bin/bash
ARTICLES=""
DIR=./content/live/articles/*.md
PREFIX=$1
for FILE in $DIR; do
  SLUG=`basename $FILE | awk -F. '{print $1}'`
  TITLE=`awk -F"title: " '/title:[\s]*/{ print $2 }' $FILE`
  CREATED=`awk -F"created: " '/created:[\s]*/{ print $2 }' $FILE`
  SYNOPSIS=`awk -F"synopsis: " '/synopsis:[\s]*/{ print $2 }' $FILE`
  ARTICLES="$ARTICLES$PREFIX/$SLUG\t$CREATED\t$TITLE\t$SYNOPSIS\n"
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

