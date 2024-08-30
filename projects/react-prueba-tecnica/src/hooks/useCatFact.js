import { useState, useEffect } from "react";
import { getRandomFact } from "../services/facts.js";

export function useCatFact() {
  const [fact, setFact] = useState("cat fact");
  // no puedes usar React Query, SWR, axios, apollo
  // para recuperar la cita al cargar la pagina

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  };

  useEffect(refreshFact, []); //ejecutar solo la primera vez

  return { fact, refreshFact };
}
