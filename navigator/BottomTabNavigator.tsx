import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostListView from '@components/PostListView';
import CalenderPage from '@screens/CalenderPage';

function BottomTabNavigator(props: any) {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen name={'Home'} component={CalenderPage} />
      <BottomTab.Screen name={'Diary'} component={PostListView} />
      {/*<BottomTab.Screen name={"My"} component={} />*/}
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
