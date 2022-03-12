const searchBtn = document.getElementById('button-search');
const searchInput = document.getElementById('search-field');

searchInput.addEventListener('keypress', function (event) {
    // event.preventDefault();
    if (event.keyCode == 13) {
        searchBtn.click();
    }
});

document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    let searchField = document.getElementById('search-field');
    let searchText = searchField.value;
    console.log(searchText);

    //clear data
    searchField.value = '';
    //error message hidden
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        //please write something to display
    }
    else {
        //load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        try {
            fetch(url)
                .then(res => res.json())
                .then(data => displaySearchResult(data.meals))

        }
        catch (error) {
            console.log(error)
        }
    }

}
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
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
}
const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0]))
}
const displayMealDetail = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
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