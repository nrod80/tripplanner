var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/tripplanner', {
  logging: false
});

var Place = db.define('place', {
  address: {
    type: Sequelize.STRING,
    notNull: true
  },
  city: {
    type: Sequelize.STRING,
    notNull: true
  },
  phone: {
    type: Sequelize.STRING,
    notNull: true
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    notNull: true
  }
})

var Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  num_stars: {
    type: Sequelize.INTEGER,
    min: 1,
    max: 5
  },
  amenities: {
    type: Sequelize.STRING
  }
})

var Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  age_range: {
    type: Sequelize.STRING
  }
})

var Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING,
    notNull: true
  },
  cousine: {
    //might be array (like tags)
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    min: 1,
    max: 5
  }
})

Hotel.belongsTo(Place)
Activity.belongsTo(Place)
Restaurant.belongsTo(Place)


module.exports = {
  db: db,
  Place: Place,
  Restaurant: Restaurant,
  Hotel: Hotel,
  Activity: Activity
}

