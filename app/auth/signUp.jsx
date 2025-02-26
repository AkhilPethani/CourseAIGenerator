import React, { useContext}  from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image ,Pressable} from 'react-native'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { UserDetailContext } from '../../content/UserDetailContext';


export default function SignUp(){
  const router = useRouter();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {userDetail, setuserDetail} = useContext(UserDetailContext);

  const CreateNewAccount = () => {
    createUserWithEmailAndPassword(auth,email,password)
    .then(async(resp) => {
      const user = resp.user;
      console.log(user);
      await SaveUser(user);
    })
    .catch(e =>{
      console.log(e.message)
    })
  }

  const SaveUser = async(user) => {
    const data ={
      name :fullname,
      email :email,
      member : false,
      uid :user?.uid
    }
    await setDoc(doc(db,'users',email),data)

    setuserDetail(data)
  }

  return (
    <View style = {styles.imageBox}>
      <Image source = {require('./../../assets/images/logo.png')} style = {styles.image} />
      <Text style={styles.title}>Create New Account</Text>
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          onChangeText={(value) => setFullname(value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry ={true}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.button} onPress={CreateNewAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style ={styles.linkBox}>
          <Text styles ={{fontFamily :'outfit'}}>Already have an Account?</Text>
          <Pressable onPress={()=> router.push('/auth/signIn')}>
            <Text style ={{fontFamily :'outfit-bold',color :Colors.PRIMARY}}>Sign In Here</Text>
          </Pressable>
        </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    imageBox : {
      display : "flex",
      alignItems : "center",
      paddingTop : 100,
      flex :1,
      backgroundColor :Colors.WHITE,
      padding  :25
    },
    image : {
      width :150,
      height : 150,
    },
    title: {
      fontSize: 30,
      fontFamily :'outfit-bold'
    },
    input: {
      width: '100%',
      padding: 15,
      fontSize  :18,
      borderWidth: 1,
      borderRadius: 8,
      marginTop: 20,
    },
    button: {
      backgroundColor: Colors.PRIMARY,
      padding: 15,
      borderRadius: 10,
      width: '100%',
      marginTop :25
    },
    buttonText: {
      color: Colors.WHITE,
      fontSize: 20,
      textAlign :"center",
      fontFamily :'outfit'
    },
    linkBox  :{
      display : "flex",
      flexDirection : "row",
      marginTop :20,
      gap :5
    }
  })
 

  
