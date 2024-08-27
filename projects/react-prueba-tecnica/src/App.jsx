import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com/cat/says/hello";
const CAT_ENDPOINT_IMAGE_URL2 =
  "https://cataas.com/cat/says/${thirdWords}?size=50&color=red&json=true";

export function App() {
  const [fact, setFact] = useState("cat fact");
  const [imageUrl, setImageUrl] = useState();

  // no puedes usar React Query, SWR, axios, apollo
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []); //ejecutar solo la primera vez

  // si usas useEffect(() => {}) sin dependencias se ejecuta cada vez que se renderice el componente

  useEffect(() => {
    if (!fact) return;

    const firstWord = fact.split(" ")[0];
    const thirdWords = fact.split(" ").slice(0, 3).join(" ");
    console.log(firstWord);
    console.log(thirdWords);

    // fetch(CAT_ENDPOINT_IMAGE_URL)
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log(response);
    //     const { url } = response;
    //     setImageUrl(url);
    //   });
    fetch(`https://cataas.com/cat/says/${thirdWords}?size=50&color=red`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = url;
        // document.body.appendChild(img);
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching cat image:", error);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`Cat recovered from first words for ${fact}`}
          ></img>
        )}
      </section>
    </main>
  );
}
