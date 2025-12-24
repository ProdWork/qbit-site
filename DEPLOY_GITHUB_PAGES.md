# GitHub Pages Deployment Instructions

1. Make sure your repository is pushed to GitHub (e.g., https://github.com/your-username/qbit-site).
2. Update the `base` in `vite.config.ghpages.js` to match your repo name (e.g., `/qbit-site/`).
3. Run the following commands:

```
npm run predeploy
npm run deploy
```

4. Set GitHub Pages to deploy from the `gh-pages` branch in your repo settings.
5. Your site will be available at: https://your-username.github.io/qbit-site/

---

If you need to change the repo name or organization, update the `base` path accordingly in `vite.config.ghpages.js`.
