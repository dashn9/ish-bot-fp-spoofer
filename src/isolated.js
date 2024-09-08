async function setSpoofData() {
    var memory;
    await Promise.all([
        chrome.storage.session.get('memory').then((obj) => {
            memory = obj.memory;
        }),
    ]);
    // Dispatch a custom event to the main context
    const event = new CustomEvent('SpoofdataFetchedEvent', { detail: { memory: memory } });
    document.dispatchEvent(event);
}
setSpoofData();

// Overwrite a variable in the Main world