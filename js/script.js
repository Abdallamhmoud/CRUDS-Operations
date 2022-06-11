var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productQuality = document.getElementById("productQuality");
var addBtn = document.getElementById("addBtn");
var searchBtn = document.getElementById('srchBtn');
var mood ='ADD';
var temp;

var productList;

if(localStorage.getItem("productList") != null){
    productList = JSON.parse(localStorage.getItem("productList")) ;
    displayProducts(productList);
}
else{
    productList = [];
}
function addProducts(){

        var productNameValue = productName.value;
        var productPriceValue = productPrice.value;
        var productCategoryValue = productCategory.value;
        var productQualityValue = productQuality.value;

        var product = {
            name: productNameValue,
            price: Number(productPriceValue),
            category: productCategoryValue,
            quality: productQualityValue
        };
        if(mood == 'ADD'){
        productList.push(product);
        }
        else{
            productList[temp] = product;
            mood = 'ADD';
            addBtn.innerHTML = 'ADD'
        }
        localStorage.setItem("productList", JSON.stringify(productList));
        // location.reload();
        // localStorage.clear();
        clearForm();
        displayProducts(productList);
        
}

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productQuality.value = "";
}

function displayProducts(list){
    var html=``;
    for(var i=0;i<list.length;i++){
        html+=`<tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].quality}</td>
                    <td>
                        <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button> 
                    </td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button> 
                    </td>
        </tr>`
}
    document.getElementById("tableData").innerHTML = html;
}

function deleteProduct(index){
    productList.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productList));
    displayProducts(productList);
}

function updateProduct(index){
    
    productName.value = productList[index].name;
    productPrice.value = productList[index].price;
    productCategory.value = productList[index].category;
    productQuality.value = productList[index].quality;

    addBtn.innerHTML = "Update";
    mood = 'Update';
    temp = index;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
    //localStorage.setItem("productList", JSON.stringify(productList));
    
}

function searchProducts(searchTerm){
    var searchList = [];
    for(var i=0 ; i<productList.length ; i++){
        if(productList[i].name.toLowerCase().includes(searchTerm.toLowerCase()) == true){
            searchList.push(productList[i]);
        }
    }
    displayProducts(searchList);
}
