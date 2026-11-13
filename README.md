This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font/local`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts) to self-host the Outfit font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Cloudflare Pages

The site is exported as static HTML, so Cloudflare Pages only needs to run the
build and serve the `out` directory.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None / Static HTML |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` |

Use `npm start` to preview the exported site locally on port 3001. The
`public/_redirects` file keeps the old `/patrons` URL working after the export.
