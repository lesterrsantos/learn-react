# learn-react
react project


# Pasos para crear un projecto react desde cero sin usar la opcion vitae y luego React:

1- npm create vite@latest seleccionar Vanilla y luego JavaScript y pnerle nombre al proyecto
2- cd nombre del proyecto
3- npm i @vitejs/plugin-react -E
4- npm i react react-dom -E
5- crear fichero para configuracion de vite 'vite.config.js' con el siguiente contenido:

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

6- ir a main.js y cambiarle la extension a main.jsx y copiar el siguiente contenido:

```
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("app"));

root.render(<h1>Hello, world!</h1>);
```

7- ir a index.html y modificar main.js por main.jsx
8- npm run dev
9- npm i standard -D
