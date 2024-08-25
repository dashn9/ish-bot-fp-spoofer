
var hardwareSpecs = {
    memory: 4,
    hardwareConcurrency: 4,
};

var referer = "";

var specsInject = function () {
    PropertyModifier.spoofProperty(Navigator.prototype, "deviceMemory", hardwareSpecs["memory"]);
    if (referer) {
        PropertyModifier.spoofProperty(Document.prototype, "referrer", referer);
    }
};