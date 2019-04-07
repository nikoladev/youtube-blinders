var options = [
  'frontPageFeed',
  'relatedSidebar',
  'relatedEnd',
  'comments',
]

function saveOptions(option) {
  return function () {
    var obj = {}
    obj[option] = document.querySelector('#' + option).checked
    browser.storage.local.set(obj)
    browser.runtime.sendMessage('__reloadYtCSS')
  }
}

function getOptionValues() {
  options.forEach(function (option) {
    var gettingItem = browser.storage.local.get(option)
    gettingItem.then(function (res) {
      document.querySelector('#' + option).checked = res.hasOwnProperty(option)
        ? res[option]
        // default any option to true if it is not set yet
        : true
    })
  })
}

// set all handlers
document.addEventListener('DOMContentLoaded', getOptionValues)
options.forEach(function (option) {
  var element = document.querySelector('input[id="' + option + '"]')
  element.onchange = saveOptions(option)
})
