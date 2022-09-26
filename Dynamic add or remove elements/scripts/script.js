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
    // $("#myForm").validate({
    //     rules: {
    //         name: {
    //             required: true,
    //             minlength: 2
    //         },
    //         email: {
    //             required: {
    //                 depends: function () {
    //                     $(this).val($.trim($(this).val()));
    //                     return true;
    //                 }
    //             },
    //             customemail: true
    //         },
    //         phone: {
    //             required: true,
    //             number: true,
    //             minlength: 10,
    //             maxlength: 10
    //         }
    //     },
    //     messages: {
    //         name: {
    //             required: "Enter Name",
    //             minlength: jQuery.validator.format("At least {0} digit required")
    //         },
    //         email: {
    //             required: "Enter Email",
    //             email: "Email in format"
    //         },            
    //         phone: {
    //             required: "Enter Phone",
    //             number: "Phone no should be in number",
    //             minlength: "Enter 10 digits",
    //             maxlength: "Enter 10 digits"
    //         }
    //     }
    // });


    // clone div


    // add 
    $("#addButton").click((e) => {
        e.preventDefault();
        $("#myForm").prepend(`<div id="show-item">
        <div class="row">
            <div class="col-md-3 mb-3">
                <input type="text" name="email" class="form-control" placeholder="Email" required>
            </div>

            <div class="col-md-3 mb-3">
                <input type="text" name="name" class="form-control" placeholder="Name" required>
            </div>

            <div class="col-md-3 mb-3">
                <input type="text" name="phoneno" class="form-control" placeholder="Phone" required>
            </div>

            <div class="col-md-3 mb-3 d-grid">
                <button class="btn btn-danger deleteButton">Delete</button>
            </div>
        </div>
    </div>`);

    })

    // delete
    $(document).on('click', '.deleteButton', function (e) {
        e.preventDefault();
        var deleteBtn = $(this).parent().parent();
        $(deleteBtn).remove();
    })

    $("#resetButton").click(function (e) {
        e.preventDefault();
        $("#myForm").reset();
    })

    // capture values
    // capturing the values
    $("#submitButton").click(function () {
        const email = $("#email").val();
        const name = $("#name").val();
        const phone = $("#phone").val();

        jsonObject = {
            "Email":"",
            "Name":"",
            "Phone": ""
        }
        jsonObject.Email=email;
        jsonObject.Name=name;
        jsonObject.Phone=phone;

        const str = JSON.stringify(jsonObject);
        $("#showJson").html(str);
    })

})
