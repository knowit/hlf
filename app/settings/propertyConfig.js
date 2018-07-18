import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

const properties = [
  {
    name: "Lydforhold",
    icon: <Entypo name="rss" style={{ transform: [{ rotate: "90deg" }] }} />,
    iconName: "insert-emoticon",
    description: "Kan du føre samtale i rommet?"
  },
  {
    name: "Lydutjevning",
    icon: <MaterialCommunityIcons name="volume-high" />,
    description: "Finnes det mikrofon og høytalere?",
    iconName: "volume-up"
  },
  {
    name: "Teleslynge",
    icon: <MaterialCommunityIcons name="ear-hearing" />,
    iconName: "hearing",
    description: "Er det teleslynge om virker?"
  },
  {
    name: "Informasjon",
    icon: <MaterialCommunityIcons name="information" />,
    description: "Er det informasjon på stedet om lydutstyr?",
    iconName: "info-outline"
  }
];

export default properties;
