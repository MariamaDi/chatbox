"use client";
import Child from "./child";
import { useState } from "react";
const Parent = () => {
  //const nom = "nom";
  const [noms] = useState("leNom");
  const prenom = "LePrenom";
  const [time, setTime] = useState(new Date());
  return (
    <div>
      <h2>Parent</h2>
      <Child nom={noms} prenom={prenom} setTime={setTime} />
      <p>date: {time.toISOString()}</p>
    </div>
  );
};
export default Parent;
