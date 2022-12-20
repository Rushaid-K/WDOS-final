 let cartIcon = document.querySelector('#cart-icon')
 let cart = document.querySelector('.cart')
 let closeCart = document.querySelector('#close-cart ')

 cartIcon.onclick = () => {
  cart.classList.add("active");
 };

 closeCart.onclick = () => {
  cart.classList.remove("active");
 }; 

if (document.readyState == "loading"){
  document.addEventListener("DOMContentLoaded",ready);
} else {
  ready();
}

function ready(){
  var removeCartButton = document.getElementsByClassName('cart-remove')
  console.log(removeCartButton)
  for (var i = 0; i <removeCartButton.length; i++){
    var button = removeCartButton[i]
    button.addEventListener('click', removeCartItem)
  }
  var quantityInput = document.getElementsByClassName('cart-quantity')
  for (var i = 0; i < quantityInput.length; i++){
    var input = quantityInput[i];
    input.addEventListener("change",quantityChanged);
  }
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i]
    button.addEventListener("click",addcartClicked )
  }
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove()
  updateTotal();
}

function quantityChanged(event){
  var input =event.target;
  if (isNaN(input.value) || input.value <= 0){
    input.value= 1;
  }
  updateTotal();
}

function addcartClicked(event){
  var button = event.target
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText
  var productImg = shopProducts.getElementsByClassName('product-img')[0].src
  addProductToCart(title, price, productImg);
  updateTotal();
}
function addProductToCart(title, price, productImg){
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItem = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItem.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemNames.length; i++){
    if (cartItemNames[i].innerText == title){
      alert("you have already added this time to cart!");
    }
  }

var cartBoxContent = `

<img src="${productImg}" alt="" class="cart-img">
<div class="detail.box">
<div class="Cart-product-title">${title}</div>
<div class="cart-price">${price}}</div>
<input type="number" value="1" class="cart-quantity">
</div>
<i class='bx bxs-trash-alt cart-remove'>X</i>`

cartShopBox.innerHTML = cartBoxContent;
cartItem.append(cartShopBox)
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem)
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);
}

function updateTotal(){
  var cartContent = document.getElementsByClassName('cart-content')
  var cartBoxes = cartContent.getElementsByClassName('cart-box')
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName('cart-price')[0]
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
    var price = parseFloat(priceElement.innerText.replace("LKR",""))
    var quantity = quantityElement.value
    total = total + (price * quantity);

    total = math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'LKR' + total;
  }
}