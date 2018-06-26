let ax = require("axios");
ax.get("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJrycdootuQUYR4EHKfJZX1J0&key=AIzaSyA6nH3k6uaWeKf9Y9E_S_tiRhusv1mVXNw")
.then(({data}) => {
    console.log(data.result.photos)
})