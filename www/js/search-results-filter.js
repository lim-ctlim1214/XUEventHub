const categoryNode = document.getElementById('category');
const searchInput = document.getElementById('searchbar');

async function setAllCategories() {
    let categories = await grabAllCategories();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.category_id;
        option.text = category.category_name;
        categoryNode.appendChild(option);
    });
}

const onSearch = debounce(async () => {
    const query = searchInput.value.trim();
    const results = await searchEventsByCategory(query, categoryNode.value);
    renderResults(results);
}, 300);

searchInput.addEventListener('input', onSearch);
categoryNode.addEventListener('change', onSearch);

setAllCategories();
onSearch();