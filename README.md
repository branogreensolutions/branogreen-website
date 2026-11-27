# Brano Green Corporate Website V3

Production-tested Next.js 16 website for Brano Green Solutions Limited.

## Included
- Three clearly separated divisions: Agro Export, IT Solutions and Green Energy
- Eight agro commodity pages, including Paddy Rice and Rice By-products
- Rice husk, rice bran and broken-rice commercial content
- Four complete SEO buyer guides
- Product imagery stored locally in `public/images`
- Dynamic metadata, canonical URLs, Open Graph data, product JSON-LD, sitemap and robots
- Quote form with optional Resend email delivery
- Sanity schema starter under `sanity-studio/`

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open `http://localhost:3000`.

## Production test completed
```bash
npm run build
npm start
```
The build generated all static and dynamic routes successfully. Key routes were then loaded and rendered for the accompanying PDF snapshots.

## Vercel deployment
1. Upload this folder to GitHub.
2. Import the repository into Vercel.
3. Add `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and `QUOTE_FROM_EMAIL`.
4. Attach `branogreen.com` and `www.branogreen.com`.
5. Add the domain to Google Search Console and submit `/sitemap.xml`.

## Important deployment correction
Do not restore `output: 'standalone'` unless you are deploying the generated standalone server and copying `.next/static` and `public` into it. The earlier package used standalone output with `next start`, which can cause missing CSS/static assets and make the website appear broken.

## VPS hosting
See [deployment instructions](deploy/README.md) and the supplied systemd/Nginx templates. The recovered V3 source is preserved; a fresh build and live email check are required before production deployment.
