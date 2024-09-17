import React, { useCallback, useMemo } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen/SplashScreen";
import "./locales/i18next";
import DeviceInfo from 'react-native-device-info';

// import Onboarding from './src/screens/Onboarding/OnboardingScreen';

import TabNavigation from "./src/navigation/TabNavigation";
// import Auth from './src/navigation/AuthStack';

import { store } from "./src/redux/store";

import { Provider } from "react-redux";
import { lightPalette, darkPalette } from "./src/GlobalStyles";
const Stack = createStackNavigator();

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  configureFonts,
} from "react-native-paper";

import { fontConfig } from "./src/GlobalStyles";
import { ThemeContext } from "./src/themeContext";
import WelcomeScreenIndex from "./src/screens/WelcomeScreen/WelcomeScreenIndex";
import { LogBox, Platform, View } from "react-native";
import AuthStack from "./src/navigation/AuthStack";
// import BottomTabsStack from './src/navigation/BottomStack';
import HomeStack from "./src/navigation/HomeStack";
import FlashMessage from "react-native-flash-message";

export const App = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...PaperDarkTheme?.colors,
      ...NavigationDarkTheme.colors,
      ...darkPalette,
    },
    fonts: configureFonts({ config: fontConfig }),
  };

  const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...PaperDefaultTheme?.colors,
      ...NavigationDefaultTheme.colors,
      ...lightPalette,
    },
    fonts: configureFonts({ config: fontConfig }),
  };

  let theme: any = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  LogBox.ignoreLogs([
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
  ]);

  const CardForFade = ({ current }: { current: any }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  const hasNotch = DeviceInfo.hasNotch();

  return (
    <ThemeContext.Provider value={preferences}>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <View
            style={{
              flex: 1,
              paddingBottom: Platform.OS === "ios" ? (hasNotch ? 10 : 0) : 0,
            }}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{
                    cardStyleInterpolator: CardForFade,

                    headerShown: true,
                    headerTitleAlign: "left",
                    headerTitle: "",

                    headerStyle: { height: Platform.OS === "ios" ? 50 : 50 },
                    headerTransparent: true,
                  }}
                />
                <Stack.Screen
                  name="WelcomeScreen"
                  component={WelcomeScreenIndex}
                  options={{
                    cardStyleInterpolator: CardForFade,

                    headerShown: true,
                    headerTitleAlign: "left",
                    headerTitle: "",

                    headerStyle: { height: Platform.OS === "ios" ? 50 : 50 },
                    headerTransparent: true,
                  }}
                />
                <Stack.Screen
                  name="Auth"
                  component={AuthStack}
                  options={{ headerShown: false }}
                />

                {/* <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{headerShown: false}}
              /> */}
                <Stack.Screen
                  name="HomeStack"
                  component={HomeStack}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TabNavigation"
                  component={TabNavigation}
                  options={{
                    cardStyleInterpolator: CardForFade,

                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
          <FlashMessage position="bottom" />
        </PaperProvider>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
