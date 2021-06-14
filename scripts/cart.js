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
    let totalPrice = 0;
    const eltProductCartList =  document.getElementById("productCartList");
    if (storageCart.length !== 0) {
        for (let i = 0; i < storageCart.length; i++) {
            for ( let j = 0; j < data.length; j++){
                if (data[j]._id === storageCart[i].id) { 
                    totalPrice += (data[j].price * (storageCart[i].amount).toFixed(2)) / 100 ;
                    eltProductCartList.innerHTML += `<div class="row border d-flex justify-content-center justify-content-md-between align-items-center pt-2 pb-2 mb-2">
                                                        <div class="col-12 col-md-3">
                                                            <img src="${data[j].imageUrl}" class="img-fluid img-thumbnail img--square" alt="Caméra ${data[j].names}">
                                                        </div>
                                                        <div class="col-12 col-md-9 p-3">
                                                            <div class="row">
                                                                <div class="col-12 col-md-4">
                                                                    <p><strong>Nom : </strong><a class="text-center" href="products.html?id=${data[j]._id}">${data[j].name}</a></p>
                                                                    <p><strong>Lentille : </strong>${data[j].lenses[storageCart[i].lense]}</p>
                                                                </div>
                                                                <div class="col-12 col-md-4">
                                                                    <p><strong>Prix : </strong>${((data[j].price) / 100).toFixed(2)}€</p>
                                                                    <p><strong>Quantité : </strong>${storageCart[i].amount}</p>
                                                                </div>
                                                                <div class="col-12 col-md-2">
                                                                    <p class="text-right">
                                                                    <strong class="p-2">${(storageCart[i].amount * ((data[j].price) / 100)).toFixed(2)}€</strong>
                                                                    </p>
                                                                </div>
                                                                <div class="col-12 col-md-1">
                                                                    <p class="text-right">
                                                                    <button id="trash-${i}" class="btn btn-primary btn-sm">
                                                                        <i class="fas fa-trash"></i>
                                                                    </button>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>`;
                break;
                } else {
                    if (j + 1 === data.length) {
                        eltProductCartList.innerHTML += `<div class="row border d-flex justify-content-center justify-content-md-between align-items-center pt-2 pb-2 mb-2">
                        <div class="col-12 col-md-3">
                            <img src="./img/unknown.png" class="img-fluid img-thumbnail img--square" alt="unknown">
                        </div>
                        <div class="col-12 col-md-9 p-3">
                            <div class="row">
                                <div class="col-12 col-md-4">
                                    <p><strong>Nom : </strong></p>
                                    <p><strong>Lentille : </strong></p>
                                </div>
                                <div class="col-12 col-md-4">
                                    <p><strong>Prix : </strong></p>
                                    <p><strong>Quantité : </strong>${storageCart[i].amount}</p>
                                </div>
                                <div class="col-12 col-md-2">
                                    <p class="text-right">
                                    <strong class="p-2"></strong>
                                    </p>
                                </div>
                                <div class="col-12 col-md-1">
                                    <p class="text-right">
                                    <button id="trash-${i}" class="btn btn-primary btn-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    }
                }
            }
        }
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    }
}

function clearCart() {
    const buttonClear = document.getElementById('clearCart');
    buttonClear.addEventListener('click', function(e) {
        document.getElementById("productCartList").innerHTML = "";
        localStorage.clear();
        document.getElementById('cartNumber').textContent = "";
        document.getElementById('totalPrice').textContent = (0).toFixed(2);

    })
}
  
function deleteOnItem() {
    let cleared = false;
    let storageCart = JSON.parse(localStorage.getItem('items'));
    for (let i = 0; i < storageCart.length; i++) {
        if (cleared) {
            break;
        }
        elt = document.getElementById('trash-' + i);
            elt.addEventListener('click', function(e) {
                storageCart.splice(i, 1);
                if (storageCart.length === 0) {
                    localStorage.clear();
                } else {
                    localStorage.setItem('items', JSON.stringify(storageCart));
                }
                document.location.reload();
            })  
    }
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
        clearCart();
        updateCart(value);
        updadeIconItemToCart();
        deleteOnItem();
    })
    .catch(function(err) {

    });