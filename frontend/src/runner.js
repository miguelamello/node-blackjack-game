class Runner {

	playerWin;
	dealerScore;
	playerScoreName;
	playerScore;
	playerName;
	cards = [];

	constructor() {}

	init() {
		setTimeout(() => {
			this.playerWin = document.querySelector('#oqrhLoDtO');
			this.dealerScore = document.querySelector('#HTCpTWJAh');
			this.playerScoreName = document.querySelector('#bnSddBbUiNfi');
			this.playerScore = document.querySelector('#YhhKVfVNsDv');
			this.playerName = document.querySelector('#vCzoHPwfX');
		}, 250);
		this.setCards();
	}

	setCards() {
		for (let h = 1; h <= 4; h++) {
			for (let i = 1; i <= 52; i++) {
				this.cards.push(parseFloat(h + '.' + i));
			}
		}
	}

	getHand() {
    const hand = [];
    let count = Math.min(2, this.cards.length);
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        hand.push(this.cards[randomIndex]);
        this.cards.splice(randomIndex, 1);
    }
    return hand;
	}

	showPlayerWin()	{
		this.playerWin.style.display = 'block';
		this.playerName.setSelectionRange(this.playerName.value.length, this.playerName.value.length);
		this.playerName.focus();
	}

	hidePlayerWin()	{
		this.playerWin.style.display = 'none';
	}

	startNewGame() {
		this.resetScore();
		this.hidePlayerWin();
		let hand = this.getHand();
		console.log(hand);
	}

	resetScore() {
		this.dealerScore.innerHTML = 'Dealer Score: 0';
		this.playerScoreName.innerHTML = `Player Name: ${this.playerName.value}`;
		this.playerScore.innerHTML = 'Player Score: 0';
	}
}

export default Runner;
