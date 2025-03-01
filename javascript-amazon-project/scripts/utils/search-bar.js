
export function checkInList(products, searchValue) {
    const lowerSearchValue = String(searchValue).toLowerCase()
    const searchKeysList = lowerSearchValue.split(" ");
    const searchedProducts = []
    for (let i=0; i < products.length; i++) {
        const product = products[i]
        const isKeyword = keywords(product.keywords, searchKeysList)
        const isName = keywords(product.name.toLowerCase().split(" "), searchKeysList)
        if (isName) {
            searchedProducts.push(product)
        } else if (isKeyword === true) {
            searchedProducts.push(product)
        } else if (searchValue === product.id) {
            searchedProducts.push(product)
        }
    }
    return searchedProducts
}
function keywords(keywords, valueList) {
    let isIn = false;
    valueList.forEach(value => {
        keywords.forEach(keyword => {
            if (value.includes(keyword)) {
                isIn = true
            }
        })
        return isIn
    })
    return isIn
}
function getSearchValues(products, searchValue) {
    const searchedProducts = checkInList(products, searchValue)
    return searchedProducts
}

export function searchBar(products) {
    document.querySelector('.search-bar').addEventListener('keyup', (event) =>{
        const searchValue = String(document.querySelector('.search-bar').value);
        
        document.querySelector('.js-search-link').setAttribute('href', `amazon.html?search=${searchValue}`);

        if (event.key === 'Enter') {
            document.querySelector('.js-search-link').click();
        }

        const searchResultsElem = document.getElementById('search-results');
        let searchResultsHtml = '';
        
        const searchedProducts = getSearchValues(products, searchValue)

        if (searchValue && searchedProducts.length > 0) {
            searchResultsElem.style.display = 'block';
            
            searchedProducts.forEach(product => {
                searchResultsHtml += `<p>
                    <a class="search-links" href="amazon.html?search=${product.id}">${product.name}</a>
                </p>`
            })
            searchResultsElem.innerHTML = searchResultsHtml;
        } else {
            searchResultsElem.style.display = 'none';
        }
    })
}
