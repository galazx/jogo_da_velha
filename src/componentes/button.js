import React from 'react'
import {Text, TouchableOpacity} from 'react-native'

export default botao = (props) => 
    <TouchableOpacity onPress={props.resetar}
        style={props.estilo}>
        <Text style={props.estilo_botao}>
            Novo Jogo
        </Text>
    </TouchableOpacity>