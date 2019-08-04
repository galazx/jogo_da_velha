import React from 'react'
import { Text, View } from 'react-native'

export default players = (props) => 
    <View>
        <Text style={props.estilo}>
            Player O: {props.play1}
        </Text>
        <Text style={props.estilo}>
            Player X: {props.play2}
        </Text>
    </View>