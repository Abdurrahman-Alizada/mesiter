import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {Box, Divider, Flex, Wrap} from '@react-native-material/core';
import normalize from '../../utils/normalize';
import {Text} from '@react-native-material/core';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const CciConflictSke = props => {
  return (
    <Flex ph={10} mt={15} fill>
      <Box
        bg={'#BECDD9'}
        p={5}
        ph={10}
        style={{borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
        <Text variant={'subtitle2'} color={'#22609F'}>
          Validation Result
        </Text>
        <Divider color={'#22609F'} style={{width: 50, height: 2}} />
      </Box>
      <Box ph={2} ra>
        <Wrap direction={'row'} bg={'#22609F'} pv={2} mt={10} radius={5}>
          <View
            style={{
              flexBasis: '50%',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{fontSize: normalize(9), fontWeight: 'bold'}}
              variant={'subtitle2'}
              color={'white'}>
              Code
            </Text>
          </View>
      
          <View
            style={{
              flexBasis: '50%',
              justifyContent: 'center',
            }}>
            <Text
              style={{fontSize: normalize(9), fontWeight: 'bold'}}
              variant={'subtitle2'}
              color={'white'}>
              Suggestion
            </Text>
          </View>
        </Wrap>
        <ScrollView>
          <Box bg={'#E9F0F6'} ph={10} pv={10} marginTop={10}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item marginTop={20}>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width}
                    height={40}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginTop={5}>
                <SkeletonPlaceholder.Item
                  width={Dimensions.get('window').width / 3}
                  height={25}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width / 2}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginTop={20}>
                <SkeletonPlaceholder.Item
                  width={Dimensions.get('window').width / 3}
                  height={25}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width / 2}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </Box>
          
          <Box ph={10} pv={10}>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item flexDirection="row">
                <SkeletonPlaceholder.Item marginTop={20}>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width}
                    height={40}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginTop={5}>
                <SkeletonPlaceholder.Item
                  width={Dimensions.get('window').width / 3}
                  height={25}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width / 2}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginTop={20}>
                <SkeletonPlaceholder.Item
                  width={Dimensions.get('window').width / 3}
                  height={25}
                />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item
                    width={Dimensions.get('window').width / 2}
                    height={20}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </Box>
        </ScrollView>
      </Box>
    </Flex>
  );
};

export default CciConflictSke;
