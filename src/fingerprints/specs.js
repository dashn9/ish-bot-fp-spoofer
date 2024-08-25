
var hardwareSpecs = {
    memory: 4,
    hardwareConcurrency: 4,
};

var referer = "";
var browserVendor = "Apple Computer, Inc.";

var specsInject = function () {
    PropertyModifier.spoofProperty(Navigator.prototype, "deviceMemory", hardwareSpecs["memory"]);
    if (browserVendor) {
        PropertyModifier.spoofProperty(Navigator.prototype, 'vendor', browserVendor)
    }
    if (referer) {
        PropertyModifier.spoofProperty(Document.prototype, "referrer", referer);
    }
};