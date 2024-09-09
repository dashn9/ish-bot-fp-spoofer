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
            setTimeout(setSessionsFromCookies, 300);
            chrome.storage.session.set({ cookieChangeProcessed: true });
        }
    });
});
