import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Colors from '../../constant/Colors'
import NoCourse from '../../components/Home/NoCourse'

export default function Home() {
  return (
    <View style = {styles.Home}>
      <Header/>
      <NoCourse/>
    </View>
  )
}

const styles = StyleSheet.create({
    Home : {
        padding : 25,
        paddingTop : Platform.OS =='ios' && 45,
        flex : 1,
        backgroundColor : Colors.WHITE
    }
})