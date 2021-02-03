import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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


const wait = (timeout:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function TabTwoScreen() {
  const [data, setData] = useState()
  const {topTen, isLoading} = useGecko()
  const [refreshing, setRefreshing] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<string>('')
    const toggleModal = () => {
        console.log(isModalVisible)
        setModalVisible(!isModalVisible);
    };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  
  useEffect(() => {
    console.log("Top ten",topTen)
  }, [])
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#1A153A'}}>
      <Text style={{color:'#fff', fontSize:18, padding:10, fontWeight:'bold', textAlign:'center'}}>Top 15 crypto (market cap)</Text>
      {/* <View style={{justifyContent:'center', alignItems:'center'}}>
      <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
      </View>  */}
      <ScrollView style={{backgroundColor:'#2B2C5F', padding:5, marginBottom:10, borderRadius:15, }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
        {isLoading == true ? <View style={{justifyContent:'center', alignItems:'center'}}>
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
      </ScrollView>
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
