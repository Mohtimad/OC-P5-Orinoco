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
    static email(input, returnTextIfFalse) {
     if ( input && /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+[*]*$/.test(input))
      {
        return (true)
      }
      this.error(returnTextIfFalse)
    }

    static properNoun(input, returnTextIfFalse) {
     if ( input && /^[a-zA-Z\.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]*$/.test(input))
      {
        return (true)
      }
        this.error(returnTextIfFalse)
    }

    static isNotEmpty(input, returnTextIfFalse) {
        if (input)
         {
           return (true)
         }
           this.error(returnTextIfFalse)
       }

    static error(text) {
        addingAlert(`${text} incorrect!`, 'alertOrder')
        return (false);
    }
}

function addingAlert(text, eltId) {
    let elt = document.getElementById(eltId);
    elt.innerHTML = `<div class="alert alert-danger text-center" role="alert">
                    ${text}
                    </div>`;
    setTimeout(function() {
        elt.innerHTML = "";
    },5000);

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
    let totalPrice = 0;
    const eltProductCartList =  document.getElementById("productCartList");
    if (localStorage.items) {
        let storageCart = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < storageCart.length; i++) {
            for ( let j = 0; j < data.length; j++){
                if (data[j]._id === storageCart[i].id) { 
                    if (storageCart[i].available) {
                        totalPrice += (data[j].price * (storageCart[i].amount).toFixed(2)) / 100 ;
                    }
                    eltProductCartList.innerHTML += `<div class="row border d-flex justify-content-center justify-content-md-between align-items-center pt-2 pb-2 mb-2">
                                                        <div class="col-12 col-md-3">
                                                            <img src="${data[j].imageUrl}" class="img-fluid img-thumbnail img--square" alt="Appareil photo ${data[j].name}">
                                                        </div>
                                                        <div class="col-12 col-md-9 p-3">
                                                            <div class="row">
                                                                <div class="col-12 col-md-5 col-lg-4">
                                                                    <p><strong>Nom : </strong><a class="text-center" href="products.html?id=${data[j]._id}">${data[j].name}</a></p>
                                                                    <p><strong>Lentille : </strong>${data[j].lenses[storageCart[i].lense]}</p>
                                                                </div>
                                                                <div class="col-12 col-md-3 col-lg-4">
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
                } else {
                    if (j + 1 === data.length) {
                        storageCart[i].available = false;
                        eltProductCartList.innerHTML += `<div class="row border d-flex justify-content-center justify-content-md-between align-items-center pt-2 pb-2 mb-2">
                        <div class="col-12 col-md-3">
                            <img src="./img/empty.png" class="img-fluid img-thumbnail img--square" alt="Aucune image">
                        </div>
                        <div class="col-12 col-md-9 p-3">
                            <div class="row">
                                <div class="col-12 col-md-5 col-lg-4">
                                    <p><strong>Produit indisponible</strong></p>
                                </div>
                                <div class="col-12 col-md-3 col-lg-4">
                                    <p><strong>Quantité : </strong>${storageCart[i].amount}</p>
                                </div>
                                <div class="col-12 col-md-2">
                                    <p class="text-right">
                                    <strong class="p-2">---</strong>
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
                    }
                }
            }
        }
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
        localStorage.setItem('items', JSON.stringify(storageCart));
    }
}

function clearCart() {
    if (localStorage.items) {
        localStorage.removeItem('items');
        document.location.reload();
    } else {
        addingAlert("Le panier est déjà vide !", 'alert')
    }
}
  
function deleteOneItem() {
    if (localStorage.items) {
    let storageCart = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < storageCart.length; i++) {
            elt = document.getElementById('trash-' + i);
                elt.addEventListener('click', function(e) {
                    storageCart.splice(i, 1);
                    if (storageCart.length === 0) {
                        localStorage.removeItem('items');
                    } else {
                        localStorage.setItem('items', JSON.stringify(storageCart));
                    }
                    document.location.reload();
                })  
        }
    }
}

function submitOrder() {
    if (localStorage.items) {
        const form = document.getElementById('contact-form');
        let itemsList = [];
        const storageCart = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < storageCart.length; i++) {
            if (storageCart[i].available) {
                itemsList.push(storageCart[i].id)
            }
        }
        console.log(itemsList);
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
                .then(function(res) {
                    let totalPrice = 0;
                    let ctrlValue = 0;
                    let availableItems = 0;
                    for (let i = 0; i < res.products.length; i++) {
                        if (!storageCart[i].available) {
                            availableItems++
                        } 
                        totalPrice += (res.products[i].price * storageCart[availableItems + i].amount);
                    }
                    const dataUrl = "?orderId=" + res.orderId +
                                    "&firstName=" + res.contact.firstName +
                                    "&lastName=" + res.contact.lastName +
                                    "&price=" + totalPrice;
                                    
                    for ( let i = 0; i < dataUrl.length; i++) {
                        ctrlValue += dataUrl.charCodeAt(i);
                    }
                    localStorage.removeItem('items');
                    document.location.href = "./confirm.html" + encodeURI(dataUrl + "&cv=" + ctrlValue);
            })
                .catch(function(err) {
                    console.log(err);
                    addingAlert(err, 'alertOrder');
            });
        }
    } else {
        addingAlert("Le panier est vide !", 'alertOrder')
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
