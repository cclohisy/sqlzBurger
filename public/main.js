console.log("linked js")

$(function () {
    //display modal on page load
    $("#customerModal").modal("show")

    //form handler for add new burger
    $("#addBurger").on("submit", function (event) {
        event.preventDefault()
        //console.log("on submit add burger working")

        var newBurger = {
            burger_name: $("#newBurger").val(),
            devoured: false
        }
        console.log(newBurger)//in browser

        $.ajax("/api/burgers",
            {
                type: "POST",
                data: newBurger
            }
        ).then(function () {
            location.reload()
        })

    })//closes add burger

    //click handler for eat me button - add corresponding burger id to customer tbl
    $(".eat").on("click", function (event) {
        event.preventDefault()
        console.log("eat me working")
        var customerId = localStorage.getItem("customer_id")
        console.log("customer id"+ customerId)
        //dont care about devoured state anymore
        var burgerId = $(this).attr("burger-id")
        console.log("burger id: " + burgerId)

        var burger = {
            burgId : burgerId
        }

        $.ajax("/api/customers/" + customerId,
            {
                type: "PUT",
                data: burger
            }
        ).then(function () {
            location.reload()
        })

    })
    //from handler for newCustomer- send info to DB and store in local storage
    $("#addCustomer").on("submit", function (event) {
        event.preventDefault()
        console.log("new cust on click working")
        var newCustomer = {
            name: $("#customerName").val()
        }
        console.log(newCustomer)
        if ($("#customerName").val() === "") {
            //does not work because button is linked to new route
            alert("OOPS! Name must be at least one character in length")
        }
        else {
            $.ajax("api/customers",
                {
                    type: "POST",
                    data: newCustomer
                }).then(function () {
                    $("#customerModal").modal("hide")

                })
        }
    })

    //select exisitng customer info and store in local storage
    $("#userSubmit").on("click", function (event) {
        event.preventDefault()
        localStorage.clear()
        console.log("already cust submit working")
        var customer = {
            name: $("#customer").val(),
            id: $("#customer").attr("customerId")
        }
        console.log(customer)

        localStorage.setItem("customer_name",customer.name)
        localStorage.setItem("customer_id", customer.id)

        $("#customerModal").modal("hide")
        
        //needs to route to /menu... in html but not working 

    })
})//closes $function thing

