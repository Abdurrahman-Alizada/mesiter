import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // Facebook icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Google icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Apple icon
import GradientIconButton from '../../../components/GradientIconButton';

const SocialLogin = () => {
    return (
        <View style={{ alignItems: 'center', marginVertical: "20%" }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                <Divider style={{ flex: 1, height: 1, backgroundColor: '#888' }} />
                <Text style={{ marginHorizontal: 10, color: '#888' }}>or Log in with</Text>
                <Divider style={{ flex: 1, height: 1, backgroundColor: '#888' }} />
            </View>

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <GradientIconButton style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#555',
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: 'transparent',

                }}>

                    <TouchableOpacity style={{}}>
                        <Icon name="facebook" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </GradientIconButton>

                <GradientIconButton style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#555',
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: 'transparent',

                }}>

                    <TouchableOpacity style={{}}>
                        <MaterialCommunityIcons name="google" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </GradientIconButton>

                <GradientIconButton style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#555',
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: 'transparent',

                }}>

                    <TouchableOpacity style={{}}>
                        <FontAwesome name="apple" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </GradientIconButton>

            </View>
        </View>
    );
};

const iconButtonStyle = {

};

export default SocialLogin;
