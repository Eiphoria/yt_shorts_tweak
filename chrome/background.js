let currentUrl;

function handleUpdated(tabId, { url }, tab) {
  if (url !== currentUrl && url !== undefined) {
    currentUrl = url;
    chrome.tabs.sendMessage(tabId, null, {}, function (response) {
      if (chrome.runtime.lastError) {
        console.warn(chrome.runtime.lastError.message);
        return;
      }
    });
  }
}
function onExecuted(result) {
  console.log(`We executed in active tab`, result);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

//trigers when url in tab changes
chrome.tabs.onUpdated.addListener(handleUpdated);
