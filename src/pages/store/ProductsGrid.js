import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function ProductsGrid(props) {
  const classes = useStyles();
  const products = props.products;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={6}>
            <Paper id={product.id} className={classes.paper}>{product.name}</Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
