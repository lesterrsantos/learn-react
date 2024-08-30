import { useState, useEffect } from "react";

export function useCatImage({ fact }) {
  const [imageUrl, setImageUrl] = useState();

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

  return { imageUrl };
}