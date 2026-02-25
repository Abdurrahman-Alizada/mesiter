import React from "react";
import { StyleSheet, View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { Box } from "@react-native-material/core";
import normalize from "../../utils/normalize";

const ph = 10;

const ShimmerTaskDetails = () => {
  return (
    <View style={[styles.card, { backgroundColor: "#FFFEFA", flex: 1 }]}>
      {/* Title */}
      <Box mt={10} ph={ph}>
        <ShimmerPlaceholder style={styles.shimmerTitle} />
        <Box mt={10}>
          <ShimmerPlaceholder style={styles.shimmerDivider} />
        </Box>
      </Box>

      {/* Priority */}
      <Box mt={20} ph={0}>
        <View style={styles.row}>
          <ShimmerPlaceholder style={styles.shimmerIcon} />
          <View>
            <ShimmerPlaceholder style={styles.shimmerTextSmall} />
            <ShimmerPlaceholder style={styles.shimmerText} />
          </View>
        </View>
        <Box mt={20}>
          <ShimmerPlaceholder style={styles.shimmerDivider} />
        </Box>
      </Box>

      {/* Description */}
      <Box mt={10} ph={ph}>
        <ShimmerPlaceholder style={styles.shimmerTextSmall} />
        <ShimmerPlaceholder style={styles.shimmerTextLong} />
        <Box mt={20}>
          <ShimmerPlaceholder style={styles.shimmerDivider} />
        </Box>
      </Box>

      {/* Location */}
      <Box mt={10} ph={0}>
        <View style={styles.row}>
          <ShimmerPlaceholder style={styles.shimmerIcon} />
          <View>
            <ShimmerPlaceholder style={styles.shimmerTextSmall} />
            <ShimmerPlaceholder style={styles.shimmerText} />
          </View>
        </View>
        <Box mt={20}>
          <ShimmerPlaceholder style={styles.shimmerDivider} />
        </Box>
      </Box>

      {/* Assigned to */}
      <Box mt={10} ph={0}>
        <ShimmerPlaceholder style={styles.shimmerTextSmall} />
        <View style={styles.rowWrap}>
          <ShimmerPlaceholder style={styles.shimmerAvatar} />
          <ShimmerPlaceholder style={styles.shimmerAvatar} />
        </View>
        <Box mt={20}>
          <ShimmerPlaceholder style={styles.shimmerDivider} />
        </Box>
      </Box>

      {/* Attachments */}
      <Box mt={10} ph={0}>
        <ShimmerPlaceholder style={styles.shimmerTextSmall} />
        <View style={styles.rowWrap}>
          <ShimmerPlaceholder style={styles.shimmerAttachment} />
          <ShimmerPlaceholder style={styles.shimmerAttachment} />
        </View>
        <Box mt={20}>
          <ShimmerPlaceholder style={styles.shimmerDivider} />
        </Box>
      </Box>

      {/* Start and End Dates */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    marginTop: normalize(10),
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 20,
    padding: 15,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: normalize(10),
    padding: 2,
  },
  rowWrap: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  shimmerIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  shimmerTitle: {
    height: 24,
    width: "80%",
    marginLeft: 5,
  },
  shimmerTextSmall: {
    height: 16,
    width: "60%",
    marginLeft: 10,
  },
  shimmerText: {
    height: 16,
    width: "80%",
    marginLeft: 10,
    marginTop: 4,
  },
  shimmerTextLong: {
    height: 16,
    width: "95%",
    marginLeft: 5,
    marginTop: 7,
  },
  shimmerDivider: {
    height: 1.2,
    width: "100%",
    backgroundColor: "rgba(3, 1, 0, 0.08)",
  },
  shimmerAvatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  shimmerAttachment: {
    height: 100,
    width: 100,
    borderRadius: 8,
    marginRight: 15,
  },
});

export default ShimmerTaskDetails;
