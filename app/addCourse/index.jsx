import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constant/Colors'
import Button from '../../components/Shared/Button'
import { GenerateTopicsAIModel } from '../../config/AiModel';
import Prompt from '../../constant/Prompt';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState();
    const [topics, setTopics] = useState([]);
    const onGenerateTopic = async() => {
        setLoading(true);
        //Generate topic using AI
        const PROMPT = userInput + Prompt.IDEA;
        const aiResp = await GenerateTopicsAIModel.sendMessage(PROMPT);
        const topicIdea = JSON.parse( aiResp.response.text());
        console.log(topicIdea);
        setTopics(topicIdea?.course_titles);
        setLoading(false);

    }
  return (
    <View style ={styles.container}>
      <Text style = {styles.mainText}>Create New Course</Text>
      <Text style ={styles.text1}>What you want to learn today?</Text>
      <Text style ={styles.text2}>What course you want to create (ex.Learn Python,Digital Marketing,10th Science Chapter,etc...)</Text>
      <TextInput placeholder='(Ex. Learn Python,Learn React-Native,etc ..)'  style ={styles.textInput} numberOfLines={3} multiline={true} onChangeText={(value) => setUserInput(value)}/>
      <Button text = {'Generate Topic'} type = "outline" onPress ={onGenerateTopic} loading={loading}/>

      <View style = {styles.selectCourse}>
        <Text style ={styles.listCourse}>Select all topics which you want to add in the course</Text>

        <View>
  {topics.map((item, index) => {
    return (
      <Pressable key={index}>
        <Text>{item}</Text>
      </Pressable>
    );
  })}
</View>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex :1,
        backgroundColor : Colors.WHITE,
        padding  : 25
    },
    mainText :{
        fontFamily :'outfit-bold',
        fontSize : 30
    },
    text1 :{
        fontFamily :'outfit',
        fontSize : 25
    },
    text2 :{
        fontSize :20,
        fontFamily :'outfit',
        marginTop :8,
        color : Colors.GRAY
    },
    textInput :{
        padding : 15,
        borderWidth : 1,
        borderRadius : 15,
        height : 100,
        marginTop : 10,
        fontSize : 18,
        alignItems :"flex-start"
    },
    selectCourse :{
        marginTop : 15
    },
    listCourse : {
        fontFamily : 'outfit',
        fontSize : 20
    }
})
