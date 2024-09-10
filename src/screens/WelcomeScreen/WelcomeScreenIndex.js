import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
//@ts-ignore
import banner from "../../assets/welcomeBanner.png";
import normalize from "../../utils/normalize";
import { sanFranciscoWeights } from "react-native-typography";
import { Box } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
const WelcomePre = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image source={banner} resizeMode={"contain"} style={styles.banner} />
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: normalize(5),
          }}
        >
          <Text style={styles.typo}>Welcome to</Text>

          <Text style={styles.typo2}>MW & Hausmeister</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.typo2}>Reinigungsservice</Text>
            <Text style={{ fontSize: 18 }}>👋</Text>
          </View>
        </View>

        <View>
          <Box mt={20} ph={20}>
            <TouchableOpacity
              onPress={() => navigation.navigate({name:"Auth", screen:"Login"})}
              activeOpacity={1}
              style={[styles.button, { backgroundColor: "#0B335C" }]}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "500",
                  lineHeight: 24,
                  letterSpacing: 0.15,
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </Box>
          <Box mt={10} ph={20}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.button,
                { borderWidth: 1, borderColor: "#0B335C" },
              ]}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Medium",
                  color: "#0B335C",
                  fontSize: 16,
                  fontWeight: "500",
                  lineHeight: 24,
                  letterSpacing: 0.15,
                }}
              >
                Request for login
              </Text>
            </TouchableOpacity>
          </Box>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  banner: {
    height: 300,
    transform: [{ scale: 1.2 }],
  },
  bannerContainer: {
    padding: 10,
    flex: 0.8,
    backgroundColor: "#F4F4F4",
  },
  buttonContainer: {
    justifyContent: "center",
    marginTop: 20,
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: "white",
  },
  button: {
    height: 45,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  typo: {
    color: "#40302A",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: normalize(24),
    fontWeight: "400",
    lineHeight: 32,
  },
  typo2: {
    color: "#012547",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: normalize(24),
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: 0.48,
  },
});

export default WelcomePre;
