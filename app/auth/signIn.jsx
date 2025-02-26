import React, { useContext, useState }  from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image ,Pressable, ToastAndroid, ActivityIndicator} from 'react-native'
import Colors from '../../constant/Colors'
import { useRouter } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../content/UserDetailContext';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const onSignInClick=() => {
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password)
    .then(async(resp) =>{
      const user = resp.user
      console.log(user)
      await getUserDetail();
      setLoading(false);
      router.replace('/(tabs)/home')
    })
    .catch(e =>{
      console.log(e)
      setLoading(false);
      ToastAndroid.show('Incorrect Email & Password',ToastAndroid.BOTTOM)
    })
  }
  const getUserDetail =async() =>{
    const result = await getDoc(doc(db,'users',email));
    console.log(result.data())
    setUserDetail(result.data());
  }
  return (
    <View style = {styles.imageBox}>
          <Image source = {require('./../../assets/images/logo.png')} style = {styles.image} />
          <Text style={styles.title}>Welcome Back</Text>
      
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
            <TouchableOpacity style={styles.button} onPress={onSignInClick} disabled = {loading}>
              {!loading ?<Text style={styles.buttonText}>Sign In</Text> : <ActivityIndicator size={'large'} color={Colors.WHITE}/>}
            </TouchableOpacity>
            <View style ={styles.linkBox}>
              <Text styles ={{fontFamily :'outfit'}}>Don't have an account?</Text>
              <Pressable onPress={()=> router.push('/auth/signUp')}>
                <Text style ={{fontFamily :'outfit-bold',color :Colors.PRIMARY}}>Create New Here</Text>
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