function addProductToTable() {
    const productName = document.getElementById('productName').value;
    const productQuantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const productRate = parseFloat(document.getElementById('productRate').value) || 0;
    const productPrice = (productQuantity * productRate).toFixed(2);

    if (productName && productQuantity && productRate) {
        const tableBody = document.getElementById('productTableBody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <th scope="row">${tableBody.children.length + 1}</th>
            <td>${productName}</td>
            <td>${productQuantity}</td>
            <td>${productRate}</td>
            <td>${productPrice}</td>
            <td>
                <button type="button" class="btn btn-danger delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Clear input fields
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('productRate').value = '';
        document.getElementById('productPrice').value = '';

        // Add delete functionality
        const deleteButton = newRow.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            tableBody.removeChild(newRow);
            updateTotal();
        });

        updateTotal();
    }
}

// Automatically update the price field as quantity or rate is entered
document.getElementById('productForm').addEventListener('input', function () {
    const quantity = parseFloat(document.getElementById('productQuantity').value) || 0;
    const rate = parseFloat(document.getElementById('productRate').value) || 0;
    const price = (quantity * rate).toFixed(2);
    document.getElementById('productPrice').value = price;
});

function updateTotal() {
    const tableBody = document.getElementById('productTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        const priceCell = rows[i].getElementsByTagName('td')[3]; // 4th column is the price
        if (priceCell) {
            const priceValue = parseFloat(priceCell.textContent);
            if (!isNaN(priceValue)) {
                total += priceValue;
            }
        }
    }

    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addProductToTable();
});

document.getElementById('generateInvoice').addEventListener('click', function () {
    const totalAmount = document.getElementById('totalAmount').textContent;
    const tableBody = document.getElementById('productTableBody');
    const invoiceTableBody = document.getElementById('invoiceTableBody');
    invoiceTableBody.innerHTML = '';

    for (const row of tableBody.children) {
        const productName = row.getElementsByTagName('td')[0].textContent;
        const productQuantity = row.getElementsByTagName('td')[1].textContent;
        const productRate = row.getElementsByTagName('td')[2].textContent;
        const productPrice = row.getElementsByTagName('td')[3].textContent;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${productQuantity}</td>
            <td>${productRate}</td>
            <td>${productPrice}</td>
        `;
        invoiceTableBody.appendChild(newRow);
    }

    document.getElementById('invoiceTotal').textContent = totalAmount;

    $('#invoiceModal').modal('show');
});




// Function to update the total amount in the UI
function updateTotal() {
    const tableBody = document.getElementById('productTableBody');
    const rows = tableBody.getElementsByTagName('tr');
    let total = 0;

    for (let i = 0; i < rows.length; i++) {
        const priceCell = rows[i].getElementsByTagName('td')[4]; // 5th column is the price
        if (priceCell) {
            const priceValue = parseFloat(priceCell.textContent);
            if (!isNaN(priceValue)) {
                total += priceValue;
            }
        }
    }

    document.getElementById('totalAmount').textContent = total.toFixed(2);
}




function printInvoice() {
    const invoiceContent = document.querySelector('.invoice').innerHTML;

    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Invoice</title></head><body>');
    printWindow.document.write(invoiceContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.print();

    printWindow.close();
}

document.getElementById('printButton').addEventListener('click', function () {
    printInvoice();
});
