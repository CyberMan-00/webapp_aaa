'use strict'

const feed = document.querySelector(`#product-feed`);

async function fetchProducts() {
    
    // const FILTER_DATE = '7/12/2024';

    const response = await fetch(`https://webappaaaapi.vercel.app/p-f-all`);
    const data = await response.json();
    return data;
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

function searchInTitles(rows, query) {
    const titleIndex = 2;
    const splitQuery = query.split(' ')

    let filteredRows = rows.filter(row => {
        // Check if row[titleIndex] exists and proceed only if it's truthy
        if (row[titleIndex]) {
            return splitQuery.some(element => 
                row[titleIndex].toLowerCase().split(' ').includes(element)
            );
        }
        // If row[titleIndex] doesn't exist, return false to exclude this row
        return false;
    });

    // let filteredRows = rows.filter(row => {
        // return splitQuery.some(element => row[titleIndex]?.toLowerCase().split(' ').includes(element)) //checks if some elements frot splitQuery array is present in the title of product
        // returt splitQuery.every(element => row[titleIndex]?.toLowerCase().split(' ').includes(element)) //checks if every element frot splitQuery array is present in the title of product
        // return row[titleIndex]?.toLowerCase().split(' ').includes(query) // simple one to one search
    // });
    return filteredRows
}

function renderSearchQuery(products, searchQuery, date = 'skip') {
    // clean feed 
    cleanFeed(feed)
    // apply filtering if provided
    let productsArrays = Array();

    if (searchQuery) {
        productsArrays = searchInTitles(products, searchQuery)
    } else {
        productsArrays = products
    }

    // validate empty arrays
    if (productsArrays.length === 0) {
        // console.log('No products found for the specified filter');
        const productDiv = document.createElement('div');
        productDiv.className = 'card';
        productDiv.style.padding = '8px'
        productDiv.innerHTML = '<span> Sorry. I did not find any keyword in our database. Try another one.</span>'
        feed.appendChild(productDiv)
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

// loading products feed for the first time
fetchProducts().then(products => renderDefault(products))

// Searchbar logic
let searchBar = document.querySelector(`#search-bar`)
let searchButton = document.querySelector(`#search-button`)

searchButton.addEventListener('click', () => {
    const filterQuery = searchBar.value.toLowerCase()
    
    if ( (filterQuery.length === 0) || (filterQuery === ' ') ) {
        fetchProducts().then(products => renderDefault(products))
    } else {
        cleanFeed(feed)
        fetchProducts().then(products => renderSearchQuery(products, filterQuery))
    }
})


