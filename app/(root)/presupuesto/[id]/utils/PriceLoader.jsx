import { useEffect, useState } from 'react';
import { Budget } from "@/api";

const budgetCtrl = new Budget();

const PriceLoader = ({ onPriceLoaded }) => {
  useEffect(() => {
    const getPrices = async () => {
      const precios = await budgetCtrl.getPrecios();
      onPriceLoaded(precios.data.attributes);
    }

    getPrices();
  }, [onPriceLoaded]);

  return null;
};

export default PriceLoader;
