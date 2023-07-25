function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: "DELETE",
    })
}


//cuando preciono agregar, crear un carrito y si agrego, la proxima vez que toque, no crea otro carro, capturo el id => agrego el producto al carro.
async function addProduct(productId) {
    try {
        fetch(`/carts/products/${productId}`, {
            method: "POST",
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cartId', JSON.stringify(data.data))
            })
        window.alert("Product added to the cart")
    } catch (e) {
        res.send({ msg: e })
    }
}


document.getElementById('cartButton').addEventListener('click', function () {
    let cartId = localStorage.getItem('cartId')
    redirectToURL(`http://localhost:8080/carts/${JSON.parse(cartId)}`);
});

function redirectToURL(url) {
    window.location.href = url;
}


async function clearLocalStorage() {
    return localStorage.clear()
}