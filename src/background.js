// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "fontHeightOffset",
//     value: "4",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "fontWidthOffset",
//     value: "1",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "hasBattery",
//     value: "false",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "browser",
//     value: "chrome",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "webglValueIndexSeed",
//     value: "0.83837",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "webglValueOffset",
//     value: "0.283282",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "audioContextOffset",
//     value: "0.8",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "webglParam37445",
//     value: "NVIDIA",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "webglParam37446",
//     value: "CHROME_LA",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "memory",
//     value: "6",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "referrer",
//     value: "google.com",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "canvasIndexes",
//     value: "[-1, 0, -1, 1, 1]",
// }, function (cookie) { });
// chrome.cookies.set({
//     url: "http://spoof-data.ish.bot.local",
//     name: "windowHistoryCount",
//     value: "12",
// }, function (cookie) { });

chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
function offloadCookieToStorage(cookieName) {
    chrome.cookies.get({ url: "http://spoof-data.ish.bot.local", name: cookieName }, function (cookie) {
        if (cookie) {
            let cookieValue = cookie.value;
            // Store cookie value in chrome.storage.local
            chrome.storage.session.set({ [cookieName]: cookieValue }, function () { });
        }
    });
}
function setSessionsFromCookies() {
    offloadCookieToStorage("fontHeightOffset");
    offloadCookieToStorage("fontWidthOffset");
    offloadCookieToStorage("hasBattery");
    offloadCookieToStorage("browser");
    offloadCookieToStorage("webglValueIndexSeed");
    offloadCookieToStorage("webglValueOffset");
    offloadCookieToStorage("audioContextOffset");
    offloadCookieToStorage("webglParam37445");
    offloadCookieToStorage("webglParam37446");
    offloadCookieToStorage("memory");
    offloadCookieToStorage("referrer");
    offloadCookieToStorage("canvasIndexes");
    offloadCookieToStorage("windowHistoryCount");
}
chrome.cookies.onChanged.addListener(function (changeInfo) {
    chrome.storage.session.get(['cookieChangeProcessed'], function (result) {
        if (!result.cookieChangeProcessed) {
            setTimeout(setSessionsFromCookies, 100);
            chrome.storage.session.set({ cookieChangeProcessed: true });
        }
    });
});
