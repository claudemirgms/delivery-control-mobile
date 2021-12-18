import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import api from '../services/api';


export default function CreateUser({navigation}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    async function LoginLink(){
        navigation.navigate('Login')
    }
    async function handleSubmit(){
        if(password === confirmPassword){
            await api.post('/create-user', {
                email,
                password
            })
            .then(response =>{
                if(response.data){
                    api.post('/get-session', {
                        email,
                        password
                    })
                    .then(response => {
                        const { token, user }  = response.data; 
                        if(!user.unity_id){
                            navigation.navigate('SelectUnity', {
                                token: token,
                                unityId: user.unity_id
                            });
                        }
                        if(token){            
                            navigation.navigate('Home', {
                                token: token,
                                unityId: user.unity_id
                            });
                        }       
                    })
                    .catch(err => {
                        Alert.alert(err)
                    })
                } 
                
            })
            .catch(err =>{
                Alert.alert(err)
            })
        }
        else{
            Alert.alert('Senhas devem ser iguais')
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
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar senha"
                    placeholderTextColor="#a6a6a6"                    
                    secureTextEntry={true}
                    autoCapitalize="none"                    
                    autoCorrect={false}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LoginLink}>
                    <Text style={styles.link}>Login</Text>
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
        height: 300,
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