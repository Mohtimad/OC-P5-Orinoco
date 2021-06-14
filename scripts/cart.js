function updadeIconItemToCart() {
    if (localStorage.length !== 0) {
        let localStorageCart = JSON.parse(localStorage.getItem('items'));
        let totalItemsNumber = 0;
        if (localStorageCart.length !== 0) {
            for  ( let i = 0; i < localStorageCart.length; i++) { 
                totalItemsNumber += parseInt(localStorageCart[i].amount)
            }
            if (totalItemsNumber !== 0) {
                document.getElementById('cartNumber').textContent = totalItemsNumber;
            }
        }
    }
}

function updateCart(data) {
    let storageCart = JSON.parse(localStorage.getItem('items'));
    const elt =  document.getElementById("productCartList"); 
    if (storageCart.length !== 0) {
        for (let i = 0; i < storageCart.length; i++) {
            for ( let j = 0; j < data.length; j++){
                if (data[j]._id === storageCart[i].id) { 
                    elt.innerHTML += `<div class="row bg--by-theme border d-flex justify-content-center justify-content-sm-between align-items-center pt-2 pb-2 mb-2">
                                        <div class="col-3">
                                            <img src="${data[j].imageUrl}" class="img-fluid img-thumbnail img--square" alt="Caméra ${data[j].names}">
                                        </div>
                                        <div class="col-auto p-3">
                                            <p>
                                                <a href="products.html?id=${data[j]._id}">${data[j].name}</a>
                                                <strong class="p-2">x${storageCart[i].amount}</strong>
                                                <button class="btn btn-primary btn-sm">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </p>
                                        </div>
                                    </div>`;
                break;
                }
            }
        }
    } 
}

function clearCart() {
    const buttonClear = document.getElementById('clearCart');
    buttonClear.addEventListener('click', function(e) {
        document.getElementById("productCartList").innerHTML = "";
        localStorage.clear();
        document.getElementById('cartNumber').textContent = "";

    })
}
  

const minAmount = 1;
const maxAmount = 10;

  fetch("http://localhost:3000/api/cameras/")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        clearCart()
        updateCart(value)
        updadeIconItemToCart()
    })
    .catch(function(err) {

    });