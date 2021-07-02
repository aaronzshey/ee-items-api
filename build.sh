mypath="./apk/assets/res/staticdata/gettext/zh"
 for f in $(find $mypath -type f -regex "${mypath}/[[:digit:]]\{1,3\}.json");
   do node index.js -o $f
 done
