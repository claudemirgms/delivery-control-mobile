import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Home({ navigation }){
    const [packages, setPackages] = useState([]);
    
    useEffect(() => {        
        async function loadPackages() {
            const token = navigation.getParam('token', 'nothing sent')
            const unityId = navigation.getParam('unityId', 'nothing sent')
                        
            await api.get(`/get-unity-packages/${unityId}`, { 
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            })
            .then(response => {
                setPackages(response.data)
            })            
            .catch(err => {
                Alert.alert(err)
            })
        }

        loadPackages();

    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.homeContent}>
                <View style={styles.sidebar}>
                    <View style={styles.logoContent}>                
                        <Image style={styles.logo} source={logo} />
                        <Text style={styles.logoName}>Plano&Raposo</Text>            
                    </View>            
                </View>
                <View>
                    <Text style={styles.title}>Lista de Encomendas</Text>
                    <View style={styles.headerList}>
                        <Text style={styles.textHeaderList}>Compania</Text>
                        <Text style={styles.textHeaderList}>Pacote</Text>                            
                        <Text style={styles.textHeaderList}>Data</Text>                            
                        <Text style={styles.textHeaderList}>Status</Text>
                    </View>
                    <FlatList                        
                        data={packages}
                        keyExtractor={pkg => pkg._id}
                        vertical
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            // <FlatList                        
                            //     data={item}                                
                            //     horizontal
                            //     showsHorizontalScrollIndicator={false}
                            //     renderItem={({ item }) => (
                                    <View style={styles.listItem}>
                                        <Text style={styles.textItem}>{item.company}</Text>
                                        <Text style={styles.textItem}>{item.package}</Text>                            
                                        <Text style={styles.textItem}>{item.dateArrival}</Text>                            
                                        <Text style={styles.textItem}>{item.status}</Text>
                                    </View>
                                // )} 
                                // >
            
                                // </FlatList>
                        )} 
                    >

                    </FlatList>
                </View>
            </View>
        </View>
        // <ScrollView style={{ backgroundColor: 'blue' }}>
        //     <View
        //         style={{
        //         width: '95%',
        //         paddingLeft: '5%',
        //         marginTop: 80,
        //         height: 800,
        //         }}>
        //         <View style={{ backgroundColor: 'white' }}>

        //         {/* <Thumbnail square large source={{uri: uri}} style={{ marginTop: -30 }}/> */}
        //         <Text>Some Text</Text>
        //         </View>
        //     </View>
        // </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: '100%'
    },
    sidebar:{
        backgroundColor: '#4070F4',
        width: 0,
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    logoContent:{
        flexDirection: 'row',
        color: '#FFF',
        height: 50,
        padding: 10
    },
    logo:{
        width: 0,
        height: 0,   
    },
    logoName:{
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',             
        marginLeft: 5,
        marginTop: 2
    },
    title:{
        fontSize: 25,
        fontWeight: '500',
        color: '#4070F4',
        margin: 12
        
    },
    homeContent:{
        color:'#4070F4',
    },
    headerList:{
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#4070F4',
        
    },
    textHeaderList:{
        width: 100,
        fontWeight: '600',
        fontSize: 14,
        color: '#fff'
    },
    listItem:{
        flexDirection: 'row',
        padding: 5        
    },
    textItem:{
        width: 100,
        fontWeight: '500',
        
    },
});