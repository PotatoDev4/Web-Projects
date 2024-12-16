import { products } from "../../data/products.js";



export function searchBar(searchedProducts) {
    document.querySelector('.search-bar').addEventListener('keyup', (event) =>{
        const searchValue = document.querySelector('.search-bar').value;
        document.querySelector('.js-search-link').setAttribute('href', `amazon.html?search=${searchValue}`);

        if (event.key === 'Enter') {
            document.querySelector('.js-search-link').click();
        }

        const searchResultsElem = document.getElementById('search-results');
        let searchResultsHtml = '';
        
        function searchTab() {
            if (searchValue) {
                searchResultsElem.style.display = 'block';
                products.forEach(product => {
                    product.keywords.forEach(keyword => {
                        searchResultsHtml += `<p>${keyword}</p>`  
                    })
                });
                searchResultsElem.innerHTML = searchResultsHtml;
            } else {
                searchResultsElem.style.display = 'none';
            }
                    
        }
        searchTab();

        const matchingKeywords = [];
        products.forEach(product => {
            product.keywords.forEach(keyword => {
                if (keyword.includes(searchValue)) {
                    if (!(keyword in matchingKeywords)) {
                        matchingKeywords.push(keyword);
                    }
                }
            });
        });
        console.log(matchingKeywords);  
    })
}
