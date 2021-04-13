import React from 'react'
import {Text,Label,Left,Right,View, List,ListItem,Container,Icon} from 'native-base'
import { StyleSheet,ScrollView,Vibration,Animated } from 'react-native'
import { Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from 'styled-system'




export default function Annuaire(props) {

    const {data,nav} = props
    const [selected,setSelected] = React.useState("")

    /*
        Obtenir la première lettre d'un mot
    */
    const firstLetter = word => word.slice(0,1)

    /*
        Callback pour trier par ordre alphanumérique
    */
    const sortAlphaNum = (a, b) => {
        // expression régulière pour sélectionner les lettres
        let reA = /[^a-zA-Z]/g,
         // expression régulière pour sélectionner les chiffres
            reN = /[^0-9]/g,
            // remplace tout les caractères
            aA = a.name.replace(reA, ""),
            bA = b.name.replace(reA, ""),
            result;
        
        if (aA === bA) {
            // on remplace tout les chiffres
            var aN = parseInt(a.name.replace(reN, ""), 10);
            var bN = parseInt(b.name.replace(reN, ""), 10);
            
            result =  aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
          result = aA > bA ? 1 : -1;
        }
        return result
    }

    /*
        Trie les objets contenu dans data et renvoie un tableau sous la forme :
        {
            letter: "A"
            names : [
                {name:"Amandine"},
                {name: "Antoine"}
                (...)
            ]
        }
    */
    const sortByLetter = () => {
        const newData = [];
        // On stocke dans un tableau toutes les premières lettre des prénoms
        const allLetter = new Set([])
        data.map(person => {
            let letter = firstLetter(person.name)
            if(!allLetter.has(letter)){
                allLetter.add(letter)
            }
            
        })
        // on parcourt chaque lettre
        allLetter.forEach((letter) => {
             newData.push({
                 letter,
                 // on parcourt chaque nom et on filtre ceux avec la bonne première lettre puis on trie les nom qui ont la meme première lettre
                 names : data.filter(obj => firstLetter(obj.name ) == letter).sort(sortAlphaNum)
             })
                
        })
        // tri final pour trier les lettres dans le bon ordre
        newData.sort()
        console.log("trie ")
        return newData
    } 
     // gère les autorisations 
     const isAuthorized = (auth, index) => {
        if(auth){
            setSelected(index)
        }
     }
    const memoizedCallback = React.useCallback(
        () => {
            sortByLetter();
        },
        [data]
    )

    return (
        <ScrollView style={style.main}> 
            <List>
            { sortByLetter().map((item,i) => 
                <View key={i} >
                    <ListItem style={{backgroundColor:'#e0e0e0'}} key={i} itemDivider>
                        <Text>{item.letter}</Text>
                    </ListItem>
                    {item.names.map((person,j) => {
                        // on créer un id personnalisé pour retrouver l'élément
                        const index = i+"_"+j
                        // si l'état est égale à l'index actuel, alors cet élément est celui selectionné
                        const styleIsSelectable = selected === index ? style.selected : undefined
                        return (
                            <ListItem  key={j} style={style.contact} onPress={() => isAuthorized(person.authorized,index)} > 
                                <Left>  
                                    <Text style={styleIsSelectable}>{person.name}</Text>
                                </Left> 
                                <Right>
                                    <Text>{person.authorized ?
                                            // Si authorized alors on affiche un style 
                                            <Icon name="arrow-forward" style={styleIsSelectable}/> : 
                                            <Icon name="arrow-forward"/> 
                                        } 
                                    </Text>
                                </Right>
                            </ListItem>
                        )
                    }
                )}
                </ View>
            )}  
            </List>
        </ScrollView>
    )
}
const style = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"

      },
    text: {
        alignSelf: "center",
        marginBottom: 7
    },
    mb: {
        marginBottom: 15
    },
    selected: {
        color:'#2865c7',
        fontWeight:"bold"
    },
    wrong:{
        color:'red'
    },
    normal:{
        color:'black'
    }
})

      