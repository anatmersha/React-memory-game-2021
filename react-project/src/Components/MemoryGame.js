import React from "react";
import "./MemoryGame.css";

class MemoryGame extends React.Component{
    state = {
        cards: [
            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_suzie.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_tommy.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_suzie.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_tommy.png", clicked: false},
        ], clockCount: 0, startBtn: false, movesCount: 0, btnDisplay: "inline", history: [], 
        historyDisplay: "none",gameOverMsg: false, bottomBtnsDisplay: "none"}
        
        clearTime = null;
        LOCAL_SCORES_COUNT = "scores_history";
        choosenCards = [];
        shownCards = [];
        index;

    componentDidMount(){
        this.shuffleCards();
    }

    shuffleCards = () => {this.state.cards.sort(() => Math.random() - 0.5)}

    startGame = () => {
            this.startGameCount();
            this.setState({startBtn: true, btnDisplay: "none",bottomBtnsDisplay: "flex"});
            console.log(this.state.cards);
    }
    
    startGameCount = () => {
        this.clearTime = setInterval(()=>{
            this.setState({clockCount: this.state.clockCount + 1})
        }, 500)
    }
    
    startNewGame = () => {
        this.state.cards.forEach(card => card.clicked = false)
        this.setState({clockCount: 0, movesCount: 0, history: []})
        this.shuffleCards();
        this.startGame();
    }

    flipCardBack = (card) => {
        this.clearBackFlip = setTimeout(()=>{ 
            card.clicked = false;
        }, 500)
    }

    saveClickedCards = (i) => {
        if(this.index===i)return;
        this.index=i
        const temp = this.state.cards;
        const temp2 = this.choosenCards;
     
        if(temp2.length === 0) {
            temp2.push(temp[i])
        } 

        else if(temp2.length === 1) {
            temp2.push(temp[i])
            this.setState({movesCount: this.state.movesCount + 1})
            this.isCardsSame();
        }

    this.setState({cards: temp})  
    }

    isGameOver = () => {

        if(this.state.cards.length === this.shownCards.length) {
            return true
        }
        return false
    }

    isCardsSame = () => {
        let b=[...this.choosenCards]
        console.log(b);
        if(this.choosenCards[0].Image === this.choosenCards[1].Image) {
            this.choosenCards[0].clicked = true;
            this.choosenCards[1].clicked = true;

            for(let i = 0; i < this.choosenCards.length; i++) {
                this.shownCards.push(this.choosenCards[i])
            }
            this.choosenCards.splice(0, 2);
            console.log("same");

        }   else {
            console.log("diffrent");
            this.flipCardBack(this.choosenCards[0]);
            this.flipCardBack(this.choosenCards[1]);
            this.choosenCards.splice(0, 2);
        }
    } 

    getWinHistory = () =>{
        let jsonHistory = localStorage.getItem(this.LOCAL_SCORES_COUNT);
        return jsonHistory ? JSON.parse(jsonHistory) : [];
    }

    appendToHistory = (count, moves) => {
        let historyArray = this.getWinHistory();
        historyArray.push({time: count, moves: moves});
        localStorage.setItem(this.LOCAL_SCORES_COUNT, JSON.stringify(historyArray));
    }

    render() {
        return (
            <div>
                <p className="timer" style={{display: "table-header-group", fontSize: "20px", fontFamily: "fantasy"}}>
                    Time: {this.state.clockCount} seconds</p>
                <h1 style={{color: "gold",fontSize: "100px", marginTop: "-10px"}}>
                    Memory Card Game</h1>

                <button style={{display: this.state.btnDisplay}} className="startBtn" 
                onClick={this.startGame}>START</button>

                  {this.state.gameOverMsg === true ?      
                    <h1 style={{paddingBottom: "50px"}}>Congrats, it took you {this.state.clockCount} seconds 
                    in {this.state.movesCount} moves.</h1>
                  : "" }

                <div id="card">

                {this.state.cards.map((card, i) => {
                     if(this.state.startBtn === true) {
                return(
                    <div key={i} className="flipCard"  onClick={()=> {    
                        const temp = this.state.cards;
                        temp[i].clicked = true;
                        this.setState({cards: temp});  
                        this.saveClickedCards(i);

                        if(this.isGameOver()) {
                            clearInterval(this.clearTime)
                            this.clearTime = null;
                            this.setState({gameOverMsg: true})
                            this.appendToHistory(this.state.clockCount, this.state.movesCount)
                        }
                    }}>

                    <div className="flipCardInner" 
                    style={{transform: card.clicked ? "rotateY(180deg)" : "none"}}>
                    <div className="flipCardBack"></div>
                    <div className="flipCardNumber">
                        <img style={{width:"245px", height:"330px"}} src={card.Image}></img>
                    </div>     
                    </div>                
                    </div>
                    )
                }})}
                </div>

                <div style={{display:this.state.bottomBtnsDisplay, justifyContent:"center",alignItems:"center"}}>
                <button className="restartBtn" 
                onClick={this.startNewGame}>Restart Game</button>


                <button className="historyBtn" onClick={()=>{
                    this.setState({history: this.getWinHistory()})
                    console.log(this.state.history);
                }}>Get History</button>

                </div>
                {this.state.history.map((score, i) => {
                return<p style={{fontSize: "30px"}} key={i}>{i+1}. 
                Time: {score.time} seconds, Moves: {score.moves}</p>
                })}
            </div>
        )
    }
}

export default MemoryGame;