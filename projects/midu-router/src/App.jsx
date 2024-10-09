import { Suspense, lazy } from "react";

// import HomePage from "./pages/Home.jsx";
// import AboutPage from "./pages/About.jsx"; //import estatico
import Page404 from "./pages/404.jsx";
import SearchPage from "./pages/Search.jsx";

import { Router } from "./Router.jsx";
import { Route } from "./Route.jsx";

const LazyAboutPage = lazy(() => import("./pages/About.jsx")); // lazy loading
const LazyHomePage = lazy(() => import("./pages/Home.jsx"));

const appRoutes = [
  // {
  //   path: "/",
  //   Component: HomePage,
  // },
  // {
  //   path: "/about",
  //   Component: AboutPage,
  // },
  // {
  //   path: "/twitch",
  //   Component: () => <h1>Nuevo Twitch</h1>,
  // },
  {
    path: "/search/:query",
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading ... </div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage}></Route>
          <Route path="/about" Component={LazyAboutPage}></Route>
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
