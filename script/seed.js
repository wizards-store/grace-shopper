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
    Category.create({ name: 'Book' }),
    Category.create({ name: 'Magical' })
  ]);

  const products = await Promise.all([
    Product.create({
      name: 'Elder Wand',
      price: 199.99,
      description: 'This is the greatest wand of all time',
      inventory: 1,
      photo:
        'https://images-na.ssl-images-amazon.com/images/I/21b6ifv0QlL._SY355_.jpg'
    }).then(product => product.addCategories([categories[1], categories[4]])),

    Product.create({
      name: `Snape's Wand`,
      price: 49.99,
      description:
        'This wand belonged to a brave man and a horrible teacher, Severus Snape',
      inventory: 1,
      photo:
        'https://images-na.ssl-images-amazon.com/images/I/31S2KX7PQ7L._SX355_.jpg'
    }).then(product => product.addCategories([categories[1], categories[4]])),

    Product.create({
      name: `Hermione's Wand`,
      price: 59.99,
      description: `This wand belonged to Hermione Granger, future Minister of Magic and one of Harry's best friends`,
      inventory: 1,
      photo:
        'https://vignette.wikia.nocookie.net/harrypotter/images/0/03/Hermione_Granger_wand.png'
    }).then(product => product.addCategories([categories[1], categories[4]])),

    Product.create({
      name: 'Nimbus 2000',
      price: 699.99,
      description: `Harry's first broom`,
      inventory: 10,
      photo:
        'https://vignette.wikia.nocookie.net/harrypotter/images/0/0f/Nimbus_2000_1.jpg'
    }).then(product => product.addCategories([categories[0], categories[4]])),

    Product.create({
      name: 'Firebolt',
      price: 999.99,
      description: `The fastest racing broom in the world (as of the 3rd book)`,
      inventory: 5,
      photo:
        'https://greatgearstore.blob.core.windows.net/images/3638/enlarge/Toys-and-Models/-NN7536-Harry-Potter-Firebolt-Broom.jpg'
    }).then(product => product.addCategories([categories[0], categories[4]])),

    Product.create({
      name: 'Fantastic Beasts and Where to Find Them',
      price: 20.99,
      description: `A comprehensive description of all magical beasts, by Newt Scamander`,
      inventory: 20,
      photo:
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Fantastic_beasts.JPG/220px-Fantastic_beasts.JPG'
    }).then(product => product.addCategories([categories[3], categories[4]])),

    Product.create({
      name: 'A History of Magic',
      price: 20.99,
      description: `An extraordinarily dull history of all things magical`,
      inventory: 40,
      photo:
        'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1418350772i/23770715._UY475_SS475_.jpg'
    }).then(product => product.addCategories([categories[3], categories[4]])),

    Product.create({
      name: 'Hogwarts: A History',
      price: 20.99,
      description: `An exciting account of the history of Hogwarts School of Witchcraft and Wizardry`,
      inventory: 25,
      photo:
        'https://pre00.deviantart.net/e191/th/pre/f/2014/216/3/f/history_by_katelynphotography-d7tnsqk.png'
    }).then(product => product.addCategories([categories[3], categories[4]])),

    Product.create({
      name: 'The Sword of Gryffindor',
      price: 10000,
      description: `Once belonged to Godric Gryffindor, this sword will present itself to any worthy Gryffindor`,
      inventory: 1,
      photo:
        'http://www.medievalcollectibles.com/images/Product/large/NP-L-155.png'
    }).then(product => product.addCategories([categories[2], categories[4]])),

    Product.create({
      name: 'Mystery Object',
      price: 10,
      description: '???',
      inventory: 1
    }).then(product => product.addCategories([categories[2], categories[4]]))
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
