const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailContent = document.querySelector('.recipe-detail-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


const fetchRecipe = async (query) =>{
   recipeContainer.innerHTML=`<h1 class="notfound">Fetching Recipe...</h1><br>`;
   try{
    const  data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();

    recipeContainer.innerHTML="";
   response.meals.forEach(meal => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    
    `
    const button =document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);

        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

    recipeContainer.appendChild(recipeDiv);
});
   }
   catch(error){
    recipeContainer.innerHTML=`<h1 class="notfound">Error Recipe Not Found...</h1><br>
    <img src="noimg.png">`
   }
}
const fetchIngredient = (meal) => {
    let ingredientsList ="";
    for(let i=1;i<=20;i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li> ${measure}${ingredients}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
const openRecipePopup = (meal) => {
    recipeDetailContent.innerHTML=`
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3 class="recipeinstruction">Ingredents</h3>
    <ul>${fetchIngredient(meal)}</ul>
    <div>
        <h3>Instructions:</h3>
        <p> ${meal.strInstructions}</p>
    </div>
    `
    recipeDetailContent.parentElement.style.display="block";
}
searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h1 class="notfound">Type the meal in the search box.</h1>`;
        return;
    }
    fetchRecipe(searchInput); 
});
recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailContent.parentElement.style.display="none";
})
