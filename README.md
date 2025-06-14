
# 🧠 SocialCardGen — Dynamic Social Card Generator with Cloudinary

> Create beautiful, real-time Open Graph images for your blog posts, articles, product pages, or marketing campaigns using customizable templates and overlays powered by Cloudinary.

![SocialCardGen Preview](./preview.png)

---

## 🚀 What This App Does

- **📤 Upload or Fetch**  
  Upload images via Cloudinary or extract OG image and metadata from any URL.

- **🎨 Customize in Real-Time**  
  Choose from prebuilt templates, edit title/subtitle text, and apply live overlays.

- **📸 Preview & Export**  
  Generate final preview using Cloudinary transformations, then export as PNG or share the dynamic URL.

---

## ✨ Features

- 🧠 Smart OG metadata extraction
- 🔧 Cloudinary-powered image manipulation
- 🎯 Live template preview with overlays
- 💅 Responsive UI with Tailwind CSS 4
- ⚡ Built with Next.js 15 (App Router), Motion.dev, shadcn/ui
- ✅ Works great for blogs, CMSs, and link previews

---

## 🛠 Tech Stack

| Tech          | Description                          |
|---------------|--------------------------------------|
| Next.js 15    | App Router, client/server components |
| Tailwind CSS 4| Modern styling utility               |
| Cloudinary    | Image hosting & transformation       |
| shadcn/ui     | Accessible UI components             |
| Motion.dev    | Smooth transitions & animations      |

---

## ✅ Prerequisites

- Node.js 18+
- Cloudinary account (free tier is enough)

---

## 🔐 .env Configuration

Create a `.env.local` file in your root directory:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
NEXT_PUBLIC_CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
````

> ✅ Only the `NEXT_PUBLIC_` keys will be exposed to the frontend.

---

## 🧪 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/yourname/socialcardgen.git
cd socialcardgen
npm install
```

### 2. Start Development Server

```bash
npm run dev
# visit http://localhost:3000/generator
```

---

## 📜 Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run lint`  | Run TypeScript + ESLint  |
| `npm run start` | Start production server  |

---

## 📂 Project Structure

```
src/
  app/generator/       → Main 3-step wizard UI
  components/          → Modular UI blocks (upload, preview, etc)
  lib/templates.ts     → Template metadata
  styles/              → Global Tailwind styles
```

---

## 🌍 Deployment (Vercel Recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com), click **Import Project**
3. Link your repo and set up `.env` variables
4. Click **Deploy** 🎉

---

## 🧠 Helpful Links

* 📘 [Cloudinary Official Docs](https://cloudinary.com/documentation)
* 🎨 [next-cloudinary Image Overlay Docs](https://next.cloudinary.dev/cldogimage/overlays)
* ⚛️ [Next.js App Router Docs](https://nextjs.org/docs/app)
* 🧰 [shadcn/ui Components](https://ui.shadcn.com/)
* 🎬 [Motion.dev Docs](https://motion.dev)

---

## 📄 License

MIT — see [LICENSE](./LICENSE)

---

**Craft beautiful, shareable OG images — without design tools. 🚀**

