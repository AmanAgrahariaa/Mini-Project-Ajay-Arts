// Get reference to the 'Add Ingredients' button
let addIngredientsBtn = document.getElementById('addIngredientsBtn');

// Get reference to the ingredient list container
let ingredientList = document.querySelector('.ingredientList');

// Get reference to the first ingredient div
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

// Add a click event listener to the 'Add Ingredients' button
addIngredientsBtn.addEventListener('click', function(){
  // Clone the first ingredient div along with its content
  let newIngredients = ingredeintDiv.cloneNode(true);

  // Clear the value of the input field in the cloned ingredient div
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';

  // Append the cloned ingredient div to the ingredient list container
  ingredientList.appendChild(newIngredients);
});
