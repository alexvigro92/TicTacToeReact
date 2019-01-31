import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { subscribeToTicTacToe } from '../../socket';

const style = {
  margin: 12,
  height: 88,
  width: 88
};

const styleButtons = {
  margin: 10
}

const toWin = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const stylePaper = {
  height: 75,
  width: 400,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export class GridComponent extends Component{

  constructor(props){
    super(props);

    subscribeToTicTacToe((err, timestamp) => this.setState({
      timestamp
    }));

    this.state = {
      button: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
      timestamp: 'no timestamp yet',
      nextPlayer: "X",
      winner: "0",
      open: true,
      jugadorX: '',
      jugador0: '',
      jugadorGanadasX: 0,
      jugadorGanadas0: 0,
      openWinner: false
    }
  }

  setAMove = (id) =>{
    let button = this.state.button;
    let nextPlayer = this.state.nextPlayer;

    button[id] = ((button[id] !== 'X') && (button[id] !== '0'))? this.state.nextPlayer:button[id];
    nextPlayer = (nextPlayer === "X")? "0":"X";

    this.setState({button, nextPlayer});
    this.verifyIfWin();
  }

  verifyIfWin = () => {
    let button = this.state.button;
    let jugadorGanadasX = this.state.jugadorGanadasX;
    let jugadorGanadas0 = this.state.jugadorGanadas0;
    let result = false
    for (var i = 0; i < toWin.length; i++) {
      result = ((button[toWin[i][0]] === button[toWin[i][1]]) && (button[toWin[i][2]] === button[toWin[i][0]]))? ((button[toWin[i][2]] !== ' ')? button[toWin[i][2]]:false):false;
      if(result !== false){
        this.setState({winner: result,openWinner: true});
        if(result === 'X'){
          jugadorGanadasX = jugadorGanadasX + 1;
          this.setState({jugadorGanadasX})
        }else{
          jugadorGanadas0 = jugadorGanadas0 + 1;
          this.setState({jugadorGanadas0})
        }
        break;
      }
    }
  }

  clearAll = () => {
    this.setState({
      button: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
      nextPlayer: "X",
      winner: "0"
    })
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleCloseWinner = () => {
    this.setState({openWinner: false});
    this.clearAll();
  };


  render(){

    const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={this.handleClose}
       name="cancelAction"
       id="cancelAction"
     />,
     <FlatButton
       label="Ok"
       primary={true}
       keyboardFocused={true}
       onClick={this.handleClose}
       name="okAction"
       id="okAction"
     />,
   ];

    const actionsWinner = [
     <FlatButton
       label="Ok"
       primary={true}
       keyboardFocused={true}
       onClick={this.handleCloseWinner}
       name="okActionWinner"
       id="okActionWinner"
     />,
   ];

    return(
      <div>
        <Paper style={stylePaper} zDepth={2}>
          <br/>
          <b>{this.state.jugadorGanadasX}</b> Jugador X: <b>{this.state.jugadorX}</b>
          <br/>
          <b>{this.state.jugadorGanadas0}</b> Jugador 0: <b>{this.state.jugador0}</b>
          <br/>
        </Paper>
        <div>
          <RaisedButton name="0" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[0]} onClick={() => this.setAMove(0)} />
          <RaisedButton name="1" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[1]} onClick={() => this.setAMove(1)} />
          <RaisedButton name="2" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[2]} onClick={() => this.setAMove(2)} />
        </div>
        <div>
          <RaisedButton name="3" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[3]} onClick={() => this.setAMove(3)} />
          <RaisedButton name="4" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[4]} onClick={() => this.setAMove(4)} />
          <RaisedButton name="5" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[5]} onClick={() => this.setAMove(5)} />
        </div>
        <div>
          <RaisedButton name="6" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[6]} onClick={() => this.setAMove(6)} />
          <RaisedButton name="7" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[7]} onClick={() => this.setAMove(7)} />
          <RaisedButton name="8" style={style} disabled={(this.state.winner !== "0")} label={this.state.button[8]} onClick={() => this.setAMove(8)} />
        </div>
        <div>
            <RaisedButton name="clearAll" id="clearAll" style={styleButtons} label="Clear Game" primary={true} onClick={() => this.clearAll()} />
            <RaisedButton name="changeName" id="changeName" style={styleButtons} label="Change Names" primary={true} onClick={() => this.setState({open: true})} />
        </div>
        <a href="https://www.google.com.mx" target="_blank">Link a google</a>

        <Dialog
          title="Diganme sus nombres!!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        Jugador con la X:
        <br/>
        <TextField name="jugadorXName" hintText="John Doe" onChange={(event) => this.setState({jugadorX: event.target.value})}/>
        <br/>
        Jugador con el 0:
        <br/>
        <TextField name="jugador0Name" hintText="John Doe" onChange={(event) => this.setState({jugador0: event.target.value})}/>
        <br/>
        </Dialog>

        <Dialog
          title="EL GANADOR ES"
          actions={actionsWinner}
          modal={false}
          open={this.state.openWinner}
          onRequestClose={this.handleCloseWinner}
        >
        {
          (this.state.winner === 'X')? this.state.jugadorX:this.state.jugador0
        }
        </Dialog>

      </div>
    );
  }

}
