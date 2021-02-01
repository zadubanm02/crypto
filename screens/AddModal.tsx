import React, { useEffect } from 'react'
import { useRef } from 'react'
import { Picker } from '@react-native-community/picker'
import { View, Modal, ScrollView, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image } from 'react-native'
import {items} from './items'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//@ts-ignore
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useState } from 'react';
import axios from 'axios'
import { usePortfolioCoins } from '../asyncStorage/usePortfolioCoins'
import DropDownPicker from 'react-native-dropdown-picker';
import { Searchable } from '../components/Searchable'
import { SearchableRow } from '../components/SearchableRow'
import { SearchCryptoModal } from '../components/SearchCryptoModal'
import { useNavigation } from '@react-navigation/native'
import { Portfolio } from '../utils/Portfolio'
import { useSelector, useDispatch } from 'react-redux'
import { addCoin } from '../redux/reducer'
import { parse } from '@babel/core'




export const AddModal = ({visible, add, closeModal}) => {
    const [selectedCoin, setSelectedCoin] = useState<string>('')
    const [value, setValue] = useState<number>()
    const [coinToAdd, setCoinToAdd] = useState<Portfolio>({id:'', value:0})
    const [data, setData] = useState<any>()
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
    const coin = useSelector(state => state.coin)

    const dispatch = useDispatch()

    const {addCoinToPortfolio, portfolio, deleteFromPortfolio, editCoin, refreshPortfolio} = usePortfolioCoins()
    
    async function updateCrypto(crypto: string) {
        await setSelectedCoin(crypto)
        await setCoinToAdd({...coinToAdd,id:crypto})
        dispatch(addCoin({...coin, id:crypto}))
    }

    function getDataFromChild(childData:string) {
        setSelectedCoin(childData)
        
    }

    useEffect(()=>{
        axios.get(`https://api.coingecko.com/api/v3/coins/${selectedCoin}?market_data=true`)
        .then((result)=>{
            console.log("Result",result)
            setData(result.data)
        })
        console.log('Portfolio', portfolio)
    }, [selectedCoin])
    return (
        <Modal
        animationType = "fade"
        transparent={false}
        visible={visible}
        style={{borderRadius:50}}
        >
        <View style={{flex:1,backgroundColor:'#1A153A', paddingVertical:10, marginTop:20}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>closeModal()} style={{padding:10, margin:10}}>
                <Icon name="close" size={36} color={'#fff'}/>
                </TouchableOpacity>
                <View style={{padding:10, margin:10}}>
                <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>Add coin to your portfolio</Text>
                <Text style={{color:'#fff'}}>{JSON.stringify(coin)}</Text>

                 </View>
                <View style={{padding:10, margin:10}}>
                </View>
            </View>
            <View style={{marginTop:40}}>
                <TextInput onChangeText={(text:string)=>{setValue(parseFloat(text));dispatch(addCoin({...coin, value:parseFloat(text)}));setCoinToAdd({...coinToAdd,value:parseFloat(text)}) }} style={{backgroundColor:'#2B2C5F', padding:10, margin:10, color:'#fff', fontSize:24, borderRadius:15}}
                 placeholder='00.00' placeholderTextColor="#fff" />
                 <TouchableOpacity onPress={()=>setModalVisible(true)} style={{backgroundColor:'#2B2C5F', padding:10, margin:10, borderRadius:15}}>
                     <Text style={{color:"#fff",fontSize:24,textTransform:'uppercase'}}>{selectedCoin == '' ? 'Select cryptocurrency' : selectedCoin}</Text>
                 </TouchableOpacity>
                
            </View>
            <SearchCryptoModal getData={(crypto:any) => updateCrypto(crypto)} visible={isModalVisible} closeModal={()=>{setModalVisible(false)}}/>

            <View style={{padding:10, margin:10, borderRadius:20}}>
                <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}> Summary</Text>
                <Text style={{color:'#fff', fontSize:28, fontWeight:'bold', padding:10, marginVertical:10, textTransform:'uppercase'}}> {value} {data?.symbol} <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:5}}  source={{
          uri: data?.image?.small,
        }} /></Text>
                <Text style={{color:'#fff', fontSize:28, fontWeight:'bold', padding:10, marginVertical:10}}> {(value  * data?.market_data?.current_price?.eur)  } EUR</Text>
            </View>
            <Text style={{color:'#fff'}}>{selectedCoin }{value}{JSON.stringify(coinToAdd)}</Text>
            <View style={{flex:1,justifyContent:'flex-end', marginBottom:30}}>
                <TouchableOpacity style={{backgroundColor:'#2B2C5F', padding:10, margin:10, borderRadius:15}}
                //@ts-ignore
                onPress={()=>{add(); closeModal()}}
                >
                    <Text style={{fontSize:22, fontWeight:'bold', color:'#fff', textAlign:'center', padding:8}}>Add to portfolio</Text>
                </TouchableOpacity>
            </View>
        </View>
        </Modal>
    )
}




