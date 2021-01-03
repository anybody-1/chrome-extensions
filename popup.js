console.log("popup hello...");

let selectNode = document.querySelector("#select");
let value = chrome.storage.sync.get("status");
selectNode.value = value;
selectNode.onchange = function () {
  console.log(this.value);
  let self = this;
  chrome.storage.sync.set({ status: this.value });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { switch: self.value },
      function (response) {
        console.log(response);
      }
    );
  });
};
