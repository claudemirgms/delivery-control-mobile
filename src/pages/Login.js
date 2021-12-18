import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function CreateUserLink(){
        navigation.navigate('CreateUser')
    }
    async function handleSubmit(){
        const response = await api.post('/get-session', {
            email,
            password
        })
        const { token, user }  = response.data; 
        
        if(token){            
            if(user.unity_id){
                navigation.navigate('Home', {
                    token: token,
                    unityId: user.unity_id
                });
            }
            else{
                navigation.navigate('SelectUnity', {
                    token: token,
                    unityId: user.unity_id
                });                
            }
        }       
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#a6a6a6" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#a6a6a6"                    
                    secureTextEntry={true}
                    autoCapitalize="none"                    
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={CreateUserLink}>
                    <Text style={styles.link}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#4070F4",
        alignItems: "center",
        justifyContent: "center",                
    },
    form: {
        width: 300,
        height: 230,
        padding: 25,
        backgroundColor: "#FFF",
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: "#4070F4",      
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    link:{
        color: "0000FF"
    }
});