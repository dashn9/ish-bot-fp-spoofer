const ridChrome = () => {
    PropertyModifier.deleteProperty(window, "chrome")
}
const changeBrowserToSafari = () => {
    class SafariRemoteNotification {

    };
    ridChrome();
    const safari = { pushNotification: new SafariRemoteNotification() }
    safari.pushNotification.toString = () => ("[object SafariRemoteNotification]")
    PropertyModifier.addProperty(window, "safari", safari)
    PropertyModifier.spoofProperty(Navigator.prototype, "deviceMemory", undefined)
}