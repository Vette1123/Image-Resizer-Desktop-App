const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron')
const resizeImg = require('resize-img')

const path = require('path')
const os = require('os')
const fs = require('fs')

process.env.NODE_ENV = 'production'
const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV !== 'production'

let mainWindow
// main screen
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  })

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}
// about screen
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: 'About Image Resizer',
    width: 300,
    height: 300,
    icon: './assets/icons/Icon_256x256.png',
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    // disable menu bar
    autoHideMenuBar: true,
  })
  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'))
}

app.whenReady().then(() => {
  createMainWindow()

  //   implement menu
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  //   remove main window on close
  mainWindow.on('closed', () => (mainWindow = null))

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// menu template
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        aceelerator: 'CmdOrCtrl+W',
      },
    ],
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
]

// respond to ipcRenderer resize
ipcMain.on('image:resize', (e, options) => {
  options.dest = path.join(os.homedir(), 'imageresizer')
  resizeImage(options)
})

// resize image
async function resizeImage({ imgPath, width, height, dest }) {
  try {
    const newPath = await resizeImg(fs.readFileSync(imgPath), {
      width: +width,
      height: +height,
    })
    //    file name
    const filename =
      path.basename(imgPath, path.extname(imgPath)) +
      Date.now() +
      path.extname(imgPath)

    //   create directory if not exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }

    // write file to dest
    fs.writeFileSync(path.join(dest, filename), newPath)

    // send success message to renderer
    mainWindow.webContents.send('image:done')

    //open dest folder
    shell.openPath(dest)
  } catch (error) {}
}
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
