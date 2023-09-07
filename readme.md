# Black Jack Game

This is a simple, yet fully functional Black Jack game. It is written in ES6 (Javascript lasted version) with HTML and CSS only for the interface. The backend is written in ExpressJS and the database is a simple db.json implementation. The game is fully responsive and can be played on any device. 

The rationale behind this project was to show that I fully functional card game can be written in Javascript. To port ES6 to browser compatible Javascript, I used Babel and Webpack. This way, I could use the latest Javascript features and still have a browser compatible code. The game is simple, so all the logic is in the frontend. The backend is only used to store the game state and to serve the frontend. The browser loads only one bundle.js file, which contains all the code needed to run the game. Actually, the game is a single page application, so the browser only loads the index.html file and the bundle.js file.

I decided to create one unique Class to run the game logic in a "reactive" approuch, due to the "impure" nature of HTML DOM manipulation. This way, the game logic is always in sync with the DOM, which is key to make the interface fluid. All the UI decoration is made with CSS only, so the DOM manipulation is only used to update the game state.

## Try the game

You can try the game [blackjack.orionsoft.site](http://blackjack.orionsoft.site/).


## Technology Stack

- ES6 (Javascript lasted version)
- HTML
- CSS
- NodeJS
- ExpressJS
- db.json
- Babel
- Webpack

## Cards Manipulation

The cards used in this game are simple PNG images. The cards are stored in the `/frontend/cards` folder. The cards are loaded on the demand based on the DOM API requests made by the game logic. The trick to pick the right card was achieved by naming each card PNG with an integer from 0 to 52. To solve the problem of the suits of cards needed by the game, I created a simple Class Method to feed an Array of Float numbers in which each float decinal represents a single card...

```
setCards() {
	this.cards = [];
	for (let h = 1; h <= 4; h++) {
		for (let i = 1; i <= 52; i++) {
			this.cards.push(parseFloat(h + '.' + i));
		}
	}
}
```

any time a card is required, it's a matter of getting the card number from the decimal part of the float...

```
getCardNumber(card) {
	return (card) ? Math.abs(card.toString().split('.')[1]) : 0;
}
```

and using the card number to get the right card image...

```
createCard(card) {
		const cardElement = document.createElement('img');
		cardElement.className = 'playingcards';
		cardElement.alt = 'playing cards';
		const cardNumber = this.getCardNumber(card);
		cardElement.src = `cards/${cardNumber}.png`;
		return cardElement;
	}
```

Please take a close look at the `ruuner.js` file to see how the cards are manipulated.

## Conclusion

This project demonstrates that a fully functional card game can be written in Javascript. A more refined game card can be implemented using more advanced Javascript features and hacks. The game can be improved by adding more features, like a betting system, an AI support for cards selection, a multiplayer mode, etc. Please, feel free to contact me at miguelangelomello@gmail.com if you have any questions or suggestions. Thank you!

