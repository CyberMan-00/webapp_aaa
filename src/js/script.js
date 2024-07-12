'use strict'

const API_KEY = 'AIzaSyDUtcS-fFi1VOWsxmtkoKJOY-9m0aObhqA';
const SPREADSHEET_ID = '1k6_Sqjen2OfIkJZMYJl0Tk06QOTveRRUKGt-QPLNOhQ'; // between d/ **** /edit
const RANGE = 'Sheet1!A2:I'; // Adjust range to include the new column
const FILTER_DATE = '7/12/2024';

async function fetchProducts() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    return data.values;
}

function renderProducts(products) {
    const productList = document.getElementById('product-feed');
    productList.innerHTML = ''; // Clear any existing content

    const filteredProducts = products//.filter(product => product[7] === FILTER_DATE);
    // console.log(filteredProducts)

    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p>No products found for the specified date.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const [
            product_url, 
            product_img_url, 
            product_title, 
            product_currency, 
            product_old_price, 
            product_new_price, 
            product_discount, 
            data_date_part, 
            data_timestamp_part
        ] = product;

        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';

        productDiv.innerHTML = `

            <a href="${product_url}" class="card">
            
            <div class="card__content">

                <div class="card__content__img"><img src="${product_img_url}" alt="#"></div>

                <div class="card__content__percent">
                    <div class="card__content__percent__sign">-</div>
                    <div class="card__content__percent__digit">${product_discount}</div>
                    <div class="card__content__percent__sign">%</div>
                </div>

                <div class="card__content__title">${product_title}</div>
                
                    <div class="card__content__price">
                        <div class="card__content__price__new">
                            <div class="card__content__price__new__digit">${product_new_price}</div>
                            <div class="card__content__price__new__currency">${product_currency}</div>
                        </div>
                        <div class="card__content__price__old">
                            <div class="card__content__price__old__digit">${product_old_price}</div>
                            <div class="card__content__price__old__currency">${product_currency}</div>
                        </div>
                    </div>

                    <div class="button">Open Deal</div>
                    <div class="card__content__date">Offer Date: ${data_date_part}</div>
                </div>  
            </a>
        `;
            // ${imageUrl ? `<img src="${imageUrl}" alt="${name}">` : ''}

        productList.appendChild(productDiv);
    });
}

fetchProducts().then(products => renderProducts(products));

console.log('website was born')