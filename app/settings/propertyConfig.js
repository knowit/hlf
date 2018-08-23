import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

const properties = [
  {
    name: "Lydforhold",
    icon: <Entypo name="rss" style={{ transform: [{ rotate: "90deg" }] }} />,
    iconName: "insert-emoticon",
    description: "Kan du føre samtale i rommet?",
    longDescription:
      "Vurder om det er gode forhold for å ha en samtale. Hvordan er akustikken? Er det støy fra andre som snakker, ventilasjonsanlegg ol? Utdyp gjerne hvilke(t) rom i bygningen du har besøkt. \n\n Skriv gjerne utfyllende kommentar ved å trykke på knappen «kommenter»."
  },
  {
    name: "Lydutjevning",
    icon: <MaterialCommunityIcons name="volume-high" />,
    description: "Finnes det mikrofon og høytalere?",
    iconName: "volume-up",
    longDescription:
      "Et lydutjevningsanlegg skal ved hjelp av mikrofon og høyttalere gi god lyd til alle. Fungerer anlegget? Er lyden og det som sies lett å oppfatte? Er det mange nok mikrofoner til at samtaler i grupper fungerer? Hvor mange mikrofoner har anlegget? Utdyp gjerne hvilke(t) rom i bygningen du har besøkt.\n\n Skriv gjerne utfyllende kommentar ved å trykke på knappen «kommenter»."
  },
  {
    name: "Teleslynge",
    icon: <MaterialCommunityIcons name="ear-hearing" />,
    iconName: "hearing",
    description: "Er det teleslynge om virker?",
    longDescription:
    "Teleslynge er et trådløst lydoverføringsanlegg for høreapparatbrukere. Er det ulyder på slyngen? Er lyden sterk/svak? Er slyngen fastmontert eller må du ha en slynge rundt halsen? Hvordan er i så fall systemet for å få tak i denne halsslyngen? Utdyp gjerne hvilke(t) rom du har besøkt, og hvordan teleslyngen fungerer for hvert enkelt rom.\n\n Skriv gjerne utfyllende kommentar ved å trykke på knappen «kommenter»."
  },
  {
    name: "Informasjon",
    icon: <MaterialCommunityIcons name="information" />,
    description: "Er det informasjon på stedet om lydutstyr?",
    iconName: "info-outline",
    longDescription:
    "Utenfor eller i rom som har teleslynge er det plikt til å informere om dette. Kan du finne informasjon om at det er teleslynge? Finnes det informasjon om hvordan man kan få en halsslynge? Er det informasjon om at du må sitte bestemte steder i salen for å få god lyd? Utdyp gjerne hvilke(t) rom i bygningen du har besøkt. \n\n Skriv gjerne utfyllende kommentar ved å trykke på knappen «kommenter»."
  }
];

export default properties;
