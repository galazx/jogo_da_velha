import React, { Component } from 'react';
import {
  StyleSheet,
  View, 
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Players from './src/componentes/players'
import Button from './src/componentes/button'

const initialState = {
    game_over: false,
    board: ['', '', '', '', '', '', '', '', ''],
    playerID: 0,
    playerCont: [0, 0]
}

export default class App extends Component {    
    state= { ...initialState }    
    constructor(props){
        super(props) 
        this.verifica = this.verifica.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }

    gameOver(){
        const tab= ['', '', '', '', '', '', '', '', '']
        let turn = this.state.playerID == 0 ? 0 : 1
        this.setState({board: tab, playerID: turn, game_over: false})
    }

   verifica(matriz){
     const winning= [[0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
     let cont = 0
     let placar = this.state.playerCont
     const vez = this.state.playerID === 0 ? 'O' : 'X'
     for (j = 0; j < winning.length; j++) {
     for (i = 0; i<winning[0].length; i++){
         if (matriz[winning[j][i]] === vez){
             cont += 1
             if (cont === 3){
                this.setState({game_over: true})
                if (vez === 'O'){
                    placar[0] += 1
                }else {
                    placar[1] += 1
                }
                this.setState({playerCont: placar})
                return
            }
         } 
     }
     cont = 0
    }
   }

    makemove(value, index){
        if ( value !== '' || this.state.game_over === true){
            return
        } 

        let casaAux = this.state.board
        if (this.state.playerID === 0) {
            casaAux[index] = 'O'
            this.setState({ playerID: 1 })
        } else{
            casaAux[index] = 'X'
            this.setState({ playerID: 0 })
        }     
        this.setState({board: casaAux})
        this.verifica(casaAux)   
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.board.map((value, index) => (
                    <TouchableOpacity key={index}
                        onPress={() => this.makemove(value, index)}
                        style={styles.pieces}>
                        <Text style={styles.texto}> {this.state.board[index]} 
                        </Text>
                    </TouchableOpacity>
                ))}
                <View style={styles.container_btn}>
                    <Players estilo={styles.players} 
                        play1={this.state.playerCont[0]}
                        play2={this.state.playerCont[1]}/>
                    <Button estilo={styles.botao}
                        estilo_botao={styles.botao_text}
                        resetar={this.gameOver}/>
                </View>
            </View>
      )   
  }

}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#99b3ff',     
    },
    pieces: {
        backgroundColor: '#4682B4',
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
        borderColor: '#DDD',
        borderRadius: 5, 
        borderWidth: 2,
        },
    texto: {
        fontSize: 80,
        color: 'white',
        marginLeft: 15
    },
    players: {
        fontSize: 49,
        color: 'white',
        backgroundColor: 'green'
    },
    container_btn: {
        width : Dimensions.get('window').width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        alignContent: 'center'
    },
    botao: {
        backgroundColor: 'white',
        width: 110,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botao_text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})
