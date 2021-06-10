function updateProducts(value) {

    /* Update Price */
    document.getElementById("price")
        .textContent = (value.price / 100).toFixed(2);

    /* Update name */
    document.getElementById("productName")
        .textContent = value.name;

    /* Update options */
    console.log(value.lenses.length);
    for (let i = 0; i < value.lenses.length; i++) {
        document.getElementById("lensesOptions")
        .innerHTML += `<option>${value.lenses[i]}</option>`
    }
    /* Update description */
    document.getElementById("description")
        .textContent = value.description;
        
    /* Update img */
    document.getElementById("productImg")
        .setAttribute("src", value.imageUrl);
}
    
function updatePrice(value) {
    let amount = 0;
    let eltAmount = document.getElementById('amount');
    eltAmount.addEventListener('input', function() {
        document.getElementById("price").textContent = (document.getElementById('amount').value * (value.price / 100)).toFixed(2);
    });
}

let parsedUrl = new URL(window.location.href);
let urlId = parsedUrl.searchParams.get("id");
fetch("http://localhost:3000/api/cameras/" + urlId)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      
    console.log(value);
    updatePrice(value)
    updateProducts(value);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });