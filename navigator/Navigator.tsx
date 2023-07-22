import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '@navigator/BottomTabNavigator';
import CalenderPage from '@screens/CalenderPage';
import { RootStackParamList } from '@/types/NavigatorTypes';
import PostWrite from '@screens/PostWrite';
import PostRead from '@components/PostRead';

function Navigator() {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={'MainTab'} component={BottomTabNavigator} />
        <RootStack.Screen name={'PostWrite'} component={PostWrite} />
        <RootStack.Screen name={'PostRead'} component={PostRead} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
