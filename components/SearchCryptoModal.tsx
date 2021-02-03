import React, { useState } from 'react'
import { Modal, ScrollView, TextInput, TouchableOpacity, View, Text } from 'react-native'
import { items } from '../screens/items'
import { SearchableRow } from './SearchableRow'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSetState } from '../hooks/mySetState';]

interface SearchCryptoProps {
    visible:boolean;
    closeModal:any;
    getData:any;
}

export const SearchCryptoModal:React.FC<SearchCryptoProps> = ({visible, closeModal, getData}) => {
    const [crypto, setCrypto] = useState<string>();
    const [searchValue, setSearchValue] = useState<string>()
    const [state, setState, getState] = useSetState()
    async function updateCrypto(cryptoCoin:string) {
         setState(cryptoCoin)
    }


    

    return (
        <Modal
        animationType = "fade"
        transparent={false}
        visible={visible}
        style={{borderRadius:50, maxHeight:500}}
        >
            <View style={{flex:1,backgroundColor:'#1A153A',}}>
             <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>closeModal()} style={{padding:10, margin:10}}>
                <Icon name="close" size={36} color={'#fff'}/>
                </TouchableOpacity>
                <View style={{padding:10, margin:10}}>
                <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>Select Coin {crypto}</Text>
                 </View>
                <View style={{padding:10, margin:10}}>
                </View>
            </View>
          <TextInput onChangeText={(text:string)=>{setSearchValue(text); console.log(searchValue)}} style={{backgroundColor:'#2B2C5F', padding:10, margin:10, color:'#fff', fontSize:24, borderRadius:15}}
                 placeholder='Bitcoin' placeholderTextColor="#fff" />
                 <ScrollView style={{ margin:5}}>
                    {items && items.map((item:any)=>{
                        return (
                    <SearchableRow key={item.id} onPress={()=>{updateCrypto(item.id).then(async ()=>getData(await getState()));setCrypto(item.id);console.log("ItemID",item.id); console.log("XXXX",crypto);closeModal(); }} symbol={item.symbol} name={item.name}/>
                     )
                 })}
       </ScrollView>
            </View>
        </Modal>
    )
}

//console.log("hey");setCrypto(item.id);
//closeModal(); getData(crypto)