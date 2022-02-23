const searchFood = async () => {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    console.log(searchText);

    //clear data
    searchField.value = '';
    if (searchText == '') {
        //please write something to display
    }
    else {
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        //async and await system replacement of fetch process
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals)

        /* fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals)) */
    }


}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    //clear data
    searchResult.textContent = '';
    if (meals.length == 0) {

    }
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 500)}</p>
                </div>
        `;
        searchResult.appendChild(div);

    })
}//async and await
const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])


    /*     fetch(url)
            .then(res => res.json())
            .then(data => displayMealDetail(data.meals[0])) */
}
const displayMealDetail = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    
    <div class="m-3">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-warning">Watch</a>
    </div>
    </div>
    `;
    mealDetails.appendChild(div);
}