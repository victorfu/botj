# Botj

J is a bot that helps you to automate your tasks. It is a desktop application built with Electron tested on Windows 10/11, macOS and Ubuntu.

## Development

### Install

```bash
npm install
```

### Run

```bash
npm start
```

## Start From Scratch

1. Generate from boilerplate by [electron forge](https://www.electronforge.io)

```bash
npm init electron-app@latest my-new-app -- --template=webpack-typescript
```

2. Create your own app icons by following the instructions in [Custom App Icons](https://www.electronforge.io/guides/create-and-add-icons).

3. Create your own tray icon by using [Tray](https://www.electronjs.org/docs/latest/tutorial/tray) as follows:

```javascript
import { app, Tray, Menu, nativeImage } from "electron";

let tray;

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath("path/to/asset.png");
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      type: "normal",
      click: () => {
        console.log("Open clicked");
      },
    },
    { type: "separator" },
    {
      label: "Exit",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
});
```

However, Tray does not work as expected if png files are not loaded correctly. Use the plugin `copy-webpack-plugin` to load png files.

First, install `copy-webpack-plugin`.

```bash
npm install copy-webpack-plugin --save-dev
```

In `webpack.plguins.js`, add the following configuration:

```javascript
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";

const assets = ["images"];

const copyPlugins = assets.map((asset) => {
  return new CopyWebpackPlugin({
    patterns: assets.map((asset) => ({
      from: path.resolve(__dirname, "src/assets", asset),
      to: path.resolve(__dirname, ".webpack/renderer", asset),
    })),
  });
});


export const plugins = [
  ..., /* other plugins */
  ...copyPlugins,
];
```

Add the following configuration in `app.whenReady().then(() => { ... })`:

```javascript
let tray;
app.whenReady().then(() => {
  // ...

  const filePath = path.join(
    app.getAppPath(),
    ".webpack/renderer",
    "images/tray.png",
  );
  const icon = nativeImage.createFromPath(filePath);
  tray = new Tray(icon);
});
```

4. Integrate with [React](https://reactjs.org/). The documentation is available at [React with Electron](https://www.electronforge.io/guides/framework-integration/react-with-typescript).

5. Use `react-router-dom` to navigate between pages. Please note that the `BrowserRouter` does not work in Electron. Use `HashRouter` instead. Example code is as follows:

```javascript
import { createRoot } from "react-dom/client";
import { createHashRouter, Link, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element:
      <div>
        Home Page <Link to="/about">Home</Link>
      <div/>,
  },
  {
    path: "/about",
    element: (
      <div>
        About Page <Link to="/">Home</Link>
      </div>
    ),
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
```

6. (Optional) If you would like to use `keyboard shortcuts` in your application, go to this [document](https://www.electronjs.org/docs/latest/tutorial/keyboard-shortcuts) for more information.
