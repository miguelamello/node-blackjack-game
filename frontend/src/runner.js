class Runner {

	newGame;
	scores;
	hit;
	stay;
	go;
	playerWin;
	dealerScore;
	playerScoreName;
	playerScore;
	playerName;
	dealerHand;
	playerHand;
	burstedWin;
	restart;
	quit;
	hiddenCard;
	cards = [];
	dealerCards = [];
	playerCards = [];

	init() {
		this.bindToDom();
		this.addEventListeners();
		this.setCards();
	}

	bindToDom() {
		setTimeout(() => {
			this.go = document.querySelector('#YpBnSLSIIrq');
			this.newGame = document.querySelector('#RAHyqtNqRd');
			this.scores = document.querySelector('#mSCPZQmjHoAx');
			this.hit = document.querySelector('#OQXrkcqKiIEQ');
			this.stay = document.querySelector('#zKhgMWkBk');
			this.playerWin = document.querySelector('#oqrhLoDtO');
			this.dealerScore = document.querySelector('#HTCpTWJAh');
			this.playerScoreName = document.querySelector('#bnSddBbUiNfi');
			this.playerScore = document.querySelector('#YhhKVfVNsDv');
			this.playerName = document.querySelector('#vCzoHPwfX');
			this.dealerHand = document.querySelector('#wwZlsPUv');
			this.playerHand = document.querySelector('#VJINJzAVKKy');
			this.burstedWin = document.querySelector('#wt4pccnsvg56');
			this.restart = document.querySelector('#nu2t2ks82m6j');
			this.quit = document.querySelector('#vh4mow0wza7g');
		}, 300);
	}

	addEventListeners() {
		setTimeout(() => {
			this.newGame.addEventListener('click', () => {
				this.showPlayerWin();
			});
			this.hit.addEventListener('click', () => {
				
			});
			this.stay.addEventListener('click', () => {
				this.playerStay();
			});
			this.go.addEventListener('click', () => {	
				this.startNewGame();
			});
			this.restart.addEventListener('click', () => {			
				this.startNewGame();
				this.hideBurstedWin();
			});
			this.quit.addEventListener('click', () => {
				this.resetScore();
				this.clearDealerHand();
				this.showDealerFirstHand(2);
				this.deactivateButtons();
				this.hideBurstedWin();
			});
		}, 400);
	}

	getCardNumber(card) {
		return (card) ? Math.abs(card.toString().split('.')[1]) : 0;
	}

	setCards() {
		for (let h = 1; h <= 4; h++) {
			for (let i = 1; i <= 52; i++) {
				this.cards.push(parseFloat(h + '.' + i));
			}
		}
	}

	getHand(cards = 1) {
    const hand = [];
    let count = Math.min(cards, this.cards.length);
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        hand.push(this.cards[randomIndex]);
        this.cards.splice(randomIndex, 1);
    }
    return hand;
	}

	createCard(card) {
		const cardElement = document.createElement('img');
		cardElement.className = 'playingcards';
		cardElement.alt = 'playing cards';
		const cardNumber = this.getCardNumber(card);
		cardElement.src = `cards/${cardNumber}.png`;
		return cardElement;
	}

	showDealerFirstHand(cards = 1) {
		const hand = this.getHand(cards);
		this.dealerCards = [...this.dealerCards, ...hand];
		for (let i = 0; i < hand.length; i++) {
			if (i === 0) {
				this.hiddenCard = hand[i];
				this.dealerHand.appendChild(this.createCard(0));
			} else {
				this.dealerHand.appendChild(this.createCard(hand[i]));
			}
		}
	}

	showDealerHand(cards = 1) {
		const hand = this.getHand(cards);
		this.dealerCards = [...this.dealerCards, ...hand];
		for (let i = 0; i < hand.length; i++) {
			this.dealerHand.appendChild(this.createCard(hand[i]));
		}
	}

	showPlayerWin()	{
		document.body.classList.add("overlay-active");
		this.playerWin.style.display = 'block';
		this.playerName.setSelectionRange(this.playerName.value.length, this.playerName.value.length);
		this.playerName.focus();
	}

	hidePlayerWin()	{
		document.body.classList.remove("overlay-active");
		this.playerWin.style.display = 'none';
	}

	showBurstedWin() {
		document.body.classList.add("overlay-active");
		this.burstedWin.style.display = 'block';
	}

	hideBurstedWin() {
		document.body.classList.remove("overlay-active");
		this.burstedWin.style.display = 'none';
	}

	clearDealerHand() {
		while (this.dealerHand.firstChild) {
			this.dealerHand.removeChild(this.dealerHand.firstChild);
		}
	}

	isBursted() {
		return this.dealerHand.childElementCount >= 6;
	}

	showHiddenCard() {	
		const newNode = this.createCard(this.dealerCards[0]);
		this.dealerHand.replaceChild(newNode, this.dealerHand.firstChild);
	}

	playerStay() {
		this.showHiddenCard();
		this.showDealerHand();
		this.updateDealerScore(true);
		this.dealerWinner();
		if (this.isBursted()) {
			this.showBurstedWin();
			return false;
		}
	}

	dealerWinner() {
		const score = this.calcDealerScore(false);
		console.log(score);
	}

	calcDealerScore(hidden) { 
		let score = 0;
		if (this.dealerCards.length > 0) {
			for (let i = 0; i < this.dealerCards.length; i++) {
				if (i === 0 && hidden) {
					continue;
				}
				let card = this.getCardNumber(this.dealerCards[i]);
				if (card > 48) { /** aces */
					score += 11;
				} else if ( card > 32) { /** 10, Jack, Queen and King */
					score += 10;
				} else {
					if (card > 28 && card < 33) { /** 9 */
						score += 9;
					} else if (card > 24 && card < 29) { /** 8 */
						score += 8;
					} else if (card > 20 && card < 25) { /** 7 */
						score += 7;
					} else if (card > 16 && card < 21) { /** 6 */
						score += 6;
					} else if (card > 12 && card < 17) { /** 5 */
						score += 5;
					} else if (card > 8 && card < 13) { /** 4 */
						score += 4;
					} else if (card > 4 && card < 9) { /** 3 */
						score += 3;
					} else if (card > 0 && card < 5) { /** 2 */
						score += 2;
					}
				}
			}
		}
		return score;
	}

	activateButtons() {
		this.hit.disabled = false;
		this.stay.disabled = false;
		this.hit.className = 'but-action-on';
		this.stay.className = 'but-action-on';
	}

	deactivateButtons() {
		this.hit.disabled = true;
		this.stay.disabled = true;
		this.hit.className = 'but-action-off';
		this.stay.className = 'but-action-off';
	}

	startNewGame() {
		this.resetScore();
		this.hidePlayerWin();
		this.activateButtons();
		this.clearDealerHand();
		this.showDealerFirstHand(2);
		this.updateDealerScore(true);
	}

	resetDealerCards() {
		this.dealerCards = [];
	}

	resertPlayerCards() {
		this.playerCards = [];
	}

	updateDealerScore(hidden) {
		this.dealerScore.innerHTML = `Dealer Score: ${this.calcDealerScore(hidden)}`;
	}

	resetScore() {
		this.resetDealerCards();
		this.dealerScore.innerHTML = `Dealer Score: ${this.calcDealerScore(true)}`;
		this.playerScoreName.innerHTML = `Player Name: ${this.playerName.value}`;
		this.playerScore.innerHTML = 'Player Score: 0';
	}
}

export default Runner;
