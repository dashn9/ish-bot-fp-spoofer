const ridChrome = () => {
    PropertyModifier.deleteProperty(window, "chrome")
}
const changeBrowserToSafari = () => {
    class SafariRemoteNotification {

    };
    ridChrome();
    PropertyModifier.spoofProperty(Navigator.prototype, 'vendor', "Apple Computer, Inc.");
    const safari = { pushNotification: new SafariRemoteNotification() }
    safari.pushNotification.toString = () => ("[object SafariRemoteNotification]")
    PropertyModifier.addProperty(window, "safari", safari)
    PropertyModifier.spoofProperty(Navigator.prototype, "userAgentData", undefined)
    PropertyModifier.spoofProperty(Navigator.prototype, "deviceMemory", undefined)
}

const changeBrowserToChromeIos = () => {
    PropertyModifier.spoofProperty(Navigator.prototype, "userAgentData", undefined)
    PropertyModifier.spoofProperty(Navigator.prototype, "deviceMemory", undefined)
}