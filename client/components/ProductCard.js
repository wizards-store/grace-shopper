import React, { Component } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';

const ProductCard = (props) => {
  const { product,
          user,
          list,
          handleDelete,
          handleAddClick,
          handleSubtractClick } = props;
  return (
    <Card>
      <Image src={product.photo} />
      <Card.Content>
        <button
          onClick={() => {
            handleDelete(product);
          }}
          className="negative mini ui right floated button"
        >
          X
        </button>
        <Card.Header>{product.name}</Card.Header>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>

      { props.for === 'cartlist' ?
        (
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {user.id ? list[product.id] : list[product.id].quantity}
            </a>
            <hr />
            <Button
              onClick={() => handleSubtractClick(product)}
              color="red"
            >
              -
            </Button>
            <Button
              onClick={() => handleAddClick(product)}
              color="teal"
            >
              +
            </Button>
            <hr />
            <a>
              <Icon name="user" />
              {user.id
                ? product.price * list[product.id]
                : product.price * list[product.id].quantity}
            </a>
          </Card.Content>
        ) : null
      }

    </Card>
  );
};

export default ProductCard;
