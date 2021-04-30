import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { CartContext } from "../../contexts/CartContext";
import { formatNumber } from "../../utils/formatNumber";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: 345,
  },
  media: {
    height: 140,
  },
});

export default function ProductItem({ product }) {
  const classes = useStyles();

  const { addProduct, cartItems, increaseItem } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image=""
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.brand}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isInCart(product) && (
          <Button
            size="small"
            variant="outlined" 
            color="primary"
            onClick={() => increaseItem(product)}
          >
            Add more
          </Button>
        )}

        {!isInCart(product) && (
          <Button
            size="small"
            variant="outlined" 
            color="primary"
            onClick={() => addProduct(product)}
          >
            Add to cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
