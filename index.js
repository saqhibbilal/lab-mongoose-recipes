const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

async function manageRecipes() {
  try {
    // Connect to database
    const db = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${db.connection.name}"`);

    // Remove all recipes
    await Recipe.deleteMany();
    console.log('All recipes deleted');

    // Add one recipe
    const newRecipe = await Recipe.create({
      title: 'Pasta Carbonara',
      level: 'Amateur Chef',
      ingredients: ['Pasta', 'Eggs', 'Pancetta', 'Parmesan Cheese'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: '',
      duration: 30,
      creator: 'Chef John'
    });
    console.log(`Recipe created: ${newRecipe.title}`);

    // Insert multiple recipes
    const allRecipes = await Recipe.insertMany(data);
    allRecipes.forEach(recipe => console.log(`Inserted recipe: ${recipe.title}`));

    // Update a recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
    console.log(`Updated recipe: ${updatedRecipe.title}, duration is now ${updatedRecipe.duration} minutes`);

    // Delete a recipe
    await Recipe.deleteOne({ title: 'Carrot Cake' });
    console.log('Successfully removed Carrot Cake');

    await Recipe.find({title:'Tuduk Tuduk Chicken'});
    console.log('This is Punjab:')

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the function
manageRecipes();
