import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import normalize from "../../utils/normalize";
import { useTheme } from "@react-navigation/native";
import { Flex, Box } from "@react-native-material/core";
import { Searchbar } from "react-native-paper";
import ProfileCard from "../../components/profilecard/ProfileCard";
import { useTranslation } from "react-i18next";
import EmployeeCardShimmer from "../../components/shimmers/EmployeeCardShimmer";
import { useGetAllUsersQuery } from "../../redux/reducers/user/userThunk";

const EmployeePre = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  // State for search query and filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Fetch users data from API
  const { data, isError, error, isLoading, isFetching, refetch } =
    useGetAllUsersQuery();

  // Update filtered data based on search query
  useEffect(() => {
    if (data?.users) {
      const search = searchQuery.toLowerCase();

      // Filter users by name, phone, or email
      const filtered = data.users.filter(
        user =>
          user.fullName?.toLowerCase().includes(search) ||
          user.phoneNumber?.toString().includes(search) ||
          user.email?.toLowerCase().includes(search),
      );

      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  // Handle search input changes
  const onChangeSearch = query => {
    setSearchQuery(query);
  };

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
          ]}>
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
          ]}>
          {filteredData?.length}
        </Text>
      </Flex>

      <Box mt={15} mb={15} ph={20}>
        <Searchbar
          placeholder={`${t("search")}, ${t("person")}, ${t("phone")},${t(
            "email",
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
          {isLoading ? (
            <EmployeeCardShimmer isLoaded={isLoading}></EmployeeCardShimmer>
          ) : (
            <FlatList
              contentContainerStyle={{ paddingBottom: 150 }}
              data={filteredData}
              renderItem={({ item }) => (
                <ProfileCard profileData={item} isExtraInfo={true} />
              )}
              keyExtractor={item => item._id.toString()}
              refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
              }
              ListEmptyComponent={() => (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 50,
                  }}>
                  <Text style={{ fontSize: 16, color: "gray" }}>
                    {t("no-results-found")}
                  </Text>
                </View>
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
