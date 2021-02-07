document.getElementById('search').addEventListener('click', function(){
    const inputMealName = document.getElementById('input-meal-name').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMealName}`)
    .then(res => res.json())
    .then(data => {
        const foodItems = document.getElementById('food-items');
        data.meals.forEach(foodItem => {
        const foodItemDiv = document.createElement('div');
        
        foodItemDiv.className = "card";
        const foodItemInfo = `
            <img src="${foodItem.strMealThumb}" onClick="displayMealDetails(${foodItem.idMeal})">
            <h4 onClick="displayMealDetails(${foodItem.idMeal})">${foodItem.strMeal}</h4>
        `;
        foodItemDiv.innerHTML = foodItemInfo;
        foodItems.appendChild(foodItemDiv);
        });
    })
    .catch(error => {
        console.log(error);
        const foodItems = document.getElementById('food-items');
        const notFound = document.createElement('h1');
        notFound.innerHTML = `Your Search Item Not Found`;
        foodItems.appendChild(notFound);
    })
})

const displayMealDetails = foodItemlist => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItemlist}`)
    .then(res => res.json())
    .then(data => {
        const foodItemDetails = document.getElementById('food-item-details');
        const foodDetails = document.createElement('div')
        foodDetails.innerHTML = `
        <img src="${data.meals[0].strMealThumb}">
        <h1>${data.meals[0].strMeal}</h1>
        <br>
        <h3>Ingredients</h3>
        <br>
        <p> >  ${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</p>
        <p> >  ${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</p>
        <p> >  ${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</p>
        <p> >  ${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</p>
        <p> >  ${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</p>
        <p> >  ${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</p>
        `;
        foodDetails.className = "food-details";
        foodItemDetails.appendChild(foodDetails);
    })
}