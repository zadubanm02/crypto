import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface RowProps {
    onPress:any;
    id:any;
    name:string;
    symbol:string;
}

export const SearchableRow:React.FC<RowProps> = ({onPress,id, name, symbol}) => {
    return (
        <View>
        <Pressable onPress={()=>onPress()} 
        style={{backgroundColor:'#252836', padding:10, margin:5, flexDirection:'row', borderRadius:15}}>
            <Text style={{textTransform:'uppercase', color:'#fff', fontWeight:'bold', fontSize:18, marginHorizontal:10}}>{symbol}</Text>
            <Text style={{textTransform:'uppercase', color:'#fff', fontWeight:'bold', fontSize:18}}>{name}</Text>
        </Pressable>
        </View>
    )
}

