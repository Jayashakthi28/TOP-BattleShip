import Ship from "./Ship";
import { useContext } from "react";
import { shipData } from "./Main";

export default function Shipcont() {
  const { state } = useContext(shipData);
  const staticShips=state.staticShips;
  const staticShiparr = [];
  for (let key in staticShips) {
    staticShiparr.push(staticShips[key]);
  }
  return (
    <div className="ship-cont">
      {staticShiparr.map((e, i) => (
        <Wrapper data={e} key={i} />
      ))}
    </div>
  );
}

const Wrapper = ({ data }) => {
  return (
    <div className="wrapper">
      {data.map((t, i) => (
        <Ship key={i} data={t} />
      ))}
    </div>
  );
};
