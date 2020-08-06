#!/usr/bin/env bash

FONT=$1
FILL=$2
SIZE=$3
PREFIX=$4
STYLE=$5
STROKEWIDTH=$6

METAFILE=$PREFIX"data.json"

CHARACTERS=(0 1 2 3 4 5 6 7 8 9 : - A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z)

echo '{' > $METAFILE

for i in ${CHARACTERS[@]}; do
	CHAR=$i
	SUFFIX=$i
	MODIFIER=""

	if [[ $SUFFIX == ":" ]]
	then
		SUFFIX="colon"
	elif [[ $SUFFIX == "-" ]]
	then
		SUFFIX="dash"
	elif [[ $SUFFIX == "0" ]]
	then
		SUFFIX="zero"
	elif [[ $SUFFIX == "1" ]]
	then
		SUFFIX="one"
	elif [[ $SUFFIX == "2" ]]
	then
		SUFFIX="two"
	elif [[ $SUFFIX == "3" ]]
	then
		SUFFIX="three"
	elif [[ $SUFFIX == "4" ]]
	then
		SUFFIX="four"
	elif [[ $SUFFIX == "5" ]]
	then
		SUFFIX="five"
	elif [[ $SUFFIX == "6" ]]
	then
		SUFFIX="six"
	elif [[ $SUFFIX == "7" ]]
	then
		SUFFIX="seven"
	elif [[ $SUFFIX == "8" ]]
	then
		SUFFIX="eight"
	elif [[ $SUFFIX == "9" ]]
	then
		SUFFIX="nine"
	elif [[ $SUFFIX =~ [A-Z] ]]
	then
		MODIFIER="upper-"
	fi

	FILENAME=$PREFIX$MODIFIER$SUFFIX.png

	if [[ -z $STYLE ]]
	then
		convert -colorspace RGB -font $FONT -fill $FILL -pointsize $SIZE -background transparent label:$CHAR $FILENAME
	elif [[ $STYLE == "custombold" ]]
	then
		convert -colorspace RGB -font $FONT -fill $FILL -pointsize $SIZE -stroke $FILL -strokewidth $STROKEWIDTH -background transparent label:$CHAR $FILENAME
	else
		convert -colorspace RGB -font $FONT -fill $FILL -pointsize $SIZE -style $STYLE -background transparent label:$CHAR $FILENAME
	fi

	echo -n '"'$SUFFIX'": {"width": ' >> $METAFILE
	convert $FILENAME -ping -format "%w" info: | xargs echo -n >> $METAFILE
	echo -n ', "height": ' >> $METAFILE
	convert $FILENAME -ping -format "%h" info: | xargs echo -n >> $METAFILE
	echo -n ', "href": "'${PWD#"${PWD%/*/*}/"}'/'$FILENAME'"},' >> $METAFILE
done

truncate -s-1 $METAFILE

echo '}' >> $METAFILE
