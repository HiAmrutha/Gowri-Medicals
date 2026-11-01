# Gowri-Medicals

## Gowri Medicals - Version 1.0

A lightweight, responsive medical shop website built with plain HTML, CSS, and JavaScript. It uses a small dependency-free Node.js script to assemble the Netlify production folder; no framework, database, or paid services are required.

## Run locally

1. Keep `index.html`, `styles.css`, `app.js`, and the `images` folder together.
2. On Windows, open PowerShell in the project folder and run `py -m http.server 8000`, then open `http://localhost:8000` in your browser. Press `Ctrl+C` in PowerShell to stop the server. If Python is unavailable, use a local static-server extension such as Live Server in VS Code.
3. An internet connection is needed for Google Maps, the OpenFreeMap Liberty style, Photon address lookup, and OSRM route calculation. Browser location access requires HTTPS or localhost and is requested only after the customer taps **Use My Current Location**.

The order form validates entries in the browser, displays a review summary, and creates a WhatsApp message for either shop number. It does not submit data to a server, and it does not confirm orders. The customer must send the message in WhatsApp; the shop must then confirm availability and accept the request.

The shop location map and delivery location picker use MapLibre GL JS with the OpenFreeMap Liberty style. The shop map opens at the fixed shop coordinates; delivery maps load when requested and support browser GPS, map pin selection, and manual address search. Map attribution credits OpenFreeMap, OpenMapTiles, and OpenStreetMap contributors. Address search uses the public Photon geocoder and route previews use OSRM. These public services have usage policies, rate limits, and no uptime guarantee; if a delivery map or route is unavailable, the selected coordinates can still be opened as Google Maps directions. Route distance and time are estimates, not delivery promises. No live driver tracking is provided.

The header lets customers switch between English and Telugu and between dark and light themes. Both preferences are saved in the browser's local storage.

## Deploy to Netlify

The project has no framework or frontend bundler. To generate the static production site, run `npm run build` in the project folder. This creates `dist/` containing `index.html`, `styles.css`, `app.js`, and the complete `images/` folder. The build checks local HTML and CSS asset references and fails if a referenced local asset is missing.

- **Manual deploy:** drag the generated `dist` folder into Netlify's deploy area.
- **Git-connected deploy:** `netlify.toml` configures the build command as `npm run build` and the publish directory as `dist`.
- No environment variables or dependency installation are required; Node.js/npm must be available to run the build locally or on Netlify.

The site files use relative paths. For a manually uploaded site, upload the contents of `dist` (not the source project folder or its `images` folder alone). Publishing the wrong folder or omitting sibling assets such as `styles.css` is the likely cause when the deployed page appears as unstyled HTML.

## Update shop details

- Shop phone and WhatsApp numbers are in `index.html`; the WhatsApp message destination numbers are in `app.js`.
- The fixed shop address is `Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.` The official Google Maps location link, shop map display, and shop directions are in `index.html`; the fixed shop coordinates and map setup are in `app.js` (`18.3178061, 83.8949325`).
- The delivery map style URL is `https://tiles.openfreemap.org/styles/liberty` in `app.js`; no Google Maps API key or package installation is required.
- Working hours and delivery/locality information are shown in `index.html`.
- Delivery locality choices are in the manual address form in `index.html`.

## Owner and store photos

The original owner photos are included locally in `images/k-satish.png` and `images/g-srinivasa-rao.png`. The original store photos are included in `images/gowri-medicals-interior.png` and `images/gowri-medicals-storefront.png`.
