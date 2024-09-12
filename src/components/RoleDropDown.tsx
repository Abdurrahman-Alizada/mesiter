import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {View, Text, Image,TouchableOpacity,StyleSheet} from 'react-native'
// @ts-ignore
// import { AntDesign } from '@expo/vector-icons';

interface PropsTypes {
    picker?: any;
    placeholder?: string;
    setPicker?: any;
    round?: number;
    height?: number;
    isDisabled?: boolean;
    borderColor?: string;
    useCustomIcon?: boolean;
    showDrop?:boolean;
    style?:undefined;
}

import HighPriority from '../assets/icons/HighPriority.png'
import lowPriority from '../assets/icons/lowPriority.png'
import MediumPriority from '../assets/icons/MediumPriority.png'
import bluecircle from '../assets/icons/bluecircle.png'
import {UserRoles} from "../config/constants";
import normalize from '../utils/normalize';

const RoleDropDown: React.FunctionComponent<PropsTypes> = ({
                                                                   picker,
                                                                   placeholder = '',
                                                                   setPicker,
                                                                   round = 10,
                                                                   height = 50,
                                                                   isDisabled = false,
                                                                   borderColor = 'black',
                                                               showDrop=true,
                                                               style
                                                               }): React.ReactElement => {
    const [open, setOpen] = useState(false);
    const [items,setItems] = useState([])

    const Item = (props) => {
        const handleValue=({item})=>{

            setPicker(item.value)
            setOpen(false)

        }

        return (
            <TouchableOpacity onPress={() => handleValue(props)}
                              style={{
                                  flexDirection: 'row',
                                  justifyContent:'space-between',
                                  marginTop:10,
                              }}

            >
                <View style={{ height:40,flexDirection: 'row', alignItems: 'center' ,paddingHorizontal:normalize(10),padding:2,}}>
                    <Text style={styles.listLable}>{props.item.label}</Text>
                </View>
                {props.isSelected === true && (
                    <props.TickIconComponent />
                )}
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        const data= UserRoles.map((item)=>(
            {label: item.title, value: item.id,icon: () =>  <View  style={{borderRadius:12,height:12,width:12,backgroundColor:item.id ==1 ?'green' :'grey'}}/>}
        ))
        console.log(data)
        setItems(data)
    }, []);


    return (
        <DropDownPicker
            listMode={"MODAL"}
            items={items}
            open={open}
            hideSelectedItemIcon={false}
            closeAfterSelecting={true}
            disabled={isDisabled}
            value={picker}
            setOpen={setOpen}
            setValue={setPicker}
            setItems={setItems}
            placeholder={'Select Role'}
            placeholderStyle={{color:'grey'}}
            zIndex={9999}
            showArrowIcon={showDrop}
            renderListItem={(props) => <Item {...props} />}
            TickIconComponent={({style}) =>
                <Image source={bluecircle} resizeMode={'contain'} style={{marginRight:10,height:24,width:24}}/>}
            // ArrowDownIconComponent={({style}) =>  <Image source={bluecircle} resizeMode={'contain'} style={{marginRight:10,height:24,width:24}}/>}
            style={[{
                // width: Platform.OS === 'ios' ? hp('20%') : hp('25%'),
                minHeight: height,
                borderColor: borderColor,
                borderRadius: round,
                //@ts-ignore
                ...style,

            }]}
            dropDownContainerStyle={{borderColor: 'grey',paddingBottom:10,}}
            ArrowUpIconComponent={({style}) => <AntDesign name="caretup" size={15} color="grey" />}
        />
    );
};

const styles=StyleSheet.create({
    listLable:{
        color:'#012547',
        fontFamily: 'Poppins-Regular',
        fontSize: normalize(12),
        marginLeft:10,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 0.5,

    }
})


export default RoleDropDown;


