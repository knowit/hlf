const id = 0;

export default new Array(5).fill(1).map((item, index) =>  {
    return {
        name: "Navn Navnesen",
        img: "../img/profileimg.jpeg",
        date: "23 juni 2018",
        id: index,
        properties: {
            Lydforhold: {
                value: Math.random() >= 0.5,
                comment: ""
            },
            Teleslynge: {
                value: Math.random() >= 0.5,
                comment: "Helt ok"
            },
            Lydutjevning: {
                value: Math.random() >= 0.5,
                comment: ""
            },
            Informasjon: {
                value: Math.random() >= 0.5,
                comment: "Bare på latin"
            },
        }
    }
})
