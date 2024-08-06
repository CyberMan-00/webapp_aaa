'use strict'

const API_KEY = 'AIzaSyDUtcS-fFi1VOWsxmtkoKJOY-9m0aObhqA';
const SPREADSHEET_ID = '1k6_Sqjen2OfIkJZMYJl0Tk06QOTveRRUKGt-QPLNOhQ'; // between d/ **** /edit
const RANGE = 'Sheet1!A2:I'; // Adjust range to include the new column
const FILTER_DATE = '7/12/2024';

const feed = document.querySelector(`#product-feed`);

async function fetchProducts() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    return data.values;
}

function cleanFeed(feed) {
    feed.innerHTML = '';
}

function renderProductItem(feed, array) {
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
        ] = array;

    const productItemHTML = `
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

    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = productItemHTML
    feed.appendChild(productDiv)
}

function renderDefault(products, date = 'skip') {
    // clean feed 
    cleanFeed(feed)
    // apply filtering if provided
    let productsArrays = Array();
    if (date.toLowerCase() !== 'skip') {
        productsArrays = products.filter(
            product => product[7] === date
        )
    } else {
        productsArrays = products
    }

    // validate empty arrays
    if (productsArrays.length === 0) {
        console.log('No products found for the specified date');
        return;
    }
    
    // validate record for empty strings, spaces or test content
    if (productsArrays) {
        productsArrays.forEach( (array, index) => {
            if ( (array.includes('')) || (array.includes('test')) || (array.includes(' ')) ) {
                return
            } else {
                renderProductItem(feed, array)
            }
        })
    }
}


fetchProducts().then(products => renderDefault(products))


// Searchbar logic
let searchBar = document.querySelector(`#search-bar`)
searchBar.addEventListener('input', () => {
    const filterQuery = searchBar.value.toLowerCase()
    
    if ( (filterQuery.length === 0) ) {
        console.log(filterQuery)
        fetchProducts().then(products => renderDefault(products))
    } else {
        console.log(filterQuery)
        cleanFeed(feed)
        // fetch products and render filter
    }
})
