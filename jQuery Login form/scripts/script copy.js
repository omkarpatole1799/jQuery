console.log("hello world")



$(document).ready(function () {
    $('input[placeholder]').placeholderLabel();


    $("#myForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            age: {
                required: true,
                minlength: 1,
                maxlength: 2,
                number: true

            }
        },
        messages: {
            name: {
                required: "We need your name to contact you",
                minlength: jQuery.validator.format("At least {0} characters required!")
            },
            email: {
                required: "We need your email to contact you",
                email: "Enter email in proper format"
            },
            age: {
                required: "Enter age",
                number: "Age should be in numbers"
            }
        }
    });

})
