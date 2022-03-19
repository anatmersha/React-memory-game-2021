import React from "react";
import "./MemoryGame.css";

class MemoryGame extends React.Component{
    state = {
        cards: [],
        hardCards: [ 
            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_suzie.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_tommy.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_howard_devile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_stu-Pickles.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_Didi Pickles.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_spike.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lil-Pickles.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_reptar.png", clicked: false},

            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_suzie.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_tommy.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_howard_devile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_stu-Pickles.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_Didi Pickles.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_spike.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lil-Pickles.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_reptar.png", clicked: false},

        ], 
        easyCards: [
            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},

            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
        ],
        mediumCards: [
            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_suzie.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_tommy.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_howard_devile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_stu-Pickles.png", clicked: false},

            {Image: "../RUGRATS-IMGS/rugrats_angelica.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_chucky.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_kimiko.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_lilDevile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_suzie.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_tommy.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_howard_devile.png", clicked: false},
            {Image: "../RUGRATS-IMGS/rugrats_stu-Pickles.png", clicked: false},
        ],
        
        clockCount: 0, startBtn: false, movesCount: 0, btnDisplay: "inline", history: null, 
        historyDisplay: "none",gameOverMsg: false, bottomBtnsDisplay: "none", userName: "anonymous", level: "easy"}
        
        clearTime = null;
        LOCAL_SCORES_COUNT = "scores_history";
        choosenCards = [];
        shownCards = [];
        index;

    componentDidMount(){
        this.shuffleCards();
    }

    shuffleCards = () => {
        if(this.state.level === "easy") this.setState({cards: this.state.easyCards})
        if(this.state.level === "medium") this.setState({cards: this.state.mediumCards})
        if(this.state.level === "hard") this.setState({cards: this.state.hardCards})

        this.state.cards.sort(() => Math.random() - 0.5)     
    }

    startGame = () => {
            this.startGameCount();
            this.shuffleCards();
            this.setState({startBtn: true, btnDisplay: "none",bottomBtnsDisplay: "flex"});
    }
    
    startGameCount = () => {
        this.clearTime = setInterval(()=>{
            this.setState({clockCount: this.state.clockCount + 1})
        }, 500)
    }
    
    startNewGame = () => {
        this.setState({startBtn: true, clockCount: 0, movesCount: 0, history: null, gameOverMsg: false})
        this.shownCards = [];
        this.choosenCards = [];
        this.state.cards.forEach(card => card.clicked = false)
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
console.log(this.state.cards, this.shownCards);
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

    getWinHistory = () => {
        let jsonHistory = localStorage.getItem(this.LOCAL_SCORES_COUNT);
        return jsonHistory ? JSON.parse(jsonHistory) : [];
    }

    appendToHistory = (name, count, moves, level) => {
        let historyArray = this.getWinHistory();
        historyArray.push({name: name, time: count, moves: moves, level: level});
        localStorage.setItem(this.LOCAL_SCORES_COUNT, JSON.stringify(historyArray));
    }

    backToMenu = () => {
        this.setState({startBtn: false, btnDisplay: "inline", bottomBtnsDisplay: "none", clockCount: 0, history: null, movesCount: 0, gameOverMsg: false})
        clearInterval(this.clearTime)
    } 

    render() {
        return (
            <div>
            <div>
                <div className="mainBlock">
                <p className="timer">
                    Time: {this.state.clockCount} seconds</p>
                <h1 className="mainHeader">
                    Memory Card Game</h1>

                <img className="mainImg" style={{display: this.state.btnDisplay}} src="../RUGRATS-IMGS/pixel-rugrats.png" alt=""/>
                    
                <div className="startMenu">
                <input style={{display: this.state.btnDisplay}} className="nameInput" placeholder="Insert your name" onChange={(e)=> {
                    this.setState({userName: e.target.value})
                }}/>

                <select 
                className="levels" 
                style={{display: this.state.btnDisplay}}
                value={this.state.level} 
                onChange={(e)=> this.setState({level: e.target.value})}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button style={{display: this.state.btnDisplay}} className="startBtn" 
                onClick={this.startGame}>START</button>
                </div>

                  {this.state.gameOverMsg === true ? 
                  <div className="gameOverMsgBox">     
                    <h1 className="gameOverMsg">Congrats {this.state.userName},<br></br> it took you {this.state.clockCount} seconds 
                    in {this.state.movesCount} moves at level {this.state.level}.</h1>
                    </div>
                  : "" }

                <div className={this.state.level === "easy" ? "card_easy" : (this.state.level === "medium" ? "card_medium" : "card_hard")}>

                {this.state.cards.map((card, i) => {
                     if(this.state.startBtn === true) {
                return(
                    <div key={i} 
                    className={this.state.level === "easy" ? "flipCard_easy" : (this.state.level === "medium" ? "flipCard_medium" : "flipCard_hard")}

                        onClick={()=> {    
                        const temp = this.state.cards;
                        temp[i].clicked = true;
                        this.setState({cards: temp});  
                        this.saveClickedCards(i);

                        if(this.isGameOver()) {
                            clearInterval(this.clearTime)
                            this.clearTime = null;
                            this.setState({gameOverMsg: true})
                            this.appendToHistory(this.state.userName ,this.state.clockCount, this.state.movesCount, this.state.level)
                        }
                    }}>

                    <div className="flipCardInner" 
                    style={{transform: card.clicked ? "rotateY(180deg)" : "none"}}>
                    <div className="flipCardBack"></div>
                    <div className="flipCardNumber">
                        <img 
                        className={this.state.level === "easy" ? "cardImg_easy" : (this.state.level === "medium" ? "cardImg_medium" : "cardImg_hard")}
                        src={card.Image}>
                        </img>
                    </div>     
                    </div>                
                    </div>
                    )
                }})}
                </div>
               

                <div className="controlBtns" style={{display:this.state.bottomBtnsDisplay}}>
                <button className="menuBtn" onClick={this.backToMenu}>Back To Menu</button>
                <button className="restartBtn" 
                onClick={this.startNewGame}>Restart Game</button>

                <button className="historyBtn" onClick={()=>{
                  { !this.state.history ? 
                    this.setState({history: this.getWinHistory()})
                    : this.setState({history: null})} 

                }}>Get History</button>

                <div className="showHistory" style={{height: this.state.history ? "27vh" : "", overflowY: this.state.history ? "scroll" : ""}}>
                {this.state.history ? this.state.history.map((score, i) => {
                return(
                <>
                <p className="historyInfo" key={i}>{i+1}. 
                {score.name}: {score.time} seconds <br/> in {score.moves} moves at level {score.level}</p>
                </>
                )}):""}
                </div>

                </div>
                 </div>

            </div>
            </div>
        )
    }
}

export default MemoryGame;