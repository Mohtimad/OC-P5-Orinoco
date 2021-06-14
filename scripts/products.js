class CartStorage {
  constructor(id, lense, amount) {
    this.id = id;
    this.lense = lense;
    this.amount = amount;
  }
}

function updateProduct(data) {
    /* ---------- ENABLE AMOUNT IMPUT ---------- */
    const eltAmount = document.getElementById("amount");
    eltAmount.removeAttribute("disabled");
    /* ---------- UPDATE PRICE AND ITEM MIN / MAX---------- */
    document.getElementById("price")
        .textContent = (data.price / 100).toFixed(2);
      eltAmount.setAttribute("min", minAmount)
      eltAmount.setAttribute("max", maxAmount)
    /* ---------- UPDATE PRODUCT NAME ---------- */
    document.getElementById("productName")
        .textContent = data.name;
    /* ---------- UPDATE OPTIONS ---------- */
    for (let i = 0; i < data.lenses.length; i++) {
      let lensesOptions = document.getElementById("lensesOptions");
      if (!data.lenses[0]) {
      break;
      } else {
        lensesOptions.innerHTML += `<option>${data.lenses[i]}</option>`;
        lensesOptions.removeAttribute("disabled");
      }
    }
    /* ---------- UPDATE DESCRIPTION ---------- */
    document.getElementById("description")
        .textContent = data.description;
    /* ---------- UPDATE URL & ALT IMAGE ---------- */
    eltImg = document.getElementById("productImg");
    eltImg.setAttribute("src", data.imageUrl);
    eltImg.setAttribute("alt", "Caméra " + data.name);
}
    
function updatePrice(data) {
    let eltAmount = document.getElementById('amount');
    eltAmount.addEventListener('input', function(e) {
        const amount = e.target.value;
        if (amount >= minAmount && amount <= maxAmount) {
          // Convert cts to €uros
          document.getElementById("price")
            .textContent = (amount * (data.price / 100)).toFixed(2);
          e.target.nextElementSibling.hidden = true;
        } else {
          e.target.nextElementSibling.hidden = false;
        }
    });
}

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

function addToCart() {
  const buttonSubmit = document.getElementById('addToCart');
  buttonSubmit.addEventListener('click', function(e) {
    const lense = document.getElementById("lensesOptions").selectedIndex;
    const amount = parseInt(document.getElementById('amount').value);
    if (amount <= maxAmount && amount >= minAmount) { 
      if (localStorage.length === 0) {
        let newStorageCart = [];
        newStorageCart[0] = new CartStorage (idURL, lense, amount);
        localStorage.setItem('items', JSON.stringify(newStorageCart))
      } else {
        let storageCart = JSON.parse(localStorage.getItem('items'));
        for ( let i = 0; i < storageCart.length ; i++) {
          if (storageCart[i].id === idURL && storageCart[i].lense === lense) {
            storageCart[i] = new CartStorage (idURL, lense, amount);
            break;
          } else {
            if ( i + 1 === storageCart.length) { 
              storageCart.push(new CartStorage (idURL, lense, amount));
            }
          }
        }
        localStorage.setItem('items', JSON.stringify(storageCart));
      }
        updadeIconItemToCart();
     }
  })
}


const minAmount = 1;
const maxAmount = 10;

let parsedUrl = new URL(window.location.href);
const idURL = parsedUrl.searchParams.get("id");
  fetch("http://localhost:3000/api/cameras/" + idURL)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status);
    })
    .then(function(value) {
        updadeIconItemToCart();
        updateProduct(value);
        updatePrice(value);
        addToCart();
    })
    .catch(function(err) {
      document.location.href='./404.html';
    });