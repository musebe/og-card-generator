# 📋 Project To-Do List

A checklist of remaining tasks to ship **SocialCardGen** end-to-end.

---

## 1. Finalize Preview Rendering
- [ ] Wire up `PreviewStep` to use our `CardPreview` (with overlays)
- [ ] Generate proper OG image URL via `getCldOgImageUrl`
- [ ] Hook up “Download PNG” & “Copy OG URL” to final URL
- [ ] Add Sonner toast on copy/download success or error

## 2. Improve `CardPreview`
- [ ] Migrate from `<CldOgImage>` to `getCldOgImageUrl` + `<CldImage>` per docs  
- [ ] Expose font sizes/colors & badge positions from `template.defaultConfig`  
- [ ] Fallback to inline `<img>` + absolute overlay for full-URL sources  
- [ ] Add error UI if Cloudinary request fails  

## 3. Polish Design Step
- [ ] Ensure controls & preview columns are the same height  
- [ ] Make layout fully responsive (mobile, tablet breakpoints)  
- [ ] Implement manual or drag-and-drop overlay positioning UI  
- [ ] Show a live, styled backdrop behind the preview  

## 4. Align Upload & Fetch Widgets
- [ ] Use consistent `Button` styles for both widgets  
- [ ] Expand URL input to flex-grow in its container  
- [ ] Display success & error toasts on upload/fetch  
- [ ] Validate URL format before fetching OG data  

## 5. TypeScript & Prop Fixes
- [ ] Convert `FieldInputs` to a controlled component with `title`, `subtitle`, `onChange`  
- [ ] Fix the missing `}` syntax in `TemplateSelector.tsx`  
- [ ] Adjust all component props to match shadcn/UI & Radix typings  
- [ ] Add JSDoc comments to public components & props  

## 6. Global Styling & Responsiveness
- [ ] Tweak container padding/margins for small screens  
- [ ] Improve contrast, spacing, and typography across all steps  
- [ ] Ensure dark/light mode toggle applies to all UI elements  
- [ ] Test on multiple device emulators (iOS, Android, desktop)  

## 7. README & Documentation
- [ ] Write **README.md**:
  - Project overview & features  
  - Setup & local development instructions  
  - Environment variables & Cloudinary presets  
  - Deployment & hosting instructions  
- [ ] Document each exported component with props & usage examples  
- [ ] Add a “Roadmap” section listing upcoming features  

## 8. Deployment
- [ ] Push `main` branch to GitHub repository  
- [ ] Connect repo to Vercel & configure environment variables  
- [ ] Validate build & preview deployment on Vercel  
- [ ] Add deployment badges to README  

## 9. Blog Post
- [ ] Draft blog post titled:  
  > Dynamic Social Media Card Generator with Cloudinary  
  > Generate real-time Open Graph images with Cloudinary, featuring customizable templates, dynamic text/image overlays, and CMS integration for shareable, media-rich previews.  
- [ ] Outline sections:
  1. Introduction & motivation  
  2. Core technologies (Next.js, shadcn/ui, Motion.dev, Cloudinary)  
  3. Architecture & template system  
  4. Step-by-step tutorial  
  5. Deployment & live demo  
  6. Future improvements & call-to-action  
- [ ] Publish to blog & share on social channels  

