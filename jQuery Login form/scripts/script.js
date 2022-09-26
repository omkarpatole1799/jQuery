console.log("hello world")



$(document).ready(function () {
    $('input[placeholder]').placeholderLabel();

    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "Email should be in proper format"
    );

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

            age: {
                required: true,
                minlength: 1,
                maxlength: 2,
                number: true
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
                minlength: jQuery.validator.format("At least {0} characters required!")
            },
            email: {
                required: "Enter Email",
                email: "Enter email in proper format"
            },
            age: {
                required: "Enter age",
                number: "Age should be in numbers"
            },
            phone: {
                required: "Enter Phone",
                number: "Phone no should be in number",
                minlength: "Please enter 10 digits",
                maxlength: "Please enter 10 digits"
            }
        }
    });

})
