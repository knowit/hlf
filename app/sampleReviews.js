const id = 0;

export default new Array(5).fill(1).map((item, index) =>  {
    return {
        name: "Navn Navnesen",
        img: "../img/profileimg.jpeg",
        date: "23 juni 2018",
        id: index,
        properties: {
            soundCondition: {
                value: Math.random() >= 0.5,
                comment: ""
            },
            remote: {
                value: Math.random() >= 0.5,
                comment: "Helt ok"
            },
            smoothing: {
                value: Math.random() >= 0.5,
                comment: ""
            },
            information: {
                value: Math.random() >= 0.5,
                comment: "Bare på latin"
            },
        }
    }
})
