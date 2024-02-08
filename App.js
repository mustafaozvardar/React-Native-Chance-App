import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import GameDetailsScreen from './screens/GameDetailsScreen';
import Profile from "./screens/Profile";
import AuthProvider, { useAuth } from "./AuthContext";

const Stack = createNativeStackNavigator();

const Navigator = () =>{

  const [user] = useAuth();
 

  if(!user){
    return(
      
      <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>

    );
  }
  

  return (
    <Stack.Navigator>
       
          <Stack.Screen name="Profile" options={{headerShown: false}} component={Profile} />
          <Stack.Screen name="GameDetails" options={{headerShown: false}} component={GameDetailsScreen} />
          
    </Stack.Navigator>
  )
}

const App = () =>{
  return (
      <NavigationContainer>
        <AuthProvider>
          <Navigator/>
        </AuthProvider>
      </NavigationContainer>
  );
};

export default App;