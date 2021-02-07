import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
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
import Navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';



const wait = (timeout:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function TabTwoScreen() {
  //const [data, setData] = useState()
  const {topTen, isLoading, getData, refresh} = useGecko()
  const [refreshing, setRefreshing] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('')
    const toggleModal = () => {
        console.log(isModalVisible)
        setModalVisible(!isModalVisible);
    };

    const navigation = useNavigation()
  

  
  useEffect(() => {
    console.log("Top ten",topTen)
  }, [])
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#1F1D2B'}}>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10, alignItems:'center',marginHorizontal:10}}>
      <Text style={{color:'#fff', fontSize:24, paddingBottom:10,marginHorizontal:10, fontWeight:'bold', textAlign:'left'}}>All cryptocurrencies</Text>
      <Icon onPress={()=>navigation.navigate('Search')} name="magnify" size={30} color={'#fff'} style={{marginRight:10}}/>
      </View>
      <FlatList
          contentContainerStyle={{
            backgroundColor:'#252836', padding:5, marginBottom:10, borderRadius:15
          }}
          data={topTen}
          //@ts-ignore
          keyExtractor={item => item?.symbol}
          renderItem={({ item }) => (
            //@ts-ignore
            <CryptoRow onPress={()=>{setSelectedCoin(item.id); toggleModal()}} percentage={item?.price_change_percentage_24h} key={item.symbol} name={item?.name} price={item.current_price}
          //@ts-ignore
           symbol={item.symbol} image={item.image} graphData={item?.sparkline_in_7d?.price} />
          )}
          onEndReached={getData}
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          ListFooterComponent={()=><View style={{justifyContent:'center', alignItems:'center'}}
          >
         <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
         </View>}
          onRefresh={refresh}
          refreshing={isLoading}
        />
      
      <View></View>
      <DetailScreen closeModal={()=>{setSelectedCoin('');setModalVisible(false)}} visible={isModalVisible} id={selectedCoin} />
    </SafeAreaView>
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



{/* <ScrollView style={{backgroundColor:'#252836', padding:5, marginBottom:10, borderRadius:15, }}
      onContentSizeChange={()=>console.log("Hye")}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh}/>} >
        {isLoading == true ? <View style={{justifyContent:'center', alignItems:'center'}}
       >
      <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
      </View> : topTen && topTen.map(coin=>{
        return(
          //@ts-ignore
          <CryptoRow onPress={()=>{setSelectedCoin(coin.id); toggleModal()}} percentage={coin.price_change_percentage_24h} key={coin.symbol} name={coin?.name} price={coin.current_price}
          //@ts-ignore
           symbol={coin.symbol} image={coin.image} graphData={coin?.sparkline_in_7d?.price} />
        )
      })}
      {/* {topTen && topTen.map(coin=>{
        return(
          //@ts-ignore
          <CryptoRow onPress={()=>{setSelectedCoin(coin.id); toggleModal()}} percentage={coin.price_change_percentage_24h} key={coin.symbol} name={coin?.name} price={coin.current_price}
          //@ts-ignore
           symbol={coin.symbol} image={coin.image} graphData={coin?.sparkline_in_7d?.price} />
        )
      })} */}
      
      //   <Text onPress={()=>getData()} style={{margin:10, padding:10, fontSize:20, fontWeight:'bold', textAlign:'center', color:"#fff"}}>Load More...</Text>
      // </ScrollView> */}