# Copilot / AI Agent Instructions — Dreamgreen (시흥꿈에그린)

Purpose: short, actionable guidance so an AI can be immediately productive in this repository.

- **Big picture**: this is a small static, client-side app. HTML pages (`index.html`, `app.html`) drive the UI and `app.js` contains the app logic. Data is stored in `data.json` (staff -> sections -> tasks). Images are served from `images/metrics##/` and referenced via a raw GitHub URL (`GITHUB_BASE_URL` in `app.js`). There is no build step.

- **Key files**:
  - `index.html` — landing page and staff links.
  - `app.html` + `app.js` — main application: loads `data.json` and `colors.json`, renders tasks, search, cycle modals, and image modal.
  - `data.json` — authoritative task data (staff names are top-level keys; add staff here to add pages).
  - `colors.json` — mapping of cycle -> color used by the UI.
  - `images/metrics01/`, `images/metrics02/` — image folders (filenames use Korean text and spaces; `app.js` encodes them).

- **Important runtime patterns** (copy/paste function names to locate implementation):
  - Data loading: `loadData()` in `app.js` (fetches `data.json` and `colors.json`).
  - Image detection: `generateImageUrls()`, `checkImageExists()`, `findExistingImage()`, `detectAllImages()` — algorithm uses HEAD requests with a 2s timeout, caches results in `imageCache`, and checks multiple extensions in priority order.
  - UI navigation: `navigateToStaff()` (uses `app.html?staff=<name>`). Default staff is `'민희진'` if none provided.
  - Search: input handler `handleSearch()` scans `allData` for matches in `task` and `note`.

- **File / naming conventions** discovered from code:
  - Image file names follow `평가지표 <NN>-<M>.<ext>` inside `images/metrics<NN>/` (example: `평가지표 01-1.jpg`). `app.js` calls `encodeURIComponent` when building URLs — keep spaces/Korean characters unchanged in source names.
  - Staff names are keys in `data.json` and used verbatim in query string `staff` param; adding a new staff requires both `data.json` and an entry in `index.html` (or linking directly to `app.html?staff=...`).

- **Performance / network behavior to preserve**:
  - Image detection uses parallel batches limited by `MAX_CONCURRENT_REQUESTS = 6` and stops early if a batch finds nothing after prior hits — preserve this when editing image logic.
  - `checkImageExists()` performs `fetch(..., { method: 'HEAD' })` with a 2s AbortController timeout and caches booleans in `imageCache`.

- **Developer workflows** (no build system):
  - Run locally with a static server. Examples:
    - Python 3: `python -m http.server 8000`
    - Node (serve): `npx serve .`
  - Edit `data.json` to change tasks; edit `images/metrics##/` to add images. After changes, refresh the browser.

- **When changing images**:
  - Push images under `images/metricsNN/` and use the exact filename pattern `평가지표 NN-M.ext`. The code checks `jpg`, `png`, `jpeg` (case variants) in priority; filenames with spaces/Korean must be URL-encoded by the browser — `app.js` already does this.
  - Ensure `GITHUB_BASE_URL` (in `app.js`) points to the correct raw branch (currently `main`). If you change branch or hosting, update this constant.

- **Editing data and UI**:
  - Add/remove tasks by modifying `data.json`'s staff arrays. The renderer expects each staff entry to be an array of sections with `title` and `data` arrays (items contain `task`, `note`, `cycle`, `baseCycle`).
  - Colors are read from `colors.json` and mapped by cycle names (e.g., `매일`, `월 1회`). Update `colors.json` for new cycles.

- **Testing / debugging tips**:
  - To reproduce image-detection behavior, open devtools Network tab and watch `HEAD` requests to `raw.githubusercontent.com/.../images/metricsXX/...`.
  - If images don't appear, check file encoding / URL-encoding and branch in `GITHUB_BASE_URL`.
  - Search behavior is purely client-side; to test, run `app.html` with different `staff` query params.

- **Do NOT change without verification**:
  - Don't change the `IMAGE_EXTENSIONS` order without reason — it affects which extension is favored and perceived performance.
  - Avoid removing the AbortController timeout or the `imageCache` — these are deliberate for reliability.

If anything above is unclear or you want more details (examples of `data.json` edits, a short test harness, or adding unit tests), tell me which area to expand and I will iterate.
