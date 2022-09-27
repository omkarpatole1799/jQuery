console.log("hello world")

$(document).ready(function () {

    $('input[placeholder]').placeholderLabel();

    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "Email in proper format"
    );

    // form validation

    $("#myForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: {
                    depends: function () {
                        $(this).val($.trim($(this).val()));
                        return true;
                    }
                },
                customemail: true
            },
            phone: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            }
        },
        messages: {
            name: {
                required: "Enter Name",
                minlength: jQuery.validator.format("At least {0} char required")
            },
            email: {
                required: "Enter Email",
                email: "Email in format"
            },
            phone: {
                required: "Enter Phone",
                number: "Phone no should be in number",
                minlength: "Enter 10 digits",
                maxlength: "Enter 10 digits"
            }
        }
    });




    // clone div

    $("#addButton").click((e) => {
        // e.preventDefault();
        $("#myForm").prepend(`
        <form id="myForm" action="#">

            <div class="row">
                <div class="col-md-3 mb-4">
                    <input id="email" type="text" name="email" class="form-control emailInput" placeholder="Email"
                        required>
                </div>

                <div class="col-md-3 mb-4">
                    <input id="name" type="text" name="name" class="form-control nameInput" placeholder="Name"
                        required>
                </div>

                <div class="col-md-3 mb-4">
                    <input id="phone" type="text" name="phone" class="form-control phoneInput" placeholder="Phone"
                        required>
                </div>
                <button class="btn btn-danger deleteButton col-md-2 mb-5">Delete</button>
            </div>

        </form>`);

        $('input[placeholder]').placeholderLabel();

    })

    // delete button
    $(document).on('click', '.deleteButton', function (e) {
        // e.preventDefault();
        var deleteBtn = $(this).parent().parent();
        $(deleteBtn).remove();
    })

    $("#resetButton").click(function (e) {
        e.preventDefault();
        $("#myForm").reset();
    })


    // capturing the values

    $("#submitButton").click(function () {

        const dataArray = [];
        $(".emailInput").each(function (index) {

            // console.log($( this ).val())
            // console.log($(".emailInput").eq(index).val())
            // console.log($(".nameInput").eq(index).val())
            // console.log($(".phoneInput").eq(index).val())

            const email = $(".emailInput").eq(index).val()
            const name = $(".nameInput").eq(index).val()
            const phone = $(".phoneInput").eq(index).val()

            jsonObject = {
                "Email": email,
                "Name": name,
                "Phone": phone
            };

            dataArray.push(jsonObject);

        })

        const str = JSON.stringify(dataArray);
        $("#showJson").html(str);

    })

})
