# mypath="./apk/assets/res/staticdata/items"
# for f in $(find $mypath -type f -regex "${mypath}/[[:digit:]]\{1,3\}.json")
#   do node index.js -o $f
# done

# for f in $(find $mypath -type f -regex "${mypath}/[[:digit:]]\{1,3\}.json");
#    do echo $f
# done

# location of attr.json:
# find . -name "*attributes.json"
# "./apk/assets/res/staticdata/gettext/zh"
# "./apk/assets/res/staticdata/gettext/en"
# "./apk/assets/res/staticdata/items"
# node SOMETHING.js -o $f
#

# pth="./apk/assets/res/staticdata/gettext/en"
# find $pth -type f -regex "${pth}/[[:digit:]]\{1,3\}.json"
# for f in $(find $pth -type f -regex "${pth}/[[:digit:]]\{1,3\}.json");
  # do node index.js -o $f
# done



for f in $(find . -name "*type_attributes_*.json" -not -name "*schema*");
  do node populate_loc.js -o $f
done
# find . -name "*attributes.json"
