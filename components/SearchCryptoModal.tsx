import React, { useState } from 'react'
import { Modal, ScrollView, TextInput, TouchableOpacity, View, Text, FlatList } from 'react-native'
import { items } from '../screens/items'
import { SearchableRow } from './SearchableRow'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSetState } from '../hooks/mySetState';
import {SearchScreenRow} from './SearchScreenRow'

interface SearchCryptoProps {
    visible:boolean;
    closeModal:any;
    getData:any;
}

export const SearchCryptoModal:React.FC<SearchCryptoProps> = ({visible, closeModal, getData}) => {
    const [crypto, setCrypto] = useState<string>();
    const [searchValue, setSearchValue] = useState<string>('')
    const [state, setState, getState] = useSetState()
    async function updateCrypto(cryptoCoin:string) {
         setState(cryptoCoin)
    }
    const [allItems, setAllItems] = useState(items)
    
    return (
        <Modal
        animationType = "fade"
        transparent={false}
        visible={visible}
        style={{borderRadius:50, maxHeight:500}}
        >
            <View style={{flex:1,backgroundColor:'#1F1D2B',}}>
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
            
          <TextInput onChangeText={(text:string)=>{setSearchValue(text); text == '' ? setAllItems(items) : setAllItems(allItems.filter(item=>item.id.toLowerCase().includes(searchValue.toLowerCase()))); }} style={{backgroundColor:'#252836', padding:10, margin:10, color:'#fff', fontSize:24, borderRadius:15}}
                 placeholder='Bitcoin' placeholderTextColor="#fff" />
                 <FlatList
      contentContainerStyle={{
        backgroundColor:'#252836', padding:5, marginBottom:10, borderRadius:15
      }}
      data={allItems}
      //@ts-ignore
      keyExtractor={item => item?.symbol}
      renderItem={({ item }) => (
        //@ts-ignore
        <SearchScreenRow onPress={()=>{updateCrypto(item.id).then(async ()=>getData(await getState()));setCrypto(item.id);console.log("ItemID",item.id); console.log("XXXX",crypto);closeModal(); }}
        //@ts-ignore
         name={item?.name} symbol={item.symbol} image={item.image}  />
      )}
      />
                 {/* <ScrollView style={{ margin:5}}>
                    {allItems && allItems.map((item:any)=>{
                        return (
                    <SearchableRow key={item.id} onPress={()=>{updateCrypto(item.id).then(async ()=>getData(await getState()));setCrypto(item.id);console.log("ItemID",item.id); console.log("XXXX",crypto);closeModal(); }} symbol={item.symbol} name={item.name}/>
                     )
                 })}
       </ScrollView> */}
            </View>
        </Modal>
    )
}

//console.log("hey");setCrypto(item.id);
//closeModal(); getData(crypto)