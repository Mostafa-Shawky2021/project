
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
let formInputs           = Array.from( document.getElementsByClassName("validate"));
let contactForm          = document.getElementById("contact-form");
let pattEmail            = /^[A-Za-z0-9]+(?:[-).=_(^&*#$%]+[A-Za-z0-9]+)*@\w+(?:[-\.][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
let alphaCharacter       = /^[A-z\s]+$/;
//Events
//When page load

window.onload = function(){
    ( localStorage.getItem('products') ) ?  productItem.addProduct( JSON.parse(localStorage.getItem('products')) ) : 0   ;
    showProductincart(  ) 
}

/*Navbar */
// Handle navbar animation
window.addEventListener('scroll',function(){
    if( document.documentElement.scrollTop > (headerNavheight + 200) ) {
        headerNav.classList.add('sticky');
    } else {
        headerNav.classList.remove('sticky');
    }
})

//Move to the top of page
chevronTop.addEventListener("click",function(){
    window.scrollTo(0,0);
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
 
 /* toggle Cart */
 toggleCart.addEventListener('click',function(){
    if( productCartcontainer.children.length > 0) {
        productCartcontainer.classList.toggle("display");
    } else {

        productCartcontainer.classList.toggle("display");

        productCartcontainer.innerHTML = "<span style='color:#6c6c6c;fontWeight:bold;fontSize:0.7rem'>sorry there is no product in cart</span>"
    }
})
// Products prototype function
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
              Array.isArray( product ) ?  this.arrProduct.push(...product) : this.arrProduct.push(product);  
              localStorage.setItem('products',JSON.stringify(allProducts));
          } 
          showProductincart(  )
     },
     //Delete product
     deleteProduct:function( id ){  
          let getAll = this.getAllproduct();
          console.log( getAll );
          this.arrProduct = getAll.filter( product => {
              return parseInt(product.productId) !== parseInt(id);    
          })
          if( !(this.arrProduct.length == 0) ) {
              localStorage.setItem('products',JSON.stringify(this.arrProduct)); 
  
          } else {
              localStorage.removeItem('products');
          }
       
  
          showProductincart(  )
      },
     //Get all product
     getAllproduct:function(){
         return this.arrProduct;
     }
  }


allProducts.forEach( (product,index)=> {
    let idSpan = document.createElement('span');
        idSpan.classList.add('id-product');
        idSpan.style.display = "none";
        idSpan.innerHTML = (index + 1);
        product.appendChild(idSpan);
        
})

function products( ){
    this.arrProduct = [];
}

let productItem = new products();
// Loop through every product and register click click event 
addProductbtn.forEach( addProduct => {
    addProduct.addEventListener("click",function(){
        let productId    = this.parentElement.parentElement.parentElement.children[1].textContent;
        let productName  = this.parentElement.querySelector(".subtitle a").textContent;
        let productImage = this.parentElement.parentElement.querySelector(".header-box .img img").getAttribute("src")
        let productPrice = this.parentElement.querySelector(".price").textContent;
        let quantity     = 1;
        
        // Product details
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
// Validate inputs form on blur event
formInputs.forEach( formInput => formInput.addEventListener('blur',checkValidateblur) );
// Validate on submit event
contactForm.addEventListener( 'submit',function(e){
    formInputs.forEach( formInput => {
        //fname validation
        if( formInput.name == 'firstname' ) {
            // Check if fname is valid
            if( formInput.value.length < 5 || alphaCharacter.test( formInput.value ) == false) {
                formInput.parentElement.querySelector('.error').classList.add('display');
                formInput.style.border = "1px solid #f00";
                e.preventDefault(); 
            } else {
                formInput.parentElement.querySelector('.error').classList.remove('display');
                formInput.style.border = "1px solid #878787";
            }
        }
        //lname validation
        if( formInput.name == 'lastname' ) {
            // Check if lname is valid
            if( formInput.value.length < 5 || alphaCharacter.test( formInput.value ) == false) {
                formInput.parentElement.querySelector('.error').classList.add('display');
                formInput.style.border = "1px solid #f00";
                e.preventDefault();
            } else {
                formInput.parentElement.querySelector('.error').classList.remove('display');
                formInput.style.border = "1px solid #878787";

            }
        }
        //email
        if( formInput.name == 'email' ) {
    
            // Check if fname is valid
            if( pattEmail.test( formInput.value) == false ) {
                formInput.parentElement.querySelector('.error').classList.add('display');
                formInput.style.border = "1px solid #f00";
                e.preventDefault();
            } else {
                formInput.parentElement.querySelector('.error').classList.remove('display');
                formInput.style.border = "1px solid #878787";

            }
        }
        //message 
        if( formInput.name == 'message' ) {
    
            // Check if fname is valid
            if( formInput.value.length < 10 ) {
                formInput.parentElement.querySelector('.error').classList.add('display');
                formInput.style.border = "1px solid #f00";
                e.preventDefault();
            } else {
                formInput.parentElement.querySelector('.error').classList.remove('display');
                formInput.style.border = "1px solid #878787";

            }
        }

    })
})

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


//All functions
function checkValidateblur( e ) {
    
    if( e.target.name == "firstname"  ) {
        let fname = e.target;
        // Check if fname is valid
        if( fname.value.length < 5 || alphaCharacter.test( fname.value ) == false ) {
            fname.parentElement.querySelector('.error').classList.add('display');
            fname.style.border = "1px solid #f00";
        } else {
            fname.parentElement.querySelector('.error').classList.remove('display');
            fname.style.border = "1px solid #878787";
        }
    }
    if( e.target.name == 'lastname' ) {

        let lname = e.target;
        // Check if lname is valid
        if( lname.value.length < 5 || alphaCharacter.test( lname.value ) == false    ) {
            lname.parentElement.querySelector('.error').classList.add('display');
            lname.style.border = "1px solid #f00";
        } else {
            lname.parentElement.querySelector('.error').classList.remove('display');
            lname.style.border = "1px solid #878787";
        }
     
    }

    if( e.target.name == 'email' ) {
        
        let email = e.target;
        // Check if email is valid
        if( pattEmail.test( email.value) == false) {
            email.parentElement.querySelector('.error').classList.add('display');
            email.style.border = "1px solid #f00";

        } else {
            email.parentElement.querySelector('.error').classList.remove('display');
            email.style.border = "1px solid #878787";

        }
    }

    if( e.target.name == 'message' ) {
        
        let message = e.target;
        // Check if email is valid
        if( message.value.length  < 10 ) {
            message.parentElement.querySelector('.error').classList.add('display');
            message.style.border = "1px solid #f00";

        } else {
            message.parentElement.querySelector('.error').classList.remove('display');
            message.style.border = "1px solid #878787";

        }
        

    }
}

function showProductincart(  ) {

    let products = JSON.parse(localStorage.getItem('products') );
    
    if( products ) {
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
