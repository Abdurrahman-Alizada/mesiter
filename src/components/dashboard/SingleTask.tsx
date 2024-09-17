import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { Box, Flex } from "@react-native-material/core";
// @ts-ignore
import HighPriority from '../../assets/icons/HighPriority.png';
// @ts-ignore
import LowPriority from '../../assets/icons/lowPriority.png';
// @ts-ignore
import MediumPriority from '../../assets/icons/MediumPriority.png';

import { ProgressBar } from "react-native-paper";
import normalize from "../../utils/normalize";
import moment from "moment";

// Define the icon mapping based on priority
const priorityIcons = {
  high: HighPriority,
  medium: MediumPriority,
  low: LowPriority,
};

const SingleTask = ({ data }) => {
  // Map the database data to the component props
  const {
    taskHeading,
    location,
    startDate,
    startTime,
    endDate,
    endTime,
    priority,
    employePics = [] // Ensure employePics is an array, default to empty
  } = data;

  // Get the appropriate icon based on priority
  const iconSource = priorityIcons[priority.toLowerCase()] || MediumPriority;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.img}>
          {/* Display the priority icon */}
          <Image source={iconSource} style={{ height: 75, width: 75 }} />
        </View>
        <View style={styles.details}>
          <Box mt={5}>
            <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">{taskHeading}</Text>
          </Box>
          <Box mt={2}>
            <Text style={styles.taskLocation}>{location}</Text>
          </Box>

          <Flex direction={'row'} mt={2}>
            <Text style={[styles.typo, { color: '#1F0900' }]}>START DATE</Text>
            <Text style={[styles.typo, { color: '#087B47', marginLeft: 10 }]}>{moment(startDate).format("DD-MM-YYYY")}</Text>
            <Text style={[styles.typo, { color: '#087B47', marginLeft: 5 }]}> {moment(startTime).format("hh:mm A")}</Text>
          </Flex>
          <Flex direction={'row'} mt={2}>
            <Text style={[styles.typo, { color: '#1F0900' }]}>DUE DATE</Text>
            <Text style={[styles.typo, { color: '#CC3017', marginLeft: 10 }]}>{moment(endDate).format("DD-MM-YYYY")}</Text>
            <Text style={[styles.typo, { color: '#CC3017', marginLeft: 5 }]}>{moment(endTime).format("hh:mm A")}</Text>
          </Flex>
          <View style={styles.employesContainer}>
            {employePics.map((item, index) => (
              index < 4 ? (
                <Image key={index} source={{ uri: item }} style={[styles.employesPic, { zIndex: index * 2 }]} />
              ) : (
                <ImageBackground key={index} imageStyle={{ borderRadius: 50, height: 24, width: 24 }} source={{ uri: item }} style={[styles.employesPicLast, { zIndex: index * 2 }]}>
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.56)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.totalTitle}>100+</Text>
                  </View>
                </ImageBackground>
              )
            ))}
          </View>
        </View>
      </View>
      <View style={{ marginTop: 10, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flexBasis: '85%' }}>
          <ProgressBar style={{ backgroundColor: '#ECECEC', height: 8, borderRadius: 16 }} progress={0.8} color={'#005E98'} />
        </View>
        <View style={{ flexBasis: '15%', alignItems: 'flex-end' }}>
          <Text style={[styles.percpercentAgent]}>80%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(64, 48, 42, 0.15)',
  },
  content: {
    flexDirection: 'row',
  },
  img: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    justifyContent: 'center',
    padding: 2,
    borderColor: '#F6F6F6',
    borderRadius: 4,
    height: 90,
  },
  details: {
    flexBasis: '80%',
    paddingHorizontal: 15,
  },
  taskTitle: {
    color: '#1F0900',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  taskLocation: {
    color: '#40302A',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(10),
    fontWeight: '500',
    lineHeight: 16,
    marginVertical:2,
    letterSpacing: 0.5,
  },
  typo: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(9),
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  employesContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  employesPic: {
    height: 24,
    width: 24,
    marginLeft: -5,
    borderRadius: 50,
  },
  employesPicLast: {
    height: 25,
    width: 24,
    marginLeft: -5,
    borderRadius: 50,
    overflow: 'hidden',
  },
  totalTitle: {
    color: '#FFFEFA',
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  percpercentAgent: {
    color: '#1F0900',
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(10),
    fontWeight: '500',
    lineHeight: 16,
    letterSpacing: 0.5,
  },
});

export default SingleTask;
