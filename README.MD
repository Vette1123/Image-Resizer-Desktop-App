# 🖼️ Image Resizer (Desktop)

> Resize images locally on your desktop. A small cross-platform Electron app.

![Electron](https://img.shields.io/badge/Electron-21-47848F?logo=electron&logoColor=white)
![Node](https://img.shields.io/badge/Node-JS-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

A desktop app for resizing PNG, JPEG, and GIF images to any width × height. Pick a file, type the dimensions, and the resized copy lands in your home folder. Nothing is uploaded; everything stays local.

![App screenshot](https://user-images.githubusercontent.com/26345237/194243786-1289cb5a-a89b-4f80-b31b-e343baf8ab95.png)

## ✨ Features
- Native desktop window (macOS / Windows / Linux) via Electron
- File picker for PNG, JPEG, and GIF inputs
- Auto-fills the form with the source image's current width & height
- Resize to any custom width × height in pixels
- Writes the output to `~/imageresizer/` and opens that folder when done
- Toast notifications for success and validation errors (via `toastify-js`)
- Native app menu with quit shortcut and an About window

## 🛠️ Tech Stack
- **Runtime**: [Electron](https://www.electronjs.org/) 21 (main + preload + renderer with `contextIsolation`)
- **Image processing**: [`resize-img`](https://www.npmjs.com/package/resize-img)
- **Renderer**: plain HTML/CSS/JS, Poppins via Google Fonts
- **UX**: [`toastify-js`](https://github.com/apvarun/toastify-js) for in-app notifications
- **Dev**: `nodemon` for reloading during development

## 📖 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Install & run
```bash
npm install
npm start
```

The app launches via `electron .`. On first resize, the output directory `~/imageresizer/` is created automatically and opened in your OS file browser.

## 🙌 Credits
Built by [Mohamed Gado](https://mohamedgado.com).
