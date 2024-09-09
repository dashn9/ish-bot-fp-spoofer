
var memory = 8;
var referrer = "";

var specsInject = function () {
    PropertyModifier.spoofProperty(Navigator.prototype, "deviceMemory", memory);
    if (referrer) {
        PropertyModifier.spoofProperty(Document.prototype, "referrer", referrer);
        const referrerSpoofedEvent = new CustomEvent('ReferrerSpoofedEvent');
        referrer = "";
        document.dispatchEvent(referrerSpoofedEvent);
    }
};