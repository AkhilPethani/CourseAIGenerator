import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { UserDetailContext } from '../../content/UserDetailContext'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Header() {
const {userDetail, setUserDetail} = useContext(UserDetailContext)
  return (
    <View style = {styles.container}>
        <View>
            <Text style = {styles.text1}>Hello , {userDetail?.name}</Text>
            <Text style = {styles.text2}>Let's Get Started</Text>
        </View>
        <TouchableOpacity>
            <Ionicons name="settings-outline" size={32} color="black" />    
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    text1 : {
        fontFamily :'outfit-bold',
        fontSize :25
    },
    text2 : {
        fontFamily :'outfit',
        fontSize : 17
    },
    container : {
        display : "flex",
        flexDirection :"row",
        justifyContent :"space-between",
        alignItems : "center"
    }
})