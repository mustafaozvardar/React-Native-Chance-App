import { useState } from "react";
import { SafeAreaView,TouchableOpacity, StyleSheet,Image } from "react-native";
import { TextInput, VStack,Text, HStack, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Login = ()=>{

    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const navigation = useNavigation();

    const handleRegister = () =>{
        navigation.navigate("Register");
    };

    const [_, setUser] = useAuth();

    const handleLogin = () => {
        setIsLoading(true);
        axios({
            method:"POST",
            url:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
            params:{
                key: 'AIzaSyBABd_9UQEJ8RFbb-HJl1lPMj6auTFaBeo',
            },
            data:{
                email,
                password,
            },
        })
            .then((res)=>{
            setUser(res.data);
          
           
            
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error?.message || "An error";
               
                if(errorMessage==="INVALID_LOGIN_CREDENTIALS")
                {
                    setError("*Email or password is incorrect.");
                }
                if(errorMessage==="INVALID_EMAIL")
                {
                    setError("*Email and password field cannot be blank")
                }
              
               
                else
                {
                    setError(errorMessage);
                   
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        };

    return (
        
    <SafeAreaView >
        <SafeAreaView style={{width:500,height:250}}>
            
            <Image
                style={{ height: 300, width: 500}}
                source={require("../assets/images/topapp.png")}
                
            />
        
        </SafeAreaView>
         
        <VStack spacing={8} style={{padding:12, backgroundColor:"white",marginTop:40}}>
            <VStack spacing={5}>
                <Text style={styles.txt}>Login </Text>
                <Text variant="subtitle1">Login to your account</Text>
                <Text style={{ color: 'red', marginTop:-5}}>{error}</Text>
              
            </VStack>
            <VStack spacing={2}>
              
                <TextInput label="Email" 
                variant="outlined"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput label="Password" variant="outlined"
                    value={password}
                    secureTextEntry
                    
                    onChangeText={setPassword}
                />
            </VStack>
            <HStack justify="between">
            <Button title="Register Instead" 
                    onPress={handleRegister}
                   style={{marginTop:10}}
                    compact 
                    variant="text" 
            />

           
            <TouchableOpacity
                              style={styles.button}
                              onPress={handleLogin}
                            >
                              
                              <Text style={styles.buttonText}>Login</Text>
                 </TouchableOpacity>
              
            </HStack>
        </VStack>
        <SafeAreaView style={{width:500,height:250}}>
                <Image
                    style={{ height: 280, width: 500}}
                    source={require("../assets/images/topapp.png")}
                    
                />
        </SafeAreaView>
    </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    
    txt: {
        alignItems: "center",
        justifyContent: "center",
        fontSize:45,
        color:"#5800eb",
      },
    button: {
        backgroundColor: '#5800eb',
        padding: 10,
        borderRadius: 20,
        marginTop:10,
        width:120,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign:"center"
      },

      txtlabel:{
        borderRadius:20
      }

});
  

export default Login;