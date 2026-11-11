



const categoryNode = document.getElementById('category');

async function setAllCategories(){
    let categories = await grabAllCategories()
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.category_id;
        option.text = category.category_name;
        categoryNode.appendChild(option);
    })

}

setAllCategories();

document.getElementById('searchbar').addEventListener('input', search);

function search(){
    debounce(async (e) => {
        const query = e.target.value.trim();
        const results = query ? await searchEventsByCategory(query, categoryNode.value) : await grabAllEvents()
        renderResults(results);
    }, 300)
}