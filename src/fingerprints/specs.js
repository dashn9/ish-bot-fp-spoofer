
var hardwareSpecs = {
    memory: 4,
    hardwareConcurrency: 4,
};

var referer = "";
var browserVendor = "";

var specsInject = function () {
    const originalDeviceMemoryDescriptor = Object.getOwnPropertyDescriptor(
        Navigator.prototype,
        "deviceMemory"
    );
    const originalVendorDescriptor = Object.getOwnPropertyDescriptor(
        Navigator.prototype,
        "vendor"
    );
    const originalRefererDescriptor = Object.getOwnPropertyDescriptor(
        Document.prototype,
        "referer"
    );
    Object.defineProperty(Navigator.prototype, "deviceMemory", {
        get() {
            return hardwareSpecs["memory"];
        },
    });
    if (browserVendor) {
        Object.defineProperty(Navigator.prototype, "vendor", {
            get() {
                return browserVendor;
            },
        });
    }
    if (referer) {
        Object.defineProperty(Document.prototype, "referrer", {
            get() {
                return referer;
            },
        });
    }
    // I'm to lazy to do this but there is a better way to refactor this, please do, if getting too much
    Object.getOwnPropertyDescriptor = (obj, prop) => {
        if (obj === Navigator.prototype) {
            switch (prop) {
                case "deviceMemory":
                    return originalDeviceMemoryDescriptor;
                case "vendor":
                    return originalVendorDescriptor;
            }
        } else if (obj === Document.prototype) {
            switch (prop) {
                case "referer":
                    originalRefererDescriptor;
            }
        }
        return Reflect.getOwnPropertyDescriptor(obj, prop);
    };
};