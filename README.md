# Naveen Kumar V — Portfolio

Static site (HTML + CSS + vanilla JS). No build step, no dependencies.

## Run locally
Open `index.html` in a browser, or serve the folder:

    python3 -m http.server 8000     # then visit http://localhost:8000

## Files
- `index.html`   – all sections (Home, About, Skills, Projects, Education, Certifications, Experience, Contact)
- `styles.css`   – design tokens, layout, responsive rules
- `script.js`    – nav, scroll reveal, counters, copy-email
- `assets/naveen.webp` – profile photo (replace to change it, keep the name)
- `assets/Naveen_Kumar_V_Resume.pdf` – resume PDF (replace to update it, keep the name)

## Adding project links later
Inside a project's `<div class="p-body">` in `index.html`, add after the tags list:

    <div class="p-links">
      <a class="btn btn-ghost" href="YOUR_GITHUB_REPO_URL" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a class="btn btn-solid" href="YOUR_LIVE_URL" target="_blank" rel="noopener noreferrer">Live demo</a>
    </div>

## Deploy
- **GitHub Pages**: push this folder to a repo, then Settings → Pages → Deploy from branch (`main`, `/root`).
- **Netlify / Vercel / Cloudflare Pages**: drag-and-drop the folder, or connect the repo. Build command: none. Output directory: `/`.
- **AWS S3 + CloudFront** (matches your Project 04): create an S3 bucket, upload the files, put CloudFront in front with Origin Access Control, set `index.html` as the default root object, and attach an ACM certificate for a custom domain.
