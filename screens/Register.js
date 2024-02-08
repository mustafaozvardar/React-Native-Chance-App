import { useState } from "react";
import { SafeAreaView, StyleSheet,TouchableOpacity,View,Image } from "react-native";
import { TextInput, VStack,Text, HStack, Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Register = ()=>{

    
   

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const[isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [_, setUser] = useAuth();

    const handleRegister = () =>{
        setIsLoading(true);
        axios({
            method:"POST",
            url:"https://identitytoolkit.googleapis.com/v1/accounts:signUp",
            params:{
                key: 'AIzaSyBABd_9UQEJ8RFbb-HJl1lPMj6auTFaBeo',
            },
            data:{
                email,
                password
            },
        })
        .then((res) => {
            axios({
                method:"POST",
                url:"https://identitytoolkit.googleapis.com/v1/accounts:update",
                params:{
                    key: 'AIzaSyBABd_9UQEJ8RFbb-HJl1lPMj6auTFaBeo',
                },
                data:{
                    idToken: res.data.idToken,
                    displayName: name
                },
            })
            .then((r) => {
                setUser({...r.data, idToken: res.data.idToken});
                
            })
            .catch((e) => {
                console.log(e,"update profile error");
                alert(e.message);
            })
            .finally(() => {
                setIsLoading(false);
            });


            console.log(res.data);
            alert("Registration successful!");
            navigation.navigate("Login");
            
        })
        .catch((error)=>{
            const errorMessage = error.response?.data?.error?.message || "An error";
            
           
                if(errorMessage==="INVALID_EMAIL")
                {
                    setError("*Email field cannot be blank")
                }
                if(errorMessage==="MISSING_EMAIL")
                {
                    setError("*Email field cannot be blank")
                }
                if(errorMessage==="MISSING_PASSWORD")
                {
                    setError("*Please create a password")
                }
                else
                {
                    setError(errorMessage);
                }
        }).finally(() => {
            setIsLoading(false);
        });

    };
    

    const navigation = useNavigation();

    const handleLogin = () =>{
        navigation.navigate("Login");
    }

    return (
    <SafeAreaView>
        <SafeAreaView style={{backgroundColor:"gray",width:500,height:250}}>
            
                <Image
                    style={{ height: 300, width: 500}}
                    source={require("../assets/images/topapp.png")}
                    
                />
            
        </SafeAreaView>
        
        <VStack spacing={8} style={{padding:12, backgroundColor:"white"}}>
            <VStack spacing={5} >
                <Text style={styles.txt}>Register</Text>
                <Text variant="subtitle1">Create an account</Text>
                <Text style={{ color: 'red', marginTop:-5}}>{error}</Text>
            </VStack>
        
        {/* form start */}
            
        <VStack spacing={7} >
                <TextInput 
                label="Name" 
                variant="outlined"
                value={name}
                onChangeText={setName}
                
                />
                <TextInput label="Email" variant="outlined"
                   
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput label="Password" variant="outlined"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </VStack>

        {/* form end */}
            <HStack justify="between">
                <Button title="Login Instead" variant="text" 
                onPress={handleLogin}
                style={{marginTop:10}}
                compact />
               

                 <TouchableOpacity
                              style={styles.button}
                              onPress={handleRegister}
                             
                            >
                              
                              <Text style={styles.buttonText}>Register</Text>
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
    container: {
        alignItems: "center",
        justifyContent: "center",
      },
      
    txt: {
      alignItems: "center",
      justifyContent: "center",
      fontSize:45,
      color:"#5800eb"
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
        textAlign:"center",
      },

      txtlabel:{
        borderRadius:20
      }

});
  

export default Register;