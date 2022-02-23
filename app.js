const searchFood = () => {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.meals))
}