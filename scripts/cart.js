class OrderObject {
    constructor(firstName, lastName, address, city, email, products) {
        this.contact = {firstName: firstName, 
                        lastName: lastName, 
                        address: address, 
                        city: city, 
                        email: email }
        this.products = products;
    }
}

class ValidateForm {
    static email(input, eltName) {
     if ( input && /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[*]*$/.test(input))
      {
        return (true)
      }
      this.error(eltName)
    }

    static properNoun(input, eltName) {
     if ( input && /^[a-zA-Z\.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]*$/.test(input))
      {
        return (true)
      }
        this.error(eltName)
    }

    static isNotEmpty(input, eltName) {
        if (input)
         {
           return (true)
         }
           this.error(eltName)
       }

    static error(eltName) {
        document.getElementById('alertOrder')
            .innerHTML = `<div class="alert alert-danger text-center" role="alert">
                        "${eltName}" incorrect!
                        </div>`;
        return (false);
    }
}

function updadeIconItemToCart() {
    if (localStorage.items) {
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
    if (storageCart) {
        for (let i = 0; i < storageCart.length; i++) {
            for ( let j = 0; j < data.length; j++){
                if (data[j]._id === storageCart[i].id) { 
                    totalPrice += (data[j].price * (storageCart[i].amount).toFixed(2)) / 100 ;
                    eltProductCartList.innerHTML += `<div class="row border d-flex justify-content-center justify-content-md-between align-items-center pt-2 pb-2 mb-2">
                                                        <div class="col-12 col-md-3">
                                                            <img src="${data[j].imageUrl}" class="img-fluid img-thumbnail img--square" alt="Caméra ${data[j].name}">
                                                        </div>
                                                        <div class="col-12 col-md-9 p-3">
                                                            <div class="row">
                                                                <div class="col-12 col-md-auto col-lg-4">
                                                                    <p><strong>Nom : </strong><a class="text-center" href="products.html?id=${data[j]._id}">${data[j].name}</a></p>
                                                                    <p><strong>Lentille : </strong>${data[j].lenses[storageCart[i].lense]}</p>
                                                                </div>
                                                                <div class="col-12 col-md-auto col-lg-4">
                                                                    <p><strong>Prix : </strong>${((data[j].price) / 100).toFixed(2)}€</p>
                                                                    <p><strong>Quantité : </strong>${storageCart[i].amount}</p>
                                                                </div>
                                                                <div class="col-12 col-md-2">
                                                                    <p class="text-right">
                                                                    <strong class="p-2">${(storageCart[i].amount * ((data[j].price) / 100)).toFixed(2)}€</strong>
                                                                    </p>
                                                                </div>
                                                                <div class="col-12 col-md-2">
                                                                    <p class="text-right">
                                                                    <button aria-label="Supprimer l'objet" id="trash-${i}" class="btn btn-primary btn-sm">
                                                                        <i class="fas fa-trash"></i>
                                                                    </button>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>`;
                break;
                } 
            }
        }
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
    }
}

function clearCart() {
        localStorage.removeItem('items');
        document.location.reload();
}
  
function deleteOneItem() {
    let storageCart = JSON.parse(localStorage.getItem('items'));
    if (storageCart) {
        for (let i = 0; i < storageCart.length; i++) {
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
}

function addingAlert(text) {
    document.getElementById('alertOrder')
        .innerHTML = `<div class="alert alert-danger text-center" role="alert">
                    ${text}
                    </div>`;

}

function submitOrder() {
    const form = document.getElementById('contact-form');
    const storageCart = JSON.parse(localStorage.getItem('items'));
    let itemsList = [];
    if (storageCart && storageCart.length > 0) {
        for (let i = 0; i < storageCart.length; i++) {
            itemsList.push(storageCart[i].id)
        }
        if (ValidateForm.properNoun(form.lastName.value, "Nom") &&
            ValidateForm.properNoun(form.firstName.value, "Prénom") &&
            ValidateForm.isNotEmpty(form.address.value, "Adresse") &&
            ValidateForm.properNoun(form.city.value, "Ville") &&
            ValidateForm.email(form.mail.value, "E-mail")){

            let orderObject = new OrderObject(  form.lastName.value,
                                                form.firstName.value,
                                                form.address.value,
                                                form.city.value,
                                                form.mail.value,
                                                itemsList );
            fetch(serverUrl + "order/", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(orderObject)
            })
                .then(function(res) {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error(res.status);
            })
                .then(function(value) {
                    let totalPrice = 0;
                    let ctrlValue = 0;
                    for (let i = 0; i < value.products.length; i++) {
                        totalPrice += (value.products[i].price * storageCart[i].amount);
                    }
                    const dataUrl = "?orderId=" + value.orderId +
                                    "&firstName=" + value.contact.firstName +
                                    "&lastName=" + value.contact.lastName +
                                    "&price=" + totalPrice;
                                    
                    for ( let i = 0; i < dataUrl.length; i++) {
                        ctrlValue += dataUrl.charCodeAt(i);
                    }
                    console.log(totalPrice);
                    localStorage.removeItem('items');
                    document.location.href = "./confirm.html" + dataUrl + "&cv=" + ctrlValue;
            })
                .catch(function(err) {
                    console.log(err);
                    addingAlert(err);
            });
        }
    } else {
        addingAlert("Le panier est vide !")
    }
}

/* *************************************** */
/* **************** START **************** */
/* *************************************** */

const serverUrl = "http://localhost:3000/api/cameras/";

fetch(serverUrl)
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
        throw new Error(res.status);
    })
    .then(function(value) {
        updateCart(value);
        updadeIconItemToCart();
        deleteOneItem();
    })
    .catch(function(err) {
        console.log(err);
        document.getElementById('alert')
            .innerHTML = `<div class="alert alert-danger text-center" role="alert">
                        Échec de la tentative de récupération de données
                        </div>`;
    });
