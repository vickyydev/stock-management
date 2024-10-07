import React from "react";
import Home from "../components/Home/Home";
import { observer } from "mobx-react-lite";

const HomePage:  React.FC = observer(() => {
  return <Home />;
});

export default HomePage;
