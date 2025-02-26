import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Button from '../Shared/Button'
import { useRouter } from 'expo-router'

export default function NoCourse() {
  const router = useRouter();
  return (
    <View style  = {styles.container}>
      <Image source={require('./../../assets/images/book.png')} style = {styles.image}/>
      <Text style ={styles.text}>You Don't Have Any Course </Text>
      <Button text={"+ Create New Course"} onPress={() => router.push('/addCourse')}/>
      <Button text={"Explore Exiting Course"} type='outline'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    marginTop : 40,
    display :"flex",
    alignItems :"center"
  },
  image :{
    height :200,
    width :200
  },
  text : {
    fontFamily :'outfit-bold',
    fontSize :25,
    textAlign :"center"
  }
})