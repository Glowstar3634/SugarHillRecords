# Sugar Hill Records — Website Concept V1.2
**Designed and developed by Nova Travis**  
October 2026

This is a fully navigable, responsive, static website concept. The **homepage is implemented in full**, and the remaining five main routes are intentionally sparse placeholders, ready for subsequent development and content approval.

## Run it

1. Unzip the folder.
2. Open `index.html` directly in a browser; all internal links work as relative paths.
3. For development, run `python -m http.server 8000` **from inside this folder**, then visit `http://localhost:8000/`.
4. The directory-based routes (`/timeline/`, `/music/`, `/artists/`, `/archives/`, `/legacy/`) also work on GitHub Pages. Trailing slashes are intentional. For a project-site deployment, keep every file under the same repository root.

Some editorial photography and Google Fonts are referenced from remote providers. You need an internet connection for those to load. The interface has local font fallbacks and designed image fallbacks.

## Architecture

```
sugar-hill-v1/
├── index.html            # Full seven-section homepage
├── style.css             # Responsive styles, animations, visual components
├── script.js             # Shared navigation + record/archive/artist interactions
├── siteData.js           # Centralized editable content registry
├── assets/
│   ├── images/
│   │   └── hero-turntable.webp
│   └── PHOTO_CREDITS.md
├── timeline/index.html   # Placeholder
├── music/index.html      # Placeholder
├── artists/index.html    # Placeholder
├── archives/index.html   # Placeholder
├── legacy/index.html     # Placeholder
├── credits/index.html    # Image source/attribution page
└── README.md
```

### Homepage
1. Hero — **The Sound That Changed Everything**
2. The Beginning — **1979**
3. The Sound — interactive collection of four featured recordings
4. The Pioneers — three featured artist cards
5. The Impact — cultural significance
6. The Archives — photos, print, and record artifacts
7. The Legacy Continues — closing statement

### Functional features
- Sticky header after scroll, active navigation links on all routes
- Responsive desktop navigation and keyboard-accessible mobile overlay
- A four-record selector that updates release information and the featured record label
- CSS-only stylized record sleeves and spinning discs (no audio licensing needed)
- Data-driven artist and archive preview grids
- Scroll reveals (suppressed for reduced motion), smooth anchor links, skip link
- Responsive layouts at desktop / tablet / mobile sizes
- Relative paths rather than hardcoded `/` root, supporting subdirectory hosting

## What to edit
- **Text, names, years, artist cards, release information and archive entries:** `siteData.js`.
- **Homepage editorial copy and section order:** `index.html`.
- **Colors, fonts and all styling:** variables at the beginning of `style.css`.
- **Site navigation / interactions:** `script.js`.
- **Photography:** replace remote image URLs in `siteData.js` with approved local files under `assets/images/`.

## Important project notes
- This is a **design concept**, not a claim that the site has been launched or endorsed by current trademark, master-recording, or publishing rights holders.
- Record sleeves and printed artifacts rendered with CSS are original **illustrative concepts**, **not scans of original records or newspaper coverage**.
- No commercial recording or song audio is bundled. Listening, streaming, full discography, artist profiles, and archive collections are future stages.
- Historical language and credits are preliminary; confirm all facts and names with the client.
- See `assets/PHOTO_CREDITS.md` for sources, licensing, and conditions on the remote editorial images. Review commercial-use rights and approval prior to public launch.
- The original hero photograph is generated for this prototype and is not a photograph of any particular historical record or studio.

## Next development stage
After feedback on the homepage, replace provisional imagery with approved Sugar Hill / Robinson family archival assets. Build out the Timeline, Music Library, Artists, Archives (including press), and Legacy pages with interconnected detail records.


## V1.2 changes (October 2026)
- Added the client-authorized full-color Sugar Hill Records logo in the shared header on all pages and in the homepage footer. The file is `assets/images/sugar-hill-records-logo.png`, with transparent padding cropped but the supplied artwork otherwise preserved.
- Reworked the Origin, Artists, Impact, and Archives titles with a more grounded, editorial tone; retained **DROP THE NEEDLE.** in the Music section and the cinematic hero headline.
- Removed the former **06 / THE NEXT CHAPTER** section. The page now ends with Archives, followed by the existing footer. Corrected the hero section counter to `01 / 06`.
- All five placeholder subpages, shared navigation, interactions, and media-credit pages remain included.
