import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

import { CartContext } from "../../contexts/CartContext";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minHeight: 420,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductItem({ product }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { addProduct, cartItems, increaseItem } = useContext(CartContext);

  const isInCart = (product) => {
    return !!cartItems.find((item) => item.id === product.id);
  };

  const allergens = product.allergens
    ? Array.from(product.allergens).join()
    : "N/A";
  const badges = product.badges ? Array.from(product.badges).join() : "N/A";
  const nutrition = product.nutrition
    ? JSON.stringify(product.nutrition)
    : "N/A";
  const diets = product.diets ? Array.from(product.diets).join() : "N/A";

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
          <Typography variant="h6" component="h6">
            {product.brand || "No brand"}
          </Typography>
          <Typography variant="h6" component="h6">
            {product.category || "UNCATEGORIZED"}
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
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Diets:</Typography>
          <Typography paragraph>{diets}</Typography>
          <Typography paragraph>Allergens:</Typography>
          <Typography paragraph>{allergens}</Typography>
          <Typography paragraph>Nutrition:</Typography>
          <Typography paragraph>{nutrition}</Typography>
          <Typography paragraph>Badges:</Typography>
          <Typography paragraph>{badges}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
