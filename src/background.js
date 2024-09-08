chrome.cookies.set({
    url: "http://spoof-data.ish.bot.local",
    name: "memory",
    value: "6",
    domain: "spoof-data.ish.bot.local", // Domain must match the URL
    path: "/",
    secure: false, // Set to true if the URL is HTTPS
    httpOnly: false, // Set to true if you want the cookie only accessible via HTTP(S)
    expirationDate: (Date.now() / 1000) + 3600 // Cookie expiration time in seconds (e.g., 1 hour from now)
}, function (cookie) {
    console.log(`Cookie ${cookie.name} set with value: ${cookie.value}`);
});
chrome.cookies.set({
    url: "http://spoof-data.ish.bot.local",
    name: "referrer",
    value: "google.com",
    domain: "spoof-data.ish.bot.local", // Domain must match the URL
    path: "/",
    secure: false, // Set to true if the URL is HTTPS
    httpOnly: false, // Set to true if you want the cookie only accessible via HTTP(S)
    expirationDate: (Date.now() / 1000) + 3600 // Cookie expiration time in seconds (e.g., 1 hour from now)
}, function (cookie) {
    console.log(`Cookie ${cookie.name} set with value: ${cookie.value}`);
});
chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
function offloadCookieToStorage(cookieName) {
    chrome.cookies.get({ url: "http://spoof-data.ish.bot.local", name: cookieName }, function (cookie) {
        if (cookie) {
            let cookieValue = cookie.value;
            // Store cookie value in chrome.storage.local
            chrome.storage.session.set({ [cookieName]: cookieValue }, function () {
                console.log(`Cookie ${cookieName} stored in local storage with value:`, cookieValue);
            });
        } else {
            console.log(`Cookie ${cookieName} not found`);
        }
    });
}
chrome.runtime.onInstalled.addListener(() => {
    offloadCookieToStorage("memory");
    offloadCookieToStorage("referrer");
});