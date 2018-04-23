/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User } = require('../server/db/models');
const { Product, Category } = require('../server/db/models');

async function seed () {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'guest@guest.com', password: 'null' }),
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ]);

  const categories = await Promise.all([
    Category.create({ name: 'Broom' }),
    Category.create({ name: 'Wand' }),
    Category.create({ name: 'Misc' }),
    Category.create({ name: 'Wooden' }),
    Category.create({ name: 'Magical' })
  ]);

  const products = await Promise.all([
    Product.create({
      name: 'Elder Wand',
      price: 199.99,
      description: 'This is the greatest wand of all time',
      inventory: 5,
      photo:
        'https://images-na.ssl-images-amazon.com/images/I/21b6ifv0QlL._SY355_.jpg'
    }).then(product => product.addCategories([2, 4, 5])),
    Product.create({
      name: 'Nimbus 2000',
      price: 699.99,
      description: 'This is the greatest broomstick of all time',
      inventory: 3,
      photo:
        'https://vignette.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg/revision/latest?cb=20150530185551'
    }).then(product => product.addCategories([1, 4, 5])),
    Product.create({
      name: 'Mystery Object',
      price: 10,
      description: '???',
      inventory: 1
    }).then(product => product.addCategories([3, 5]))
  ]);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${categories.length} categories`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
