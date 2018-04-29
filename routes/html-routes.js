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
        db.burger.findAll({
            
        }).then(function (data) {
            console.log("joined data", data)
            //set var to use in handlebars
            // var burgerObj = {
            //     burgers: data
            // }

            // // res.render("menu", burgerObj)
            // db.Customer.findAll({
            //     include: [db.burger]
            // }).then(function (data) {
            //     console.log("cust data", data)
            //     var customerObj = {
            //         customers: data
            //     }
            //     var renderObj= {
            //        burgerObj,
            //        customerObj
            //     }
            //     console.log(renderObj)
            //     console.log(renderObj.customerObj.customers)

                res.render("menu", renderObj)
            })
        })
    //})

}