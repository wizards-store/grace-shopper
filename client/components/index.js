/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './Navbar';
export { default as AllProducts } from './AllProducts';
export { default as SingleProduct } from './SingleProduct';
export { default as GeneralHome } from './GeneralHome';
export { default as UserHome } from './user-home';
export { default as CartForm } from './CartForm';
export { default as CartList } from './CartList';
export { Login, Signup } from './AuthForm';
