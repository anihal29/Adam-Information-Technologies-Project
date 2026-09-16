# Deployment

## GitHub Pages

A GitHub Pages workflow is already included at `.github/workflows/deploy.yml`.

1. Create/push this project to a GitHub repository.
2. In the repository, open **Settings > Pages**.
3. Set the source to **GitHub Actions**.
4. Push to the `main` branch.
5. The included workflow installs dependencies, builds the Vite app, and publishes `dist`.

## Vercel

1. Import the repository into Vercel.
2. Keep the framework preset as **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy.

Before the public launch, re-check pricing, compliance/security claims, and any vendor-specific information against current official vendor sources, as required by the internship testing/polish phase.
