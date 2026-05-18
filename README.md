# S.A.K. Utility Site

Static landing page for [S.A.K. Utility](https://github.com/RandyNorthrup/S.A.K.-Utility), published at <https://sakutility.com/>.

## Project Structure

- `index.html` - single-page landing page, SEO metadata, structured data, and screenshot tour script.
- `assets/css/` - readable stylesheet source and minified production CSS.
- `assets/fonts/` - self-hosted Inter font used by the page.
- `assets/js/` - readable screenshot-tour/download script source and minified production JS.
- `assets/icons/` - favicon, Apple touch icon, and web app manifest icons.
- `assets/social/` - social preview image used by Open Graph, Twitter cards, and structured data.
- `screenshots/webp/` - optimized product screenshots used by the tour.
- `screenshots/thumbs/` - lightweight thumbnails used by the screenshot buttons.
- `robots.txt` and `sitemap.xml` - crawler entry points for `sakutility.com`.
- `site.webmanifest` - app metadata for browsers and install surfaces.
- `vercel.json` - Vercel routing, redirects, and cache headers.

After editing `assets/css/styles.css` or `assets/js/app.js`, regenerate the minified production files before publishing:

```powershell
npm exec --yes --package clean-css-cli -- cleancss -o assets/css/styles.min.css assets/css/styles.css
npm exec --yes --package terser -- terser assets/js/app.js -c -m -o assets/js/app.min.js
```
