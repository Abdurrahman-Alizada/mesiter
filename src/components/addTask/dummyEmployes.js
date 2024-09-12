import {Image} from 'react-native'
import empoloyes from '../../assets/icons/employe.png'
export default  EmployeeData=[
    {
        id:1,
        label: 'Select Employes',
        value: 'Select Employes',
        role:'Admin',
        employeImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU',
        icon: () =>  <Image source={empoloyes} resizeMode={'contain'} style={{transform:[{scale:1.4}],height:20,width:20}}/>
},
{
    id:2,
    label: 'Alex Smith',
    value: 'Alex Smith',
    role:'Admin',
    employeImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU',
},

{
    id:3,
    label: 'Mark Anothny',
    value: 'Mark Anothny',
    role:'Employee',
    employeImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTgPoXqEzIuP_VBOn4eRmyXVzygwT46eRB0g&usqp=CAU',
},

{
    id:4,
    label: 'Tom Cruise',
    value: 'Tom Cruise',
    role:'Admin',
    employeImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQS48qcUZ2liC2_1RF_Dz41hAu4Z-CO6zcHA&usqp=CAU',
},
]
