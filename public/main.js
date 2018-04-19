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

    //click handler for eat me button
    $(".eat").on("click", function (event) {
        event.preventDefault()
        console.log("eat me working")
        var id = $(this).attr("id")
        var devouredState = $(this).attr("data-devoured")
        console.log(id)
        devouredState = true
        console.log(devouredState)
        var newState = {
            devoured: devouredState
        }

        $.ajax("/api/burgers/" + id,
            {
                type: "PUT",
                data: newState
            }
        ).then(function () {
            location.reload()
        })

    })
    //from handler for newCustomer
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
    $("#userSubmit").on("click",function(event){
        event.preventDefault()
        console.log("already cust submit working")
        var customer ={
            name: $("#customer").val(),
            id: $("#customer").attr("customerId")
        }
        console.log(customer)
    })
})//closes $function thing

