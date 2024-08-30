import "./App.css";
import { useCatImage } from "./hooks/useCatImage.js";
import { useCatFact } from "./hooks/useCatFact.js";

const CAT_PREFIX_IMAGE_URL = "https://cataas.com";
const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com/cat/says/hello";
const CAT_ENDPOINT_IMAGE_URL2 =
  "https://cataas.com/cat/says/${thirdWords}?size=50&color=red&json=true";



export function App() {
  const { fact, refreshFact } = useCatFact();
  const imageUrl = useCatImage(fact);
  

  console.log("Image ", imageUrl);
  // si usas useEffect(() => {}) sin dependencias se ejecuta cada vez que se renderice el componente

  const handleClick = async () => {
    refreshFact();
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      {/* <section> */}
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Cat recovered from first words for ${fact}`}
        ></img>
      )}
      {/* </section> */}
    </main>
  );
}
