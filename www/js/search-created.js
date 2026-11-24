const searchInput = document.getElementById('searchcreated');

const SearchCreated = debounce(async () => {
    const query = searchInput.value.trim();
    const results = await searchEventsFromUser(query, getUserId());
    renderResults(results);
}, 300);

searchInput.focus();

searchInput.addEventListener('input', SearchCreated);