import { useState, useEffect } from "react";
import { addCoinToPortfolio, addToPortfolioSQL, deleteCoinFromPortfolio, getPortfolio, getPortfolioSQL, updateCoin, updatePortfolioSQL } from "./BalanceOperations";
import { db } from "./constants";
export function usePortfolio() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    refreshPortfolio();
  }, []); // Note! Run this effect whenever the selectedList changes.

  async function refreshPortfolio(): Promise<void> {
      const portfolioData = await getPortfolio(getPortfolioSQL)
      //@ts-ignore
      setPortfolio(portfolioData);
  }

  async function updatePortfolio(coinId:string, value:number): Promise<void> {
    await updateCoin(updatePortfolioSQL,value,coinId);
    await refreshPortfolio();
  }

  async function addToPortfolio(value: number, coinId:string): Promise<void> {
    await addCoinToPortfolio(addToPortfolioSQL,value, coinId);
    await refreshPortfolio();
  }

  async function deleteFromPortfolio(coinId:string): Promise<void> {
    await deleteCoinFromPortfolio(addToPortfolioSQL, coinId);
    await refreshPortfolio();
  }

  return {
    portfolio,
    addToPortfolio,
    updatePortfolio,
    deleteFromPortfolio
  };

}
