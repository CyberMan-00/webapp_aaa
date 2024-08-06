// 'use strict'
// const { API_KEY } = require('./script.js');
// const { SPREADSHEET_ID } = require('./script.js');
// const { RANGE } = require('./script.js');


// document.getElementById('search-bar').addEventListener('input', function() {
//     const query = this.value.toLowerCase();
//     if (query) {
//         fetchResults(query);
//     } else {
//         clearResults();
//     }
// });

// function fetchResults(query) {
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const rows = data.values;
//             console.log(rows)
//             const matchingItems = searchInTitles(rows, query);
//             displayResults(matchingItems);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// }

// function searchInTitles(rows, query) {
//     const TITLE_COLUMN_INDEX = 2; // Assuming the TITLE column is the first one
//     return rows.filter(row => row[TITLE_COLUMN_INDEX]?.toLowerCase().includes(query));
// }

// function displayResults(results) {
//     const productList = document.getElementById('product-feed');
//     clearResults();

//     results.forEach(product => {
        
//         if (product.length < 9 || product.includes("")) {
//             console.log("product has undedfined fields", product)
//             return
//         }

//         const [
//             product_url, 
//             product_img_url, 
//             product_title, 
//             product_currency, 
//             product_old_price, 
//             product_new_price, 
//             product_discount, 
//             data_date_part, 
//             data_timestamp_part
//         ] = product;

//         const productDiv = document.createElement('div');
//         productDiv.className = 'product-item';

//         productDiv.innerHTML = `

//             <a href="${product_url}" class="card">
            
//             <div class="card__content">

//                 <div class="card__content__img"><img src="${product_img_url}" alt="#"></div>

//                 <div class="card__content__percent">
//                     <div class="card__content__percent__sign">-</div>
//                     <div class="card__content__percent__digit">${product_discount}</div>
//                     <div class="card__content__percent__sign">%</div>
//                 </div>

//                 <div class="card__content__title">${product_title}</div>
                
//                     <div class="card__content__price">
//                         <div class="card__content__price__new">
//                             <div class="card__content__price__new__digit">${product_new_price}</div>
//                             <div class="card__content__price__new__currency">${product_currency}</div>
//                         </div>
//                         <div class="card__content__price__old">
//                             <div class="card__content__price__old__digit">${product_old_price}</div>
//                             <div class="card__content__price__old__currency">${product_currency}</div>
//                         </div>
//                     </div>

//                     <div class="button">Open Deal</div>
//                     <div class="card__content__date">Offer Date: ${data_date_part}</div>
//                 </div>  
//             </a>
//         `;
//             // ${imageUrl ? `<img src="${imageUrl}" alt="${name}">` : ''}

//         productList.appendChild(productDiv);
//     });
// }

// function clearResults() {
//     const productList = document.getElementById('product-item');
//     productList.innerHTML = '';
// }