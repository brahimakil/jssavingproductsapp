let mode = 'create';
let tmp;
let products = JSON.parse(localStorage.getItem('products')) || [];

function calculateTotal() {
    const price = parseFloat(document.getElementById('price').value) || 0;
    const taxes = parseFloat(document.getElementById('taxes').value) || 0;
    const ads = parseFloat(document.getElementById('ads').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;

    const total = (price + taxes + ads) - discount;
    document.getElementById('total').value = total.toFixed(2);
}

document.getElementById('price').addEventListener('input', calculateTotal);
document.getElementById('taxes').addEventListener('input', calculateTotal);
document.getElementById('ads').addEventListener('input', calculateTotal);
document.getElementById('discount').addEventListener('input', calculateTotal);

function createProduct() {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const taxes = document.getElementById('taxes').value;
    const ads = document.getElementById('ads').value;
    const discount = document.getElementById('discount').value;
    const total = document.getElementById('total').value;
    const count = document.getElementById('count').value;
    const category = document.getElementById('category').value;

    if (title && price && category) {
        let newProduct = {
            title,
            price,
            taxes,
            ads,
            discount,
            total,
            count,
            category
        };

        if (mode === 'create') {
            products.push(newProduct);
        } else {
            products[tmp] = newProduct;
            mode = 'create';
            document.getElementById('create').innerText = 'Create';
        }

        localStorage.setItem('products', JSON.stringify(products));
        showData();
        clearInputs();
    }
}

function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('taxes').value = '';
    document.getElementById('ads').value = '';
    document.getElementById('discount').value = '';
    document.getElementById('total').value = '';
    document.getElementById('count').value = '';
    document.getElementById('category').value = '';
}

function showData(filteredProducts = products) {
    let table = '';
    for (let i = 0; i < filteredProducts.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${filteredProducts[i].title}</td>
                <td>${filteredProducts[i].price}</td>
                <td>${filteredProducts[i].taxes}</td>
                <td>${filteredProducts[i].ads}</td>
                <td>${filteredProducts[i].discount}</td>
                <td>${filteredProducts[i].total}</td>
                <td>${filteredProducts[i].category}</td>
                <td><button onclick="updateProduct(${i})">Update</button></td>
                <td><button onclick="deleteProduct(${i})">Delete</button></td>
            </tr>
        `;
    }

    document.querySelector('#productTable tbody').innerHTML = table;

    if (filteredProducts.length > 0) {
        document.getElementById('deleteAll').innerHTML = `<button onclick="confirmDeleteAll()">Delete All (${filteredProducts.length})</button>`;
    } else {
        document.getElementById('deleteAll').innerHTML = '';
    }
}

function deleteProduct(i) {
    if (confirm('Are you sure you want to delete this product?')) {
        products.splice(i, 1);
        localStorage.setItem('products', JSON.stringify(products));
        showData();
    }
}

function confirmDeleteAll() {
    if (confirm('Are you sure you want to delete all products?')) {
        deleteAll();
    }
}

function deleteAll() {
    products = [];
    localStorage.setItem('products', JSON.stringify(products));
    showData();
}

function updateProduct(i) {
    if (confirm('Are you sure you want to update this product?')) {
        document.getElementById('title').value = products[i].title;
        document.getElementById('price').value = products[i].price;
        document.getElementById('taxes').value = products[i].taxes;
        document.getElementById('ads').value = products[i].ads;
        document.getElementById('discount').value = products[i].discount;
        document.getElementById('total').value = products[i].total;
        document.getElementById('count').value = products[i].count;
        document.getElementById('category').value = products[i].category;
        mode = 'update';
        tmp = i;
        document.getElementById('create').innerText = 'Update';
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

document.getElementById('search').oninput = function() {
    let value = this.value.toLowerCase();
    let filteredProducts = products.filter(product => product.title.toLowerCase().includes(value) || product.category.toLowerCase().includes(value));
    showData(filteredProducts);
};

function searchProduct(mode) {
    let search = document.getElementById('search').value.toLowerCase();
    let filteredProducts;
    if (mode == 'title') {
        filteredProducts = products.filter(product => product.title.toLowerCase().includes(search));
    } else {
        filteredProducts = products.filter(product => product.category.toLowerCase().includes(search));
    }
    showData(filteredProducts);
}

showData(products);
