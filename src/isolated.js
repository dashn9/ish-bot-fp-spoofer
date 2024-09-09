async function setSpoofData() {
    var fontHeightOffset, fontWidthOffset, hasBattery, browser, webglValueIndexSeed, webglValueOffset,
        audioContextOffset, webglParam37445, webglParam37446, memory, referrer, canvasIndexes, windowHistoryCount;
    await Promise.all([
        chrome.storage.session.get('fontHeightOffset').then((obj) => {
            fontHeightOffset = obj.fontHeightOffset;
        }),
        chrome.storage.session.get('fontWidthOffset').then((obj) => {
            fontWidthOffset = obj.fontWidthOffset;
        }),
        chrome.storage.session.get('hasBattery').then((obj) => {
            hasBattery = obj.hasBattery;
        }),
        chrome.storage.session.get('browser').then((obj) => {
            browser = obj.browser;
        }),
        chrome.storage.session.get('webglValueIndexSeed').then((obj) => {
            webglValueIndexSeed = obj.webglValueIndexSeed;
        }),
        chrome.storage.session.get('webglValueOffset').then((obj) => {
            webglValueOffset = obj.webglValueOffset;
        }),
        chrome.storage.session.get('audioContextOffset').then((obj) => {
            audioContextOffset = obj.audioContextOffset;
        }),
        chrome.storage.session.get('webglParam37445').then((obj) => {
            webglParam37445 = obj.webglParam37445;
        }),
        chrome.storage.session.get('webglParam37446').then((obj) => {
            webglParam37446 = obj.webglParam37446;
        }),
        chrome.storage.session.get('memory').then((obj) => {
            memory = obj.memory;
        }),
        chrome.storage.session.get('referrer').then((obj) => {
            referrer = obj.referrer;
        }),
        chrome.storage.session.get('canvasIndexes').then((obj) => {
            canvasIndexes = obj.canvasIndexes;
        }),
        chrome.storage.session.get('windowHistoryCount').then((obj) => {
            windowHistoryCount = obj.windowHistoryCount;
        }),
    ]);
    // Dispatch a custom event to the main context
    const event = new CustomEvent('SpoofdataFetchedEvent', {
        detail: {
            fontHeightOffset, fontWidthOffset, hasBattery, browser, webglValueIndexSeed, webglValueOffset,
            audioContextOffset, webglParam37445, webglParam37446, memory, referrer, canvasIndexes, windowHistoryCount
        }
    });
    document.dispatchEvent(event);
}
setSpoofData();