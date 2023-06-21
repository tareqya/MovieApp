import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavScreen, HomeScreen } from "../screens/home";
import { Stack, TextView } from "../components";
import { COLORS, Icons } from "../../assets/styles";

const Tab = createBottomTabNavigator();

const HomeBottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarLabel: "",
        tabBarActiveTintColor: COLORS.tomato,
        tabBarStyle: {
          height: 100,
        },
      }}
    >
      <Tab.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={() => {
          return {
            tabBarIcon: ({ color, size }) => (
              <Stack direction="Vertical" style={{ alignItems: "center" }}>
                <Icons.HomeIcon color={color} size={size} />
                <TextView variant="labelLarge" style={{ color: color }}>
                  Home
                </TextView>
              </Stack>
            ),
          };
        }}
      />
      <Tab.Screen
        component={FavScreen}
        name="FavScreen"
        options={() => {
          return {
            tabBarIcon: ({ color, size }) => (
              <Stack
                gap={5}
                direction="Vertical"
                style={{ alignItems: "center" }}
              >
                <Icons.FavIcon color={color} size={size} />
                <TextView variant="labelLarge" style={{ color: color }}>
                  Favorite
                </TextView>
              </Stack>
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeBottomNavigation;
