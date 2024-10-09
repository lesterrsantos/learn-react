import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Router } from "./Router.jsx";
import { getCurrentPath } from "./utils.js";
import { Route } from "./Route.jsx";
import { Link } from "./Link.jsx";

// para hacer test usar npm i vitest -D
// ir al package.json y agregar "test": "vitest" y "test:ui": "vitest --ui" en scripts key
// instalar npm i happy-dom @testing-library/react -D
// npm install --save-dev @vitest/ui
// npm i --save-dev @testing-library/dom
// modificar vite.config.js y agregar test: { environment: 'happy-dom'}

vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Test example", () => {
  it("should work", () => {
    expect(1).toBe(1);
  });
});

describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render without problems", () => {
    render(<Router routes={[]}></Router>);
    expect(true).toBeTruthy();
  });

  it("should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}></Router>);
    console.log(screen.debug());
    expect(screen.getByText("404")).toBeTruthy();
  });

  it("should render the component of the first route thath matches", () => {
    getCurrentPath.mockReturnValue("/about");
    const routes = [
      {
        path: "/",
        Component: () => <h1>Home</h1>,
      },
      {
        path: "/about",
        Component: () => <h1>About</h1>,
      },
    ];
    render(<Router routes={routes}></Router>);
    console.log(screen.debug());
    expect(screen.getByText("About")).toBeTruthy();
  });

  it("should navigate usin Links", async () => {
    getCurrentPath.mockReturnValueOnce("/");
    render(
      <Router>
        <Route
          path="/"
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link to="/about">About</Link>
              </>
            );
          }}
        ></Route>
        <Route path="/about" Component={() => <h1>About</h1>}></Route>
      </Router>
    );

    //Click on the link
    const button = screen.getByText("About");
    fireEvent.click(button)

    const aboutTitle = await screen.findByText("About")
    expect(aboutTitle).toBeTruthy();
  });
});
