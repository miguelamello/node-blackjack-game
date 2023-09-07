# Black Jack Game

This is a simple, yet fully functional Black Jack game. It is written in ES6 (Javascript lasted version) with HTML and CSS only for the interface. The backend is written in ExpressJS and the database is a simple db.json implementation. The game is fully responsive and can be played on any device. 

The rationale behind this project was to show that I fully functional card game can be written in Javascript. To port ES6 to browser compatible Javascript, I used Babel and Webpack. This way, I could use the latest Javascript features and still have a browser compatible code. The game is simple, so all the logic is in the frontend. The backend is only used to store the game state and to serve the frontend. The browser loads only one bundle.js file, which contains all the code needed to run the game. Actually, the game is a single page application, so the browser only loads the index.html file and the bundle.js file.

I decided to create one unique Class to run the game logic in a "reactive" approuch, due to the "impure" nature of HTML DOM manipulation. This way, the game logic is always in sync with the DOM, which is key to make the interface fluid. All the UI decoration is made with CSS only, so the DOM manipulation is only used to update the game state.

## Try the game

You can try the game [blackjackgame.orionsoft.site](http://blackjackgame.orionsoft.site/).


## Technology Stack

- ES6 (Javascript lasted version)
- HTML
- CSS
- NodeJS
- ExpressJS
- db.json
- Babel
- Webpack


## Conclusion

This project demonstrates that a fully functional card game can be written in Javascript. A more refined game card can be implemented using more advanced Javascript features and hacks. The game can be improved by adding more features, like a betting system, an AI support for cards selection, a multiplayer mode, etc. Please, feel free to contact me at miguelangelomello@gmail.com if you have any questions or suggestions. Thank you!

