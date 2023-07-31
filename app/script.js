// table headings
const tableHeadings = [
    { title: "ID" },
    { title: "Title" },
    { title: "Description" },
    { title: "Price" },
    { title: "Operations" },
];

let headingHtml = $.map(tableHeadings, function (el) {
    return `<th scope="col">${el.title}</th>`;
});
$("#table-heading").html(headingHtml);

// get data from backend
$.ajax({
    url: "http://localhost:3000/product-data",
    type: "GET",
    success: function (data) {
        $("#table-row").html(
            $.map(data[1].data, function (el) {
                return `<tr>
                  <th scope="row">${el.id}</th>
                  <td>${el.title}</td>
                  <td>${el.description}</td>
                  <td>${el.price}</td>
                  <td><a href="/" id=${el.id} class="btn btn-danger delete-button">Delete</a>
                  <td><button id=${el.id} class="btn btn-success edit-button">Edit</button></td>
              </tr>`;
            })
        );
    },
});

$("#add-product-btn").on("click", function (e) {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("itemName", $("#item-name").val());
    formDataObj.append("itemDescription", $("#item-description").val());
    formDataObj.append("itemPrice", $("#item-price").val());
    formDataObj.append("itemPhoto", $("#item-photo")[0].files[0]);

    // post form data
    $.ajax({
        url: "http://localhost:3000/product-data/add",
        type: "POST",
        data: formDataObj,
        processData: false,
        contentType: false,
        success: function () {
            console.log("success");
        },
        error: function (err) {
            console.log(err);
        },
    });
});

// delete data
$("body").on("click", ".delete-button", function () {
    const id = $(this).attr("id");
    $.ajax({
        url: `http://localhost:3000/product-data/delete/${id}`,
        type: "DELETE",
        success: function () {
            console.log("successfully deleted", id);
        },
        error: function (err) {
            console.log(err);
        },
    });
});

// get data by id
$("body").on("click", ".edit-button", function () {
    const id = $(this).attr("id");
    $("#add-product-fm").html(getUpdateForm(id));

    $.ajax({
        url: `http://localhost:3000/product-data/${id}`,
        type: "GET",
        success: function (responseData) {
            let data = responseData[1].data;
            $("#item-name1").val(data.title);
            $("#item-description1").val(data.description);
            $("#item-price1").val(data.price);

            $("body").on("click", "#update-product-btn", function (e) {
                e.preventDefault();
                const formDataObj = new FormData();

                formDataObj.append("itemName", $("#item-name1").val());
                formDataObj.append("itemDescription",$("#item-description1").val());
                formDataObj.append("itemPrice", $("#item-price1").val());
                formDataObj.append("itemPhoto", $("#item-photo1")[0].files[0]);
                formDataObj.append("itemId", data.id);
                let id = data.id;
                postUpdateData(formDataObj, id);
            });
        },
        error: function (err) {
            console.log(err);
        },
    });
});

function postUpdateData(formDataObj, id) {
    $.ajax({
        url: `http://localhost:3000/product-data/update/${id}`,
        type: "POST",
        data: formDataObj,
        processData: false,
        contentType: false,
        success: function () {
            console.log("success");
        },
        error: function (err) {
            console.log(err);
        },
    });
    // resetForm();
}

function getUpdateForm(id) {
    return `<form method="POST" action="/product-data/update/"+${id}>
                <div class="mb-3">
                    <label for="item-name" class="form-label">Item Name</label>
                    <input
                        name="itemName"
                        type="text"
                        class="form-control"
                        id="item-name1"
                    />
                </div>

                <div class="mb-3">
                    <label for="item-description" class="form-label"
                        >Item description</label
                    >
                    <input
                        name="itemDescription"
                        type="text"
                        class="form-control"
                        id="item-description1"
                    />
                </div>

                <div class="mb-3">
                    <label for="item-price" class="form-label"
                        >Item price</label
                    >
                    <input
                        name="itemPrice"
                        type="text"
                        class="form-control"
                        id="item-price1"
                    />
                </div>

                <div class="mb-3">
                    <label for="item-photo" class="form-label">Photo</label>
                    <input 
                        name="itemPhoto"
                        type="file"
                        class="form-control"
                        id="item-photo1"
                    />
                </div>

                <a  
                    href="/"
                    id="update-product-btn"
                    type="submit"
                    class="btn btn-primary"
                >
                    Update product
                </a>
            </form>`;
}

// upload file only
$("#upload-file").on("click", function (e) {
    e.preventDefault();
    let file = $("#fileInput")[0].files[0];
    console.log(file);
    let formDataOjb = new FormData();
    formDataOjb.append("inputFile", file);

    $.ajax({
        url: "http://localhost:3000/upload/file",
        type: "POST",
        data: formDataOjb,
        processData: false,
        contentType: false,
        success: function () {
            console.log("success file upload");
        },
        error: function () {
            console.log("error file upload");
        },
    });
});
