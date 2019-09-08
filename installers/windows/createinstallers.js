const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Analyzer-win32-ia32/'), //package name
    authors: 'Bhumika Bergman',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Analyzer.exe', //for actual app
    setupExe: 'Analyzer_Installer.exe', //for installation only
    setupIcon: path.join(rootPath, 'icon.ico')
  })
}
