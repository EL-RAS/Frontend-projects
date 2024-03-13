// import elements from inputs
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

let mood = "create";
let all;

// create function get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#07a002";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// create function create product
let dataproduct = [];

if (localStorage.product != null) {
  dataproduct = JSON.parse(localStorage.product);
} else {
  dataproduct = [];
}

create.onclick = function () {
  let newproduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if(title.value != "" && price.value != "" && category.value != "" && count.value < 100){
    if (mood == "create") {
      if (newproduct.count > 0) {
        for (let i = 1; i < newproduct.count; i++) {
          dataproduct.push(newproduct);
        }
      } else {
        alert("please enter a positove number in a box (count) in the next time");
      }
      dataproduct.push(newproduct); // add to array
    } else {
      dataproduct[all] = newproduct;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
    cleardata();
  }
  else {
    alert("Please fill the fields are correct");
  }

  localStorage.setItem("product", JSON.stringify(dataproduct)); //save localStorage
  console.log(dataproduct);

  showdata();
};

//clear data
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//show data product in page
function showdata() {
  let table = "";
  for (let i = 0; i < dataproduct.length; i++) {
    table += `<tr>
      <td>${i+1}</td>
      <td>${dataproduct[i].title}</td>
      <td>${dataproduct[i].price}</td>
      <td>${dataproduct[i].taxes}</td>
      <td>${dataproduct[i].ads}</td>
      <td>${dataproduct[i].discount}</td>
      <td>${dataproduct[i].total}</td>
      <td>${dataproduct[i].category}</td>
      <td><button onclick="updatedata(${i})" id="update">update</button></td>
      <td><button onclick="deletproduct(${i})" id="delet">delet</button></td>
   </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let deletall = document.getElementById("deletall");
  if (dataproduct.length > 0) {
    deletall.innerHTML = `<button onclick="deletproducts()">Delet All (${dataproduct.length})</button>`;
  } else {
    deletall.innerHTML = "";
  }
  getTotal();
}
showdata();

// create function delete product
function deletproduct(i) {
  dataproduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataproduct);
  showdata();
}

// create function delete all products
function deletproducts() {
  localStorage.clear();
  dataproduct.splice(0);
  showdata();
}

// create function update product
function updatedata(i) {
  title.value = dataproduct[i].title;
  price.value = dataproduct[i].price;
  taxes.value = dataproduct[i].taxes;
  ads.value = dataproduct[i].ads;
  discount.value = dataproduct[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataproduct[i].category;
  create.innerHTML = "Update";
  mood = "update";
  all = i;
  scroll({ top: 0, behavior: "smooth" });
}

// search
let searchMood = "title";

function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "catagory";
    search.placeholder = "Search By Catagory";
  }
  search.focus();
  search.value = "";
  showdata();
}

function searchproduct(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataproduct.length; i++) {
      if (dataproduct[i].title.includes(value.toLowerCase())) {
        table += `<tr>
          <td>${i}</td>
          <td>${dataproduct[i].title}</td>
          <td>${dataproduct[i].price}</td>
          <td>${dataproduct[i].taxes}</td>
          <td>${dataproduct[i].ads}</td>
          <td>${dataproduct[i].discount}</td>
          <td>${dataproduct[i].total}</td>
          <td>${dataproduct[i].category}</td>
          <td><button onclick="updatedata(${i})" id="update">update</button></td>
          <td><button onclick="deletproduct(${i})" id="delet">delet</button></td>
          </tr>`;
        document.getElementById("tbody").innerHTML = table;
      }
    }
  } else {
    for (let i = 0; i < dataproduct.length; i++) {
      if (dataproduct[i].category.includes(value.toLowerCase())) {
        table += `<tr>
          <td>${i}</td>
          <td>${dataproduct[i].title}</td>
          <td>${dataproduct[i].price}</td>
          <td>${dataproduct[i].taxes}</td>
          <td>${dataproduct[i].ads}</td>
          <td>${dataproduct[i].discount}</td>
          <td>${dataproduct[i].total}</td>
          <td>${dataproduct[i].category}</td>
          <td><button onclick="updatedata(${i})" id="update">update</button></td>
          <td><button onclick="deletproduct(${i})" id="delet">delet</button></td>
          </tr>`;
        document.getElementById("tbody").innerHTML = table;
      }
    }
  }
}
