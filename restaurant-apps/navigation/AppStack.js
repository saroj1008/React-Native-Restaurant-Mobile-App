import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Ionicons, Foundation } from 'react-native-vector-icons';

// Import components related to daily notes
import AddNote from '../components/screens/daily_notes/AddNote';
import NoteList from '../components/screens/daily_notes/NoteList';

// Import components screens/related to restaurant foods
import EditFood from '../components/screens/restaurant_foods/EditFood';
import ListOfFoods from '../components/screens/restaurant_foods/ListOfFoods';
import ViewFoodDetails from '../components/screens/restaurant_foods/ViewFoodDetails';
import AddNewFood from '../components/screens/restaurant_foods/AddNewFood';

// Import components related to personal/ owner profile
import EditOwner from '../components/screens/personal_profile/EditOwner';
import OwnerDetails from '../components/screens/personal_profile/OwnerDetails';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// Stack for managing restaurant food list
const StackFoodList = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen name='listOfFood' component={ListOfFoods} options={{ title: "Home", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            <Stack.Screen name='editFood' component={EditFood} options={{ title: "Edit Food", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            <Stack.Screen name='foodDetails' component={ViewFoodDetails} options={{ title: "Food Details", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            <Stack.Screen name='addFood' component={AddNewFood} options={{ title: "Add Food", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
        </Stack.Navigator>
    )
}

// Stack for managing daily notes
const StackNotes = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen name='listOfNotes' component={NoteList} options={{ title: "Notes", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            <Stack.Screen name='addNote' component={AddNote} options={{ title: "Add Note", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
        </Stack.Navigator>
    )
}

// Stack for mananging owner profile
const StackOwnerProfile = () => {


    return (
        <Stack.Navigator>
            <Stack.Screen name='ownerDetails' component={OwnerDetails} options={{ title: "Profile", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            <Stack.Screen name='editOwner' component={EditOwner} options={{ title: "Edit Owner", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} />
            {/* <Stack.Screen name='logout' component={LogOut} options={{ title: "Logout", headerTitleStyle: { color: "#1D71F2" }, headerStyle: { backgroundColor: "#FFCD00" } }} /> */}
        </Stack.Navigator>
    )
}

// Root Component
export default function AppStack() {


    return (

        <Tab.Navigator tabBarOptions={{
            activeBackgroundColor: '#E3F4FE',
            inactiveBackgroundColor: '#FFCD00',
        }} >
            <Tab.Screen
                name='listOfFood'
                component={StackFoodList}
                options={{
                    title: "Food Menu",
                    headerTitleStyle: { color: "#1D71F2" },
                    headerShown: false,
                    headerStyle: { backgroundColor: "#FFCD00" },
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-sharp" color={"#1D71F2"} size={26} />
                    )
                }}
            />


            <Tab.Screen
                name='notes'
                component={StackNotes}
                options={{
                    title: "Notes",
                    headerTitleStyle: { color: "#1D71F2" },
                    headerShown: false,
                    headerStyle: { backgroundColor: "#FFCD00" },
                    tabBarIcon: ({ color }) => (
                        <Foundation name="clipboard-notes" color={"#1D71F2"} size={26} />
                    )
                }}
            />


            <Tab.Screen
                name='profile'
                component={StackOwnerProfile}
                options={{
                    title: "Profile",
                    headerTitleStyle: { color: "#1D71F2" },
                    headerShown: false,
                    headerStyle: { backgroundColor: "#FFCD00" },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-circle" color={"#1D71F2"} size={26} />
                    )
                }}
            />
        </Tab.Navigator>

    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
