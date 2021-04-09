import React from 'react'
import {Text,Label,Grid,Row,View, List,ListItem,Container} from 'native-base'
import { StyleSheet,ScrollView } from 'react-native'
//import font from './css/font'

export default function Annuaire(props) {

    const {data} = props
    const getInfo = (where) => {
       /* navigate(where, {
            person: item
        })*/
    }
    return (
        <ScrollView style={style.main}> 
            <List>
                { data.map((item,i) => {
                    return (
                        < View key={i} >
                            <ListItem key = {i} itemDivider>
                                <Text>{item.letter}</Text>
                            </ListItem>
                            {item.names.map((person,j) =>
                                <ListItem key={j} style={style.contact} onPress={getInfo} >    
                                    <Label>{person.name}</Label>
                                    <Label style={{marginRight:20,color:'black'}}> > </Label>
                                </ListItem>
                            )}
                        </ View>
                    )    
                })
            }
            
            </List>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    main : {
        width:'100%',
        height:'100%',
        marginTop:'0%',
        backgroundColor:'#e3e3e3',
        display:'flex',
        
    },
    contact : {
        backgroundColor:'white',
        width:'100%',
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:0.5,
        marginLeft:-2

    },
    font :{
        
    }
})