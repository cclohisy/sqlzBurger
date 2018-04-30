//require models
var db = require("../models")

module.exports = function (app) {

    // post -- create: add new burger to db, refresh page and display
    app.post("/api/burgers", function (req, res) {
        console.log(req.body)
        db.burger.create(req.body).then(
            function (postData) {
                res.json(postData)
            }
        )
    });

    //put -- update
    app.put("/api/burgers/:id", function (req, res) {
        console.log(req.body)
        console.log(req.params)
        db.burger.update(
            {
                devoured: req.body.devoured
            },
            {
                where: { id: req.params.id }
            }).then(function (updatedData) {

                if (updatedData == 0) {
                    //id not found... return  error
                    return res.status(404).end();
                } else {
                    //updte was successful! return success code
                    res.status(200).end();
                }
            })
    })

    //add new customer 
    app.post("/api/customers", function (req, res) {
        console.log(req.body)
        db.Customer.create(req.body).then(
            function (newCustomerData) {
                res.json(newCustomerData)
            }
        )
    })

    //get customer data
    app.get("/api/customers", function (req, res) {
        console.log(req.body)
        db.Customer.findAll({}).then(function (data) {
            console.log(data)
        })
    })

    //update customer data to inlude burger id of what burger they ate
    //no longer using this w/belongs to many 
    app.put("/api/customers/:id", function (req, res) {
        console.log("req params (customer id) " + req.params.id)
        console.log("req burger id", req.body.burgId)
        db.Customer.update(
            {
                burgerId: req.body.burgId
            },
            {
                where: {
                    id: req.params.id
                }

            })
    })



    //route to update associations
    app.put("/api/eat/:id", function (req, res) {
        db.Customer.addburgers([req.params.id, req.body.burgId])
    })

}

// UserProject = sequelize.define('user_project', {
//     role: Sequelize.STRING
//   });


//        Burger.belongsToMany(models.Customer, { through: "customerBurg"})


//   Project.create({ id: 11 }).then(function (project) {
//     user.addProjects([project, 12]);
//   });


//delete -- delete ... not required add later