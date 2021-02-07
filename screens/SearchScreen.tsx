import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
//import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {  useGecko  } from '../coingecko/useGecko';
import CryptoCard from '../components/CryptoCard';
import { CryptoRow } from '../components/CryptoRow';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, FlatList } from 'react-native';
import { RefreshControl } from 'react-native';
import { MiniGraph } from '../components/MiniGraph';
import { DetailScreen } from './DetailScreen';
//@ts-ignore
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { items } from './items';
import {SearchScreenRow} from '../components/SearchScreenRow'



const wait = (timeout:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function TabTwoScreen() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [allItems, setAllItems] = useState(items)
  const [refreshing, setRefreshing] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('')
    const toggleModal = () => {
        console.log(isModalVisible)
        setModalVisible(!isModalVisible);
    };
const navigation = useNavigation()
const filterItems = (text:string) => {
    setAllItems(items)
    text == '' ? setAllItems(items) :
   setAllItems(allItems.filter(item=>item.id.toLowerCase().includes(text.toLowerCase()) ))
}

  
  useEffect(() => {
 
  }, [])
  return (
    <View style={{flex:1,backgroundColor:'#1F1D2B'}}>
     <View style={{marginVertical:20, flexDirection:'row', justifyContent:'space-between'}}>
     <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:10, margin:10}}>
                <Icon name="close" size={36} color={'#fff'}/>
    </TouchableOpacity>
    <Text style={{color:"#fff", fontWeight:'bold', fontSize:24, padding:10, margin:10, textAlign:'center'}}>Search crypto</Text>
    <View style={{padding:10, margin:10}}></View>
     </View>
     <View>
         <TextInput onChangeText={(text)=>{setSearchTerm(text);filterItems(text); console.log("Text", text)}} style={{backgroundColor:'#252836', padding:10, margin:10, color:'#fff', fontSize:24, borderRadius:15}}/>
         <Text style={{color:'#fff', fontSize:16, marginHorizontal:10, padding:10}}>Search crypto with the name ... </Text>
     </View>
     {searchTerm == '' ?
      <View style={{ backgroundColor:'#252836', padding:5, marginBottom:10, borderRadius:15, minHeight:600}}>
          <Text style={{color:'#fff', margin:10}}>Nothing to load yet, try to type something
          </Text>
      </View> : 
      <FlatList
      contentContainerStyle={{
        backgroundColor:'#252836', padding:5, marginBottom:10, borderRadius:15
      }}
      data={allItems}
      //@ts-ignore
      keyExtractor={item => item?.symbol}
      renderItem={({ item }) => (
        //@ts-ignore
        <SearchScreenRow onPress={()=>{setSelectedCoin(item.id); toggleModal()}} percentage={item?.price_change_percentage_24h} key={item.symbol} name={item?.name} price={item.current_price}
      //@ts-ignore
       symbol={item.symbol} image={item.image} graphData={item?.sparkline_in_7d?.price} />
      )}
      />
      }
      <DetailScreen closeModal={()=>{setSelectedCoin('');setModalVisible(false)}} visible={isModalVisible} id={selectedCoin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#1A153A'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  lottie: {
    width: 100,
    height: 100
  },
});



