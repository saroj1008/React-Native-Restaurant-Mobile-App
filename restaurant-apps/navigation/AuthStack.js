import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

//Import UserSignIn, UserSignUp components

import UserSignIn from '../components/screens/login_logout/UserSignIn';
import UserSignUp from '../components/screens/login_logout/UserSignUp';

const Stack = createStackNavigator();

// Stack for managing signIn, signUp of Owner
const AuthStack = () => {


    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name='signIn' component={UserSignIn} options={{ title: "Sign In", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            <Stack.Screen name='signUp' component={UserSignUp} options={{ title: "Sign Up", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
        </Stack.Navigator>
    )
}

export default AuthStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
