import React, { useRef } from 'react'
import { View, Image, Text, Pressable, TouchableOpacity } from 'react-native'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const BalanceRow = ({image, name, symbol, value, numberOfCoins, longPress, deleteCoin, edit}) => {

    const menu = useRef(Menu)
    const showMenu = () => {
        return menu.current.show();
    }
    const closeMenu = () => {
        return menu.current.hide()
    }
    return (
       <>   
            <Pressable onLongPress={longPress}>
            <Menu
                style={{padding:5,margin:10, borderRadius: 20, backgroundColor:'#1F1D2B'}}
                ref={menu}
                button={
                <Pressable onPress={showMenu} style={{marginHorizontal:2,marginVertical:5, padding:5, flexDirection:'row', alignItems:'center'}}>
                            
                            <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:5}}  source={{
                    uri: image,
                    }} />
                    <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{justifyContent:'flex-start', marginHorizontal:10}}>
                    <Text style={{color:'#fff', fontWeight:'bold', textTransform:'uppercase', fontSize:16}}>{name}</Text>
                    <Text style={{color:'#fff', textTransform:'uppercase'}}>{symbol}</Text>
                    </View>
                    <View style={{justifyContent:'flex-end', marginHorizontal:5}}>
                    <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>{value} €</Text>
                    <Text style={{color:'#fff', textAlign:'right'}}>{numberOfCoins}</Text>
                    </View>
                    </View>
                </Pressable>
                }
             >
                 <Text style={{color:'#fff',fontSize:18, textAlign:'center', textTransform:'uppercase', fontWeight:'bold'}}>{symbol}</Text>
                 <MenuItem>
                 <Pressable onPress={()=>{deleteCoin();closeMenu()}} style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                 <Icon name="trash-can-outline" size={18} color={'#fff'} style={{marginRight:10}}/>
                     <Text style={{color:"#fff",fontSize:18, fontWeight:'bold'}} >
                        Delete</Text>
                 </Pressable>
                 </MenuItem>
            </Menu>
             
            </Pressable>
       </>
    )
}

