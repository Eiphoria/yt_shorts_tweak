var last_url = "https://www.youtube.com/";
function handleUpdated(tabId, changeInfo, tabInfo) {
  //debug input parameters
  console.log("Changed url to -> ", changeInfo.url);

  let url = changeInfo.url;
  //checks for url
  if (changeInfo.url === undefined) {
    console.log("Url is undefined, abort inject..");
    return;
  } else {
    if (last_url === url) {
      console.log("Same url, abort inject..");
      return;
    } else {
      if (url.startsWith("https://www.youtube.com/shorts/")) {
        console.log("Url seems like shorts..");
        last_url = url;
        const executing = chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["shorts.js"],
        });
        executing.then(onExecuted, onError);
      }
    }
  }
}
function onExecuted(result) {
  console.log(`We executed in active tab`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}
//trigers when url in tab changes
chrome.tabs.onUpdated.addListener(handleUpdated);
