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
  success: function (data) {
    $("#table-row").html(
      $.map(data, function (el) {
        return `<tr>
                  <th scope="row">${el.id}</th>
                  <td>${el.title}</td>
                  <td>${el.description}</td>
                  <td>${el.price}</td>
                  <td><a href="/product-list.html" id=${el.id} class="btn btn-danger delete-button">Delete</a>
                  <td><a href="#" id=${el.id} class="btn btn-success edit-button">Edit</a>
              </tr>`;
      })
    );
  },
});

// post data to backend
$("form").on("submit", function (e) {
  e.preventDefault();
  const productData = {
    itemName: $("#item-name").val(),
    itemDescription: $("#item-description").val(),
    itemPrice: $("#item-price").val(),
  };
  $.ajax({
    url: "http://localhost:3000/add-product",
    type: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify(productData),
    success: function () {
      console.log("success");
    },
    error: function (err) {
      console.log(err);
    },
  });
  resetForm();
});

function resetForm() {
  $("input").val("");
}

// delete data
$("body").on("click", ".delete-button", function () {
  const id = $(this).attr("id");
  $.ajax({
    url: `http://localhost:3000/product-data/${id}`,
    type: "DELETE",
    success: function () {
      console.log("successfully deleted", id);
    },
    error: function (err) {
      console.log(err);
    },
  });
});

// update the data
$("body").on("click", ".edit-button", function () {
  const id = $(this).attr("id");
  console.log(id);
  $.ajax({
    url: `http://localhost:3000/product-data/edit/${id}`,
    type: "POST",
    success: function (data) {
      console.log(data[0]);
    },
    error: function (err) {
      console.log(err);
    },
  });
});

// search
$("#search-items").on("keydown", function (e) {
  let searchedValue = e.target.value.toLowerCase();
  $.ajax({
    url: "http://localhost:3000/product-data",
    type: "GET",
    success: function (data) {
      $.each(data, function (i, el) {
        if( el.title.toLowerCase().index(searchedValue)){
          console.log("true")
        }
      });
    },
  });
  console.log(searchedValue);
});
