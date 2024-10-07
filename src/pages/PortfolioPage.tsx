import React from "react";
import Portfolio from "../components/Stocks/Portfolio";
import { observer } from "mobx-react-lite";

const PortfolioPage:  React.FC = observer(() => {
  return <Portfolio />;
});

export default PortfolioPage;
