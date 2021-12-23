let headerNav            = document.getElementById("navbar");
let headerNavheight      = headerNav.clientHeight;
let mainSection          = document.getElementById("main-section");
let windowHeight         = window.innerHeight;
let sliderContent        = Array.from( document.getElementsByClassName("slider-content") );
let sliderContentcount   = sliderContent.length - 1; 
let chevronLeft          = document.getElementById("chevron-left");
let chevronRight         = document.getElementById("chevron-right");
let nextSection          = document.getElementById("next-section");
let currentSlide         = 0;
let time                 = 5000;  
let click                = false;
let allproductBtn        = document.getElementById("all");
let clothBtn             = document.getElementById("cloth-btn");
let phoneBtn             = document.getElementById("phone-btn");
let laptopBtn            = document.getElementById("laptop-btn");
let watchesBtn           = document.getElementById("watch-btn");
let allProducts          = Array.from( document.getElementsByClassName("all"));
let addProductbtn        = Array.from( document.getElementsByClassName("addcart-btn") );
let productCartcontainer = document.getElementById("cart-container");
let toggleCart           = document.getElementById("togglecart");
let countProduct         = document.getElementById("count-products");
let chevronTop           = document.getElementById("chevron-top");

 
/*Navbar */
// Handle navbar animation
window.addEventListener('scroll',function(){
    if( document.documentElement.scrollTop > (headerNavheight + 200) ) {
        headerNav.classList.add('sticky');
    } else {
        headerNav.classList.remove('sticky');
    }
})

 //When page load
window.onload = function(){
    
    showProductincart(  ) 
}

// Products prototype function
products.prototype = {
    
    // Add new product
     addProduct:function( product ){
          let allProducts        = this.getAllproduct();
          let checkIfproductexit = false;
  
          // Check if array of product not empty
          if( allProducts.length > 0 ) {
              // If product exist increase its count
              allProducts.forEach( productOld => {
                  if( productOld.productId == product.productId ) {
                      productOld.quantity++;
                      checkIfproductexit = true;
                      localStorage.setItem('products',JSON.stringify(allProducts));
                  } else {
                      checkIfproductexit = false
                  }
              })
          }
          // product not exist push new one
          if( checkIfproductexit == false) {      
              this.arrProduct.push(product);  
              localStorage.setItem('products',JSON.stringify(allProducts));
          } 
          showProductincart(  )
     },
     //Delete product
     deleteProduct:function( id ){  
          let getAll = this.getAllproduct();
          this.arrProduct = getAll.filter( product => {
              return parseInt(product.productId) !== parseInt(id);    
          })
          localStorage.setItem('products',JSON.stringify(this.arrProduct)); 
          showProductincart(  )
      },
     //Get all product
     getAllproduct:function(){
         return this.arrProduct;
     }
  }
  //Constructor to handle carts data
  function products( ){
      this.arrProduct = [];
  }
//Constructor to handle carts data
function products( ){
    this.arrProduct = [];
}

// Display cart box or hidden
toggleCart.addEventListener('click',function(){
    if( productCartcontainer.children.length > 0) {
        productCartcontainer.classList.toggle("display");
    } else {
        productCartcontainer.classList.toggle("display");
        productCartcontainer.innerHTML = "<span style='color:#6c6c6c;fontWeight:bold;fontSize:0.7rem'>sorry there is no product in cart</span>"
    }
})

//Attach delete cart button
document.body.addEventListener('click', function(e){
    if( e.target.classList.contains("delete-btn") ) {
       let productId = e.target.parentElement.querySelector(".product-id").innerHTML;
       
       // Remove from object
       productItem.deleteProduct(productId);
       
       // remove from dom
       e.target.parentElement.remove();
       showProductincart(  ) 
       
     }
 })
 
products.prototype = {
    
    addProduct:function( product ){
 
         let allProducts        = this.getAllproduct();
         let checkIfproductexit = false;
         allProducts.forEach( productOld => {
             if( productOld.productId == product.productId ) {
                 productOld.quantity++;
                 checkIfproductexit = true;
             } 
             
         })
         if( checkIfproductexit == false) {
             this.arrProduct.push(product);
         } 
         
 
    },
    deleteProduct:function( id){
     
        let getAll = this.getAllproduct();
        
        let newProduct = getAll.filter( product => {
            return product.productId != id
    
        });

        //Set new data of localdata storage
        if(localStorage.length != 0) {
            localStorage.setItem("products", JSON.stringify(newProduct));
            showProductincart(  )
            
        } 
    },
    getAllproduct:function(){
        return this.arrProduct;
    }
 }
 function products( ){
    this.arrProduct = [];
}
    

// Prevent propgation
productCartcontainer.addEventListener('click',function(e){
    //e.stopPropagation();
})

// Close cart with keyboard
window.addEventListener('keydown',function(e){
    if( e.keyCode == 27 ) {
        productCartcontainer.classList.remove("display");
    }
})

document.body.addEventListener('click', function(e){

    // Get delete button to delete specific cart
   if( e.target.classList.contains("delete-btn") ) {
     let productId = e.target.parentElement.querySelector(".product-id").innerHTML;
     // Remove from object
     productItem.deleteProduct(productId);
     // remove from dom
      e.target.parentElement.remove();
      
   }
})
//Move to the top of page
chevronTop.addEventListener("click",function(){
   window.scrollTo(0,0);
})
let productItem = new products();

// Loop through every product and register click click event 
addProductbtn.forEach( addProduct => {
    addProduct.addEventListener("click",function(){
        let productId    = this.parentElement.parentElement.parentElement.children[1].textContent;
        let productName  = this.parentElement.querySelector(".subtitle a").textContent;
        let productImage = this.parentElement.parentElement.querySelector(".header-box .img img").getAttribute("src")
        let productPrice = this.parentElement.querySelector(".price").textContent;
        let quantity     = 1;
        
        let product = {
            productId,
            productName,
            productImage,
            productPrice,
            quantity,
        }
     
        // Push new product
        productItem.addProduct(product);
        //Get all data to print it

    
    })
    
})
function showProductincart(  ) {

    let products = JSON.parse(localStorage.getItem('products') );
    if( !(products.length == 0)) {
        countProduct.style.display = "block";
        countProduct.innerHTML = products.length;
        productCartcontainer.innerHTML = "";
        let subHeading = document.createElement("h3");
        subHeading.classList.add("subheading")
        subHeading.innerHTML = "cart details";
        productCartcontainer.appendChild(subHeading);

        products.forEach( product =>{
            let listItem = document.createElement("li");
            listItem.classList.add("cart-item","d-flex-cloumn" );
            productCartcontainer.appendChild(listItem);  
            
            let productName = document.createElement("div");
                productName.classList.add("product-name");
                productName.innerHTML =  "Product price: "+ product.productName;
                listItem.appendChild(productName);
                
            let productPrice = document.createElement("p");
                productPrice.classList.add("product-price");
                productPrice.innerHTML = "Product price: " + product.productPrice;
                listItem.appendChild(productPrice);
    
            let quantity = document.createElement("p");
                quantity.classList.add("quantity");
                quantity.innerHTML = "Product quantity: " + product.quantity ;
                listItem.appendChild(quantity)
            
            let idSpan = document.createElement("span");
                idSpan.innerHTML = product.productId
                idSpan.classList.add("product-id")
                listItem.appendChild(idSpan);
                idSpan.style.display = "none"
    
    
            let btnDelete = document.createElement("button");
                btnDelete.classList.add("delete-btn");
                btnDelete.innerHTML = "delete product";
                listItem.appendChild(btnDelete)
    
        })
    } else {
        countProduct.style.display = "none";
    }
         
}