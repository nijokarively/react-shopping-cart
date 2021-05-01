// import Layout from '../../components/Layout';

import React, { createContext, useState, useEffect } from "react";
import { apiGET } from "./utils/fetch";
import ProductsGrid from "./ProductsGrid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function getLastWord(words) {
  var n = words.lastIndexOf(" ");

  var res = words.substring(n);
  return res.trim();
}

const Store = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageCounter, setPageCounter] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data = await apiGET("products", {
        limit: 10,
        filters: filters,
      });
      setProducts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadPrevPage = () => {
    const newPageCounter = pageCounter > 0 ? pageCounter - 1 : 0;
    setLoading(true);
    refreshData(filters, newPageCounter);
    setPageCounter(newPageCounter);
  };

  const loadNextPage = () => {
    const newPageCounter = pageCounter + 1;
    setLoading(true);
    refreshData(filters, newPageCounter);
    setPageCounter(newPageCounter);
  };

  async function refreshData(customFilters, counter) {
    const data = await apiGET("products", {
      limit: 10,
      skip: counter * 10,
      filters: customFilters,
    });
    setProducts(data);
    setLoading(false);
  }

  const searchProducts = () => {
    console.log("Searching");
    const inputData = document.getElementById("search-box").value;

    // TODO: logic to split filter Apples, >= 50 calories, Vegan
    const parsedFilters = inputData.split(", ");

    var customFilters = {};
    parsedFilters.forEach((el, index) => {
      if (index === 0) {
        customFilters["name"] = el;
      } else {
        const lastWord = getLastWord(el);
        console.log(lastWord);
        if (
          [
            "calories",
            "protein",
            "totalFat",
            "fiber",
            "sugar",
            "saturatedFat",
          ].includes(lastWord)
        ) {
          customFilters["nutrition." + lastWord] = el
            .replace(lastWord, "")
            .trim();
        } else {
          customFilters["diets"] = el;
        }
      }
    });

    refreshData(customFilters, pageCounter);
    setFilters(customFilters);
  };

  if (!isLoading) {
    console.log(products);
  }

  return (
    <div>
      <div>
        <div className="text-center mt-5">
          <h1>Store</h1>
          <p>This is the Store Page.</p>
        </div>
        <form noValidate autoComplete="off">
          <TextField
            id="search-box"
            label="Search our inventory"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Button
                  variant="outlined"
                  onClick={() => {
                    searchProducts();
                  }}
                >
                  SEARCH
                </Button>
              ),
            }}
          />
        </form>
        {pageCounter > 0 ? (
          <Button
            variant="outlined"
            onClick={() => {
              loadPrevPage();
            }}
          >
            Prev Page
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            Prev Page
          </Button>
        )}
        {products.total - products.skip >= products.limit ? (
          <Button
            variant="outlined"
            onClick={() => {
              loadNextPage();
            }}
          >
            Next Page
          </Button>
        ) : (
          <Button variant="outlined" disabled>
            Next Page
          </Button>
        )}
        {!isLoading ? (
          <ProductsGrid products={products.result} />
        ) : (
          <>
            <h1> We are loading our product onto the shop floor</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Store;
