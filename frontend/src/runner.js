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
	alertWin;
	alertMsg
	hiddenCard;
	hiddenCardStatus = false;
	cards = [];
	dealerCards = [];
	playerCards = [];
	actualPlayer = '';
	scoreSum = 0;
	scoresBoard;
	scoresData;

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
			this.dealerHand = document.querySelector('#HTCpTWJAh');
			this.playerScoreName = document.querySelector('#bnSddBbUiNfi');
			this.playerScore = document.querySelector('#cd4qlwyz82cb');
			this.playerHand = document.querySelector('#YhhKVfVNsDv');
			this.playerName = document.querySelector('#vCzoHPwfX');
			this.dealerCardsPanel = document.querySelector('#wwZlsPUv');
			this.playerCardsPanel = document.querySelector('#VJINJzAVKKy');
			this.alertWin = document.querySelector('#wt4pccnsvg56');
			this.alertMsg = document.querySelector('#s0axwaqdk6t8');
			this.scoresBoard = document.querySelector('#d9hclh9s8rmc');
			this.scoresData = document.querySelector('#tt43k1dytf38');
		}, 300);
	}

	addEventListeners() {
		setTimeout(() => {
			this.newGame.addEventListener('click', () => {
				this.showPlayerWin();
			});
			this.hit.addEventListener('click', () => {
				this.playerHit();
			});
			this.stay.addEventListener('click', () => {
				this.playerStay();
			});
			this.go.addEventListener('click', () => {	
				this.savePlayerName();
			});
			this.scores.addEventListener('click', () => {
				this.showScoresBoard();
			});
		}, 600);
	}

	restart() {
		this.hiddenCardStatus = false;
		this.setCards();
		this.resetScore();
		this.resetDealerCards();
		this.resertPlayerCards();
		this.activateButtons();
		this.clearDealerHand();
		this.clearPlayerHand();
		this.showDealerFirstHand(2);
		this.showPlayerFirstHand(2);
		this.updateDealerScore(true);
		this.updatePlayerScore();
		this.hidePlayerWin();
		this.hideAlertWin();
		this.playerIsBlackjack();
	}

	quit() {
		this.hiddenCardStatus = false;
		this.scoreSum = 0;
		this.setCards();
		this.resetScore();
		this.resetDealerCards();
		this.resertPlayerCards();
		this.clearDealerHand();
		this.clearPlayerHand();
		this.showDealerFirstHand(2);
		this.showPlayerFirstHand(2);
		this.deactivateButtons();
		this.hideAlertWin();
	}

	getCardNumber(card) {
		return (card) ? Math.abs(card.toString().split('.')[1]) : 0;
	}

	setCards() {
		this.cards = [];
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
				this.dealerCardsPanel.appendChild(this.createCard(0));
			} else {
				this.dealerCardsPanel.appendChild(this.createCard(hand[i]));
			}
		}
	}

	showPlayerFirstHand(cards = 1) {
		const hand = this.getHand(cards);
		this.playerCards = [...this.playerCards, ...hand];
		for (let i = 0; i < hand.length; i++) {
			this.playerCardsPanel.appendChild(this.createCard(hand[i]));
		}
	}

	showDealerHand(cards = 1) {
		const hand = this.getHand(cards);
		this.dealerCards = [...this.dealerCards, ...hand];
		for (let i = 0; i < hand.length; i++) {
			this.dealerCardsPanel.appendChild(this.createCard(hand[i]));
		}
	}

	showPlayerHand(cards = 1) {
		const hand = this.getHand(cards);
		this.playerCards = [...this.playerCards, ...hand];
		for (let i = 0; i < hand.length; i++) {
			this.playerCardsPanel.appendChild(this.createCard(hand[i]));
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

	showAlertWin(msg = '') {
		document.body.classList.add("overlay-active");
		this.alertMsg.innerHTML = msg;
		this.alertWin.style.display = 'block';
	}

	hideAlertWin() {
		document.body.classList.remove("overlay-active");
		this.alertWin.style.display = 'none';
	}

	clearDealerHand() {
		while (this.dealerCardsPanel.firstChild) {
			this.dealerCardsPanel.removeChild(this.dealerCardsPanel.firstChild);
		}
	}

	clearPlayerHand() {
		while (this.playerCardsPanel.firstChild) {
			this.playerCardsPanel.removeChild(this.playerCardsPanel.firstChild);
		}
	}

	isBusted() {
		return this.dealerCardsPanel.childElementCount >= 6 || this.playerCardsPanel.childElementCount >= 6;
	}

	showHiddenCard() {	
		const newNode = this.createCard(this.dealerCards[0]);
		this.dealerCardsPanel.replaceChild(newNode, this.dealerCardsPanel.firstChild);
		this.updateDealerScore(false);
	}

	playerHit() {
		this.showPlayerHand();
		this.updatePlayerScore();
		if (this.isBusted()) {
			this.showAlertWin('Busted!');
			return false;
		}
		this.getWinnerFlowHit(true);
	}

	playerStay() {
		this.showHiddenCard();
		if (this.hiddenCardStatus) {
			this.showDealerHand();
			this.updateDealerScore(false);
		}
		this.hiddenCardStatus = true;
		if (this.isBusted()) {
			this.showAlertWin('Busted!');
			return false;
		}
		this.getWinnerFlowStay();
	}

	getWinnerFlowHit(verify = false) {
		const dealerScore = this.calcDealerScore(false);
		const playerScore = this.calcPlayerScore(verify);
		if (playerScore >= 17 && playerScore <= 21) {
			if (dealerScore >= 17 && dealerScore <= 21) {
				this.showHiddenCard();
				this.updateDealerScore();
				this.updatePlayerScore();
				if (playerScore == dealerScore) {
					this.showAlertWin('Pushed!');
				} else if (dealerScore > playerScore) { 
					this.showAlertWin('$$$ Dealer Wins! $$$');
				} else {
					if (playerScore > dealerScore) {
						this.scoreSum += playerScore;
						this.showAlertWin('$$$ Player Wins! $$$');
					}
				}
			} else { 
				this.showHiddenCard();
				if (dealerScore < 17) {
					this.updateDealerScore();
					this.updatePlayerScore();
				} else if (playerScore == 21) {
					this.updateDealerScore();
					this.updatePlayerScore();
					this.scoreSum += playerScore;
					this.showAlertWin('$$$ Player Wins! $$$');
				} else if (playerScore > 21) {
					this.updateDealerScore();
					this.updatePlayerScore();
					this.showAlertWin('$$$ Dealer Wins! $$$');
				}
			}
		} else {
			this.showHiddenCard();
			if (playerScore >= 21) { 
				this.updateDealerScore();
				this.updatePlayerScore();
				if (playerScore > dealerScore) { 
					this.showAlertWin('$$$ Dealer Wins! $$$');
				} else { 
					this.scoreSum += playerScore;
					this.showAlertWin('$$$ Player Wins! $$$');
				}
			} else { 
				this.updateDealerScore();
				this.updatePlayerScore();
			}
		}
	}

	getWinnerFlowStay(verify = false) {
		const dealerScore = this.calcDealerScore(false);
		const playerScore = this.calcPlayerScore(verify);
		if (dealerScore > 21 && playerScore > 21) {
			let newPlayerScore = this.calcPlayerScore(true);
			if (newPlayerScore <= 21) {
				this.getWinnerFlowStay(true);
			} else {
				this.showAlertWin('Busted!');
			}
		} else if (dealerScore == 21 && playerScore == 21) {
			this.showAlertWin('Pushed!');
		} else {
			if (playerScore > 21) {
				let newPlayerScore = this.calcPlayerScore(true);
				if (newPlayerScore <= 21) {
					this.updatePlayerScore();
					this.getWinnerFlowStay(true);
				} else {
					this.updateDealerScore();
					this.showAlertWin('$$$ Dealer Wins! $$$');
				}
			} else if (dealerScore > 21) {
				this.updateDealerScore();
				this.updatePlayerScore();
				this.scoreSum += playerScore;
				this.showAlertWin('$$$ Player Wins! $$$');
			} else {
				if (dealerScore > playerScore) {
					if (dealerScore < 17) {
						this.showDealerHand();
						this.updateDealerScore();
						this.getWinnerFlowStay(true);
					} else {
						this.updateDealerScore();
						this.showAlertWin('$$$ Dealer Wins! $$$');						
					}
				} else if (playerScore > dealerScore) {
					if (this.dealerCardsPanel.childElementCount == 2) {
						this.showDealerHand();
						this.updateDealerScore();
						this.getWinnerFlowStay(true);
					} else {
						if (playerScore >= 17) {
							if (dealerScore < 17) {
								this.showDealerHand();
								this.updateDealerScore();
								this.getWinnerFlowStay(true);
							} else {
								this.updatePlayerScore();
								this.scoreSum += playerScore;
								this.showAlertWin('$$$ Player Wins! $$$');
							}		
						}
					}
				} else {
					if (this.dealerCardsPanel.childElementCount == 2) {
						this.showDealerHand();
						this.updateDealerScore();
						this.getWinnerFlowStay(true);
					} else {
						if (dealerScore >= 17 && playerScore >= 17) {
							if (dealerScore <= 21 && playerScore <= 21) {
								this.showDealerHand();
								this.updateDealerScore();
								this.getWinnerFlowStay(true);
							}
						}
					}
				}
			}
		}
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

	calcPlayerScore(verify = false) { 
		let score = 0;
		if (this.playerCards.length > 0) {
			for (let i = 0; i < this.playerCards.length; i++) {
				let card = this.getCardNumber(this.playerCards[i]);
				if (card > 48) { /** aces */
					if (verify) {
						score += 1;
					} else {
						score += 11;
					}
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

	// Verify if player hand is a Blackjack
	playerIsBlackjack() {
		let blackjack = 0;
		if (this.playerCards.length > 0) {
			for (let i = 0; i < this.playerCards.length; i++) {
				let card = this.getCardNumber(this.playerCards[i]);
				if (card >= 49) { /** aces */
					blackjack += 11;
				} else if (card >= 37 && card <= 48) { /** Jack, Queen and King */
					blackjack += 10;
				}
			}
		}
		if (blackjack === 21) {
			this.scoreSum += 21;
			this.updateDealerScore();
			this.showAlertWin('$$$ BLACK JACK! $$$<br>Player Wins!');
		}
	}

	startNewGame() {
		this.hiddenCardStatus = true;
		this.scoreSum = 0;
		this.setCards();
		this.resetScore();
		this.resetDealerCards();
		this.resertPlayerCards();
		this.activateButtons();
		this.clearDealerHand();
		this.clearPlayerHand();
		this.showDealerFirstHand(2);
		this.showPlayerFirstHand(2);
		this.updateDealerScore(true);
		this.updatePlayerScore();
		this.hidePlayerWin();
		this.hideAlertWin();
		this.playerIsBlackjack();
	}

	resetDealerCards() {
		this.dealerCards = [];
	}

	resertPlayerCards() {
		this.playerCards = [];
	}

	updateDealerScore(hidden) {
		this.dealerHand.innerHTML = `Dealer Hand: ${this.calcDealerScore(hidden)}`;
	}

	updatePlayerScore() {
		let newPlayerScore = this.calcPlayerScore();
		this.playerHand.innerHTML = `Player Hand: ${newPlayerScore}`;
		this.playerScore.innerHTML = `Player Score: ${this.scoreSum}`;
		let newScore = { player: this.actualPlayer, score: this.scoreSum };
		this.saveData(newScore);
	}

	resetScore() {
		this.dealerHand.innerHTML = 'Dealer Hand: 0';
		this.playerHand.innerHTML = 'Player Hand: 0';
		this.playerScoreName.innerHTML = `Player Name: ${this.actualPlayer}`;
		this.playerScore.innerHTML = `Player Score: ${this.scoreSum}`;		
	}

	savePlayerName() {
		this.actualPlayer = '';
		let playerName = this.playerName.value.trim();
		if (playerName.length == 0) {
			return false;
		}
		this.actualPlayer = playerName;
		this.startNewGame();
	}

	hideScoresWin() {
		document.body.classList.remove("overlay-active");
		this.scoresBoard.style.display = 'none';
	}

	async showScoresBoard() { 
		this.scoresData.innerHTML = '';
		const table = document.createElement('table');
		table.className = 'scores-table';	
		const data = await this.readData();
		if (data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				const tr = document.createElement('tr');
				const td1 = document.createElement('td');
				const td2 = document.createElement('td');
				td1.innerHTML = data[i].player;
				td2.innerHTML = data[i].score;
				tr.appendChild(td1);
				tr.appendChild(td2);
				table.appendChild(tr);
			}
		}
		this.scoresData.appendChild(table);
		document.body.classList.add("overlay-active");
		this.scoresBoard.style.display = 'block';
	}

	readData() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', 'http://blackjack-api.orionsoft.site:3020/scores', true);
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		});
	}

	saveData(data) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', 'http://blackjack-api.orionsoft.site:3020/scores', true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send(JSON.stringify(data));
		});
	}
}

export default Runner;
