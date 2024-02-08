import React, { useRef } from "react";
import { Button, View,Image, TouchableOpacity, StyleSheet, Animated,Text } from "react-native";
import { useAuth } from "../AuthContext";


export default function AssetExample() {
  const RotateAnimated = useRef(new Animated.Value(0)).current;
  const [user] = useAuth();
  

  const onPressToggle = () => {
    RotateAnimated.setValue(0);
    const rastgeleDeger = Math.floor(Math.random() * 36);


    Animated.timing(RotateAnimated, {
      toValue:  rastgeleDeger,
      duration: 1000,
      useNativeDriver:true,
    }).start();
  };

 
  const Rotate = RotateAnimated.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    outputRange: [
      "0deg",
      "360deg",
      "720deg",
      "940deg",
      "1040deg",
      "1140deg",
      "1240deg",
      "1340deg",
      "1440deg",
      "1540deg",
      "1640deg",
      "1740deg",
      "1840deg",
      
    ],
  });
 

  

  return (
    <View style={styles.container}>
     <View style={styles.arrowContainer} >
     <Animated.Image
        style={{ height: 130, width: 130,}}
        source={require("../assets/images/pngwing.com.png")}
      />
      </View>
      <Animated.Image
        style={{ height: 380, width: 380, transform: [{ rotate: Rotate }] }}
        source={require("../assets/images/rulet.png")}
      />
    

                            <TouchableOpacity
                              style={styles.button}
                              onPress={onPressToggle}
                            >
                              
                              <Text style={styles.buttonText}>SPIN</Text>
                            </TouchableOpacity>

                          
      

    <Text style={{marginTop:40, fontSize:29}}> Welcome, {user.displayName} </Text>
    <Text>____________________________</Text>
    <Text style={{marginTop:40, fontSize:29, textAlign:'center'}}>We wish you good luck</Text>
      
   
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    
  },

  arrowImage: {
    height: 200,
    width: 200,
  },

  button: {
    backgroundColor: '#5800eb',
    padding: 10,
    borderRadius: 20,
    marginTop:20,
    width:120,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign:"center"
  },

});
