import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import normalize from "../../utils/normalize";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { Flex, Box } from "@react-native-material/core";
import { Searchbar } from "react-native-paper";
import ProfileCard from "../../components/profilecard/ProfileCard";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import EmployeeCardShimmer from "../../components/shimmers/EmployeeCardShimmer";
import { showMessage } from "react-native-flash-message";

const EmployeePre = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isLoaded, setLoaded] = useState(true);

  const { t } = useTranslation();

  const [useData, setData] = useState([]);
  const filteredData = useData.filter((item) =>
    item?.name?.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const [refresh, seRefresh] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      try {
        firestore()
          .collection(CollectionConstant.users)
          .get()
          .then((querySnapshot) => {
            const temp = [];

            querySnapshot.forEach((documentSnapshot) => {
              temp.push({
                ...documentSnapshot.data(),
                docId: documentSnapshot.id,
              });
            });
            // console.log(temp)
            setData(temp);
            setLoaded(false);
          });
      } catch (e) {
        setData([]);
        setLoaded(false);
      }
    }, [refresh])
  );

  const deleteUser = (data) => {
   
  };

  const onChangeSearch = (query: any) => setSearchQuery(query);
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Flex direction={"row"} ph={20} mt={20}>
        <Text
          style={[
            styles.totalHeading,
            {
              fontFamily: "Poppins-Regular",
              letterSpacing: 0.5,
              fontWeight: "400",
              opacity: 0.85,
            },
          ]}
        >
          {t("total-staff")}
        </Text>
        <Text
          style={[
            styles.totalHeading,
            {
              fontFamily: "Poppins-Bold",
              letterSpacing: 1,
              marginLeft: 4,
              fontWeight: "600",
            },
          ]}
        >
          {useData.length}
        </Text>
      </Flex>
      <Box mt={15} ph={20}>
        <Searchbar
          // placeholder={t("Search person, phone & email"}
          placeholder={`${t("search")}, ${t("person")}, ${t("phone")},${t(
            "email"
          )} `}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
          placeholderTextColor={colors.text}
          inputStyle={{
            backgroundColor: "white",
            borderRadius: 10,
          }}
        />
      </Box>

      <View>
        <Box ph={10}>
          {isLoaded ? (
            <EmployeeCardShimmer isLoaded={isLoaded}></EmployeeCardShimmer>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingBottom: 150 }}
              data={filteredData}
              renderItem={({ item }) => (
                <ProfileCard
                  deleteHandler={deleteUser}
                  profileData={item}
                  isExtraInfo={true}
                />
              )}
            />
          )}
        </Box>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalHeading: {
    fontSize: normalize(15),
    lineHeight: 24,
  },
});
export default EmployeePre;
