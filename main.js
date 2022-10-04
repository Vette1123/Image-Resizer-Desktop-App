const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV !== 'production'

// main screen
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
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

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
