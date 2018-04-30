//dependencies...
//require models
var db = require("../models")

//html routes...
module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Customer.findAll({}).then(
            function (data) {
                console.log("cust data", data)
                var customerObj = {
                    customers: data
                }
                res.render("index", customerObj)
            }
        )
    })

    app.get("/menu", function (req, res) {
        //console.log(req.params)
        db.burger.findAll({}).then(function (data) {
            //console.log("burger data", data)
            //set var to use in handlebars
            var burgerObj = {
                burgers: data
            }

            // res.render("menu", burgerObj)
            db.Customer.findAll({
                include: [db.burger]
            }).then(function (data) {
                //console.log("cust data", data)
                var customerObj = {
                    customers: data
                }
                console.log("cust obj: ", customerObj)
                console.log("_________cust array_____________")
                console.log(customerObj.customers)
                for (var i = 0; i < customerObj.customers.length; i++) {
                    console.log("_______cust " + i + " info____________")
                    //console.log(customerObj.customers[i])
                    console.log("__________customer name________")
                    console.log(customerObj.customers[i].dataValues.name)
                    //console.log("burgers array for customer " + i)
                    //console.log(customerObj.customers[i].burgers)
                    for (var j = 0; j < customerObj.customers[i].burgers.length; j++) {
                        console.log("_______burger " + i + " info")
                        //console.log(customerObj.customers[i].burgers[j])
                        console.log("____________burger name____________")
                        console.log(customerObj.customers[i].burgers[j].dataValues.burger_name)
                    }
                }
                var renderObj = {
                    burgerObj,
                    customerObj
                }

                //console.log(renderObj)
                //console.log(renderObj.customerObj.customers)

                res.render("menu", renderObj)

            })
        })

    })
}


