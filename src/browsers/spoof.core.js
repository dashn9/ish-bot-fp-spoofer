const ridChrome = () => {
    PropertyModifier.removeProperty(window, "chrome")
}
const changeBrowserToSafari = () => {
    class SafariRemoteNotification {

    };
    ridChrome();
    PropertyModifier.spoofProperty(Navigator.prototype, 'vendor', "Apple Computer, Inc.");
    const safari = { pushNotification: new SafariRemoteNotification() }
    safari.pushNotification.toString = () => ("[object SafariRemoteNotification]")
    PropertyModifier.addProperty(window, "safari", safari)
    PropertyModifier.deleteProperty(navigator, "userAgentData")
    PropertyModifier.deleteProperty(navigator, "deviceMemory")
}

const changeBrowserToChromeIos = () => {
    ridChrome()
    PropertyModifier.deleteProperty(navigator, "userAgentData")
    PropertyModifier.deleteProperty(navigator, "deviceMemory")
}