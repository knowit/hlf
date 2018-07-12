
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';



const properties = [
    {
        name: "Lydforhold",
        icon: <Entypo name="emoji-happy" />,
        iconName: "insert-emoticon",
        description: "Kan du føre samtale i rommet?"
    },
    {
        name: "Teleslynge",
        icon: <MaterialCommunityIcons name="ear-hearing" />,
        iconName: "hearing",
        description: "Er det teleslynge om virker?"
    },
    {
        name: "Lydutjevning",
        icon: <MaterialCommunityIcons name="volume-high" />,
        description: "Finnes det mikrofon og høytalere?",
        iconName: "volume-up",
    },
    {
        name: "Informasjon",
        icon: <Ionicons name="ios-information-circle-outline" />,
        description: "Er det informasjon på stedet om lydutstyr?",
        iconName: "info-outline",
    }
];



export default properties;

