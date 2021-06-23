function uptadetCards(value) {
    const elt = document.getElementById("card-list");
    for (let i = 0; i < value.length; i++) {
      elt.innerHTML += `<div class= "col-12 col-sm-6 col-lg-4 card-group mb-4">
                          <div class="card shadow">
                              <h2 class="card-header fw-bold text-center h5 text-nowrap">
                                ${value[i].name}
                              </h2>
                              <a href="products.html?id=${value[i]._id}" class="stretched-link text-danger" style="position: relative;">
                                <img class="card-img-top" src="${value[i].imageUrl}" alt="Appareil photo ${value[i].name}">
                              </a>
                              <div class="card-footer text-muted text-right ">
                                <p class="price font-family--Lobster">${(value[i].price / 100).toFixed(2)}€</p>
                              </div>
                            </div>
                        </div>`;
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
      if (totalItemsNumber > 0) {
        document.getElementById('cartNumber').textContent = totalItemsNumber;
      }
    }
  }
}

/* *************************************** */
/* **************** START **************** */
/* *************************************** */

fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.status);
  })
  .then(function(value) {
    uptadetCards(value);
    updadeIconItemToCart();
  })
  .catch(function(err) {
    console.log(err);
    document.getElementById('alert')
      .innerHTML = `<div class="alert alert-danger text-center" role="alert">
                    Échec de la tentative de récupération de données
                    </div>`;
  });