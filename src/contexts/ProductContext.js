// Product context implementation. For more info: [Context] https://reactjs.org/docs/context.html

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/products`);

      setProducts(data);
    }

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
