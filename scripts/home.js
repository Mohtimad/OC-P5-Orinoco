function uptadetCards(value) {
    const elt = document.getElementById("card-list");
    const numberOfItems = value.length;
    for (let i = 0; i < numberOfItems; i++) {
      elt.innerHTML += `<div class= "col-12 col-sm-6 col-lg-${2 + (i % 2)} card-group mb-4">
                          <div class="card shadow">
                              <h2 class="card-header fw-bold text-center h5 text-nowrap">
                                ${value[i].name}
                              </h2>
                              <a href="products.html?id=${value[i]._id}" class="stretched-link text-danger" style="position: relative;">
                                <img class="card-img-top" src="${value[i].imageUrl}" alt="Caméra ${value[i].name}">
                              </a>
                              <div class="card-footer text-muted text-right ">
                                <p class="price font-family--Lobster">${(value[i].price / 100).toFixed(2)}€</p>
                              </div>
                            </div>
                        </div>`;
    }
}

fetch("http://localhost:3000/api/cameras")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    uptadetCards(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
    windows.alert(err)
  });