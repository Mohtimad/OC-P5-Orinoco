function getCtrlValue(url) {
    let tmpArray = url.search.split('&cv=');
    let urlCtrlValue = parseInt(tmpArray[1]);
    let ctrlValue = 0;
    for ( let i = 0; i < tmpArray[0].length; i++) {
        ctrlValue += tmpArray[0].charCodeAt(i);
    }
    if (ctrlValue === urlCtrlValue) {
        return true;
    }
    return false;
}

/* *************************************** */
/* **************** START **************** */
/* *************************************** */


const href = new URL(window.location.href);

if (getCtrlValue(href)) {
    const lastName = href.searchParams.get("lastName");
    const firstName = href.searchParams.get("firstName");
    const orderId = href.searchParams.get("orderId");
    const price = href.searchParams.get("price");
    let confirmText = document.getElementById('confirmText')
    confirmText.innerHTML =     `<h1 class="h3">Commande confirmée</h1>
                                <p>Merci <strong>${lastName} ${firstName}</strong> pour votre achat.<br />
                                <strong>ID de commande :</strong><br /><small>${orderId}</small><br />
                                Total : <strong>${(price / 100).toFixed(2)}</strong>€.</p>`;

} else {
    document.location.href='./404.html';
}










