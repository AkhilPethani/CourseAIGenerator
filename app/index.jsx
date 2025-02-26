import { useRouter } from "expo-router";
import  Colors  from "./../constant/Colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "../content/UserDetailContext";

export default function Index() {
  
  const router = useRouter();
  const {userDetail, setUserDetail} = useContext(UserDetailContext);

  onAuthStateChanged(auth,async(user) => {
    if(user){
      console.log(user);
      const result = await getDoc(doc(db,'users',user?.email));
      setUserDetail(result.data())
      router.replace('/(tabs)/home')
    }
  })

  return (
    <View
      style={{
        flex: 1, 
        backgroundColor : Colors.WHITE
      }}
    >
      <Image  source={require('./../assets/images/landing.png')}
      style={styles.landingImage}/>

      <View style = { styles.mainTextBox}>
        <Text style = {styles.mainText}>Welcome to Course Create By AI</Text>
        <Text style = {styles.descriptText}>Transform your ideas into engaging educational content,effortlessly with AI</Text>

        <TouchableOpacity style ={styles.button1}
        onPress={() => router.push('/auth/signUp')}>
        <Text style = {styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style ={styles.button2}
        onPress={() => router.push('/auth/signIn')}>
        <Text style = {styles.buttonText2}>Already have an Account?</Text>
        </TouchableOpacity>

      </View>
    </View>

    
  );
}

const styles = StyleSheet.create({
  landingImage : {
    width  :"100%",
    height : 300,
    marginTop : 70
  },
  mainTextBox : {
    padding :25,
    backgroundColor : Colors.PRIMARY,
    height : "100%",
    borderTopLeftRadius : 35,
    borderTopRightRadius :35,
  },
  mainText : {
    fontSize : 30,
    textAlign : "center",
    color : Colors.WHITE,
    fontFamily  :'outfit-bold'
  },
  descriptText : {
    fontSize : 20,
    marginTop : 20,
    color : Colors.WHITE,
    textAlign  :"center",
    fontFamily  :'outfit'
  },
  button1 : {
    padding : 15,
    backgroundColor : Colors.WHITE,
    marginTop : 20,
    borderRadius :10
  },
  buttonText : {
    fontSize : 18,
    textAlign : "center",
    fontFamily  :'outfit'
  },
  button2 : {
    padding : 15,
    backgroundColor : Colors.PRIMARY,
    marginTop : 20,
    borderRadius :10,
    borderWidth : 1,
    borderColor : Colors.WHITE
  },
  buttonText2 : {
    fontSize : 18,
    textAlign : "center",
    color : Colors.WHITE,
    fontFamily  :'outfit'
  }
})