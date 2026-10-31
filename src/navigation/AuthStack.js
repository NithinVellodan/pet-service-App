import {createStackNavigator} from '@react-navigation/stack';
import SuccessfulPage from '../screens/successScreen/SuccessfulPage';

export default AuthStackNavigation = () => {
    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}>
            <AuthStack.Screen
                name="SuccessfulPage"
                component={SuccessfulPage}
            />
        </AuthStack.Navigator>
    );
};
