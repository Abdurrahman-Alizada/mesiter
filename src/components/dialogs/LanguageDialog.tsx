import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Modal,
  Image,
} from "react-native";
import * as M2DColor from "react-native-paper/src/styles/themes/v2/colors";
import tick from "../../assets/icons/tick.png";
import { Box, Text } from "@react-native-material/core";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import normalize from "../../utils/normalize";
import { Languages } from "../../services/languageList";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Types {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
}

const LanguageDialog: React.FC<Types> = ({ visible = false, setVisible }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en"); // Initialize state for language
  const { t } = useTranslation();

  const changeLanguage = async (value: string) => {
    console.log("first",value)
    i18next.changeLanguage(value);
    setVisible(false);
    await AsyncStorage.setItem("AppLanguage", value);
  };

  useEffect(() => {
    (async () => {
      const appLanguage = await AsyncStorage.getItem("AppLanguage");
      setSelectedLanguage(appLanguage || "en"); // Default to English if no value is stored
    })();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => setVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={() => setVisible(false)}
      >
        <View style={[styles.modalContent, Platform.OS === "ios" && styles.iosExtras]}>
          <Box ph={8}>
            <Text style={styles.title}>{t("select-your-language")}</Text>
          </Box>
          <Box mt={25} p={10}>
            <LanguageButton
              isSelected={selectedLanguage === "en"}
              onPress={() => setSelectedLanguage("en")}
              label="English"
            />
            <Box mt={10}>
              <LanguageButton
                isSelected={selectedLanguage === "de"}
                onPress={() => setSelectedLanguage("de")}
                label="German"
              />
            </Box>
          </Box>
          <Box mt={10} p={10}>
            <TouchableOpacity
              onPress={() => changeLanguage(selectedLanguage)}
              style={[styles.button, styles.saveButton]}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            <Box mt={10}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={[styles.button, styles.cancelButton]}
              >
                <Text style={styles.typo}>Cancel</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const LanguageButton = ({ isSelected, onPress, label }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.button,
      { backgroundColor: isSelected ? "rgba(1, 37, 71, 0.10)" : "transparent" },
    ]}
  >
    {isSelected && (
      <Image source={tick} resizeMode="contain" style={styles.tickIcon} />
    )}
    <Text style={styles.typo}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#FFFEFA",
    paddingVertical: normalize(30),
    paddingHorizontal: normalize(10),
    borderRadius: 8,
  },
  iosExtras: {
    marginTop: "10%",
  },
  title: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    fontSize: normalize(15),
    color: "#1F0900",
  },
  button: {
    flexDirection: "row",
    height: 50,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0B335C",
  },
  tickIcon: {
    height: 24,
    width: 24,
    transform: [{ scale: 1.5 }],
  },
  typo: {
    color: "#012547",
    fontFamily: "Poppins-Medium",
    fontSize: normalize(13),
    marginLeft: 5,
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#012547",
  },
  saveText: {
    color: "white",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
});

export default LanguageDialog;
