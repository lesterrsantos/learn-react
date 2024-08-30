import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies";
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos tres caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);

  const { search, setSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // Para multiples inputs usar
    // const { query } = Object.fromEntries(new FormData(event.target));
    console.log(search);
    getMovies(search);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name="query"
            placeholder="Avenger, Matrix, ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando ...</p> : <Movies movies={movies}></Movies>}
      </main>
    </div>
  );
}

export default App;
