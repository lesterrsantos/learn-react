import React from "react";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
import { useState } from "react";

export function App() {
  const [name, setName] = useState("midudev");

  const formatUserName = (userName) => `@${userName}`;

  const formattedUserName = <span>@midudev</span>;

  console.log("render with name: ", name);

  const midudev = {
    userName: "midudev",
    name: "Miguel Angel Duran",
    initialIsFollowing: true,
  };
  return (
    <section className="App">
      <TwitterFollowCard {...midudev}>Miguel Angel Duran</TwitterFollowCard>

      <TwitterFollowCard userName="pheralb" name="Pablo Hernandez">
        Pablo Hernandez
      </TwitterFollowCard>

      {/* Hacer comentarios dentro de Jsx */}

      <TwitterFollowCard userName="vxnder" name="Vanderhart">
        Vanderhart
      </TwitterFollowCard>

      <button onClick={() => setName("pedromichel")}>Cambio Nombre</button>
    </section>
  );
}
