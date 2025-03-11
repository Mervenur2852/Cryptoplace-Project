import { createContext, useEffect, useState } from "react";
import api from "../utils/api";

const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  // statler
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  // api den coinleri alan fonksiyon

  const fetcAllCoin = () => {
    api
      .get("/coins/markets", { params: { vs_currency: currency.name } })
      .then((res) => setAllCoin(res.data))
      .catch((err) => {
        alert("coin verilerini alırken hata oldu", err);
      });
  };
  useEffect(() => {
    fetcAllCoin();
  }, [currency]);

  const contextValue = { currency, allCoin, setCurrency };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export { CoinContextProvider, CoinContext };
