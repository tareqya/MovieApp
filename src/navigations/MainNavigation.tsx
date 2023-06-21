import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MovieDetails, ProfileScreen } from "../screens/home";
import HomeBottomNavigation from "./HomeNavigation";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen
        component={HomeBottomNavigation}
        name="HomeBottomNavigation"
      />
      <Stack.Screen component={MovieDetails} name="MovieDetails" />
    </Stack.Navigator>
  );
};

export default MainNavigation;
