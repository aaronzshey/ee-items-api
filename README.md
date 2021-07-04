# Usage
- Clone this repository
- Run `npm i` and then `node index.js`.  Alternative, you can try using `npm start`.
- Go to `localhost:3000/api/Ferox` or another thing from EVE Echoes.  You can write spaces into the URI.  
- That's it!

Case sensitive.  Sending `atron` will crash the server, but sending `Atron` sends something usable.

### You can also use this as a command-line tool.
- Go to `get.js` and uncomment the last few lines with `yargs` in them.
- Run `node get.js -o "Item Name`".
- Pretty useless huh? 


# To Do:

Cleaner data ouput, autobuild/update from APK/AAB, better error handling, museum items, blueprints, and more coming soon! 

