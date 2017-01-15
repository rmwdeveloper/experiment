
export const fileSystem =  { // Indices are always unique and static. A node only ever has one parent.
  1: { name: 'root', children: [2, 17, 18], permissions: ['rwxp'] },
  2: { name: 'drive', children: [3, 8], permissions: ['rwxp'] },
  3: { name: 'Users', children: [4], permissions: ['rwxp'] },
  4: { name: 'Guest', children: [11, 14, 15], permissions: ['rwxp'] },
  5: { name: 'Word Processor', permissions: ['rwx-'], extension: 'exe', metadata: { icon: 'wordlogoXSmall.png' } },
  6: { name: 'Spreadsheets', permissions: ['rwx-'], extension: 'exe', metadata: { icon: 'excellogoXSmall.png' } },
  7: { name: 'Webscape', permissions: ['rwx-'], extension: 'exe', metadata: { icon: 'ie7.png' } },
  8: { name: 'Programs', children: [9], permissions: ['rwx-'] },
  9: { name: 'Office', children: [5, 6], permissions: ['rwx-'] },
  10: { name: 'Word Processor', permissions: ['rwx-'], extension: 'shct', metadata: { icon: 'wordlogoXSmall.png' } },
  11: { name: 'Desktop', permissions: ['rwx-'], children: [10, 12, 13, 14, 15, 22, 23, 24, 25, 26, 27, 28] },
  12: { name: 'Spreadsheets', permissions: ['rwx-'], extension: 'shct', metadata: { icon: 'excellogoXSmall.png' } },
  13: { name: 'Webscape', permissions: ['rwx-'], extension: 'shct', metadata: { icon: 'ie7.png' } },
  14: { name: 'My Documents', permissions: ['rwx-'], children: [16], metadata: { icon: 'MyDocumentsXSmall.png' }, registryKey:'Folder' },
  15: { name: 'My Computer', permissions: ['rwx-'], children: [], metadata: { icon: 'MyComputerXSmall.png' } },
  16: { name: 'My Music', permissions: ['rwx-'], children: [], metadata: { icon: 'MyMusicXSmall.png' } },
  17: { name: 'Control Panel', permissions: ['rwx-'], children: [], metadata: { icon: 'ControlPanelXSmall.png' } },
  18: { name: 'Printer And Faxes', permissions: ['rwx-'], metadata: { icon: 'printerAndFaxesXSmall.png' } },
  19: { name: 'Help And Support', permissions: ['rwxp'], extension: 'exe', metadata: { icon: 'HelpAndSupportXSmall.png' } },
  20: { name: 'Search', permissions: ['rwxp'], extension: 'exe', metadata: { icon: 'SearchXSmall.png' } },
  21: { name: 'Run', permissions: ['rwxp'], extension: 'exe', metadata: { icon: 'RunXSmall.png' } },
  22: { name: 'test', permissions: ['rwx-'], extension: 'txt', metadata: { icon: 'RunXSmall.png' } },
  23: { name: 'my lil painting', permissions: ['rwx-'], extension: 'jpg', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '53px 42px' } },
  24: { name: 'Mailr', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 210px' } },
  25: { name: 'some text', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 100px' } },
  26: { name: 'anothjer image', permissions: ['rwx-'], extension: 'jpg', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '53px 42px' } },
  27: { name: 'printer settings', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 50px' } },
  28: { name: 'some text(2)', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 100px' } },
  29: { name: 'Authenticator', permissions: ['rwxp'], extension: 'exe' },
};