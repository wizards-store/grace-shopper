// import React, { Component } from 'react';
// import { Button, Card, Icon, Image } from 'semantic-ui-react';

// function CartItem (props) {
//   const {
//     product,
//     cart,
//     item,
//     handleClick,
//     handleSubtractClick,
//     handleAddClick,
//   } = props;

//   return (
//     <Card>
//       <Image src={product.photo} />
//       <Card.Content>
//         <button
//           onClick={() => handleClick(product)}
//           className="negative mini ui right floated button"
//         >
//           X
//         </button>
//         <Card.Header>{product.name}</Card.Header>
//         <Card.Meta>{product.createdAt}</Card.Meta>
//         <Card.Description>{product.description}</Card.Description>
//       </Card.Content>

//       <Card.Content extra>
//         <a>
//           <Icon name="user" />
//           {cart[item]}
//         </a>
//         <hr />
//         <Button onClick={() => handleSubtractClick(product)} color="red">
//           -
//         </Button>
//         <Button onClick={() => handleAddClick(product)} color="teal">
//           +
//         </Button>
//         <hr />
//         <a>
//           <Icon name="user" />
//           {product.price * cart[item]}
//         </a>
//       </Card.Content>
//     </Card>
//   );
// }

// export default CartItem;
