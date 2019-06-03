var options = [
  'frontPageFeed',
  'relatedSidebar',
  'relatedEnd',
  'comments',
]

var registered = null

async function getCssToActivate() {
  var results = await Promise.all(options.map(async function (option) {
    var res = await browser.storage.local.get(option)
    var toggled = res.hasOwnProperty(option)
      ? res[option]
      // default any option to true if it is not set yet
      : true
    return [ option, toggled ]
  }))

  var filtered = results.filter(function (res) {
    return res[1]
  })

  var css = filtered.map(function (res) {
    return {
      file: './styles/' + res[0] + '.css',
    }
  })

  return css
}

async function registerScript (message) {
  // in case any other extensions message this extension by accident
  if (message !== '__reloadYtCSS') {
    return
  }

  // reset any previously registered CSS
  if (registered && typeof registered.unregister === 'function') {
    registered.unregister()
  }

  var css = await getCssToActivate()
  registered = await browser.contentScripts.register({
    matches: [ '*://*.youtube.com/*' ],
    css: css,
    runAt: 'document_start',
  })
}

async function init () {
  // ensure that the options are activated on install and when browser starts
  await registerScript('__reloadYtCSS')
}

browser.runtime.onMessage.addListener(registerScript)
browser.runtime.onInstalled.addListener(init)
browser.runtime.onStartup.addListener(init)
