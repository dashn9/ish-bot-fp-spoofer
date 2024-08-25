const PropertyModifier = {
    originalDescriptors: new Map(),
    deletedProperties: new Map(),
    originalGetOwnPropertyDescriptor: Object.getOwnPropertyDescriptor,
    originalHasOwnProperty: Object.hasOwn,

    init() {
        Object.getOwnPropertyDescriptor = (obj, prop) => {
            const deletedProps = this.deletedProperties.get(obj);
            console.log(deletedProps, this.deletedProperties, obj, prop)
            if (deletedProps && deletedProps.has(prop)) {
                return undefined;
            }

            const protoDescriptors = this.originalDescriptors.get(obj);
            if (protoDescriptors && prop in protoDescriptors) {
                return protoDescriptors[prop];
            }
            return this.originalGetOwnPropertyDescriptor.call(Object, obj, prop);
        };
        Object.hasOwn = (obj, prop) => {
            const deletedProps = this.deletedProperties.get(obj);
            if (deletedProps && deletedProps.has(prop)) {
                return false;
            }
            return this.originalHasOwnProperty.call(Object, obj, prop);
        };
    },

    spoofProperty(obj, propertyName, value) {
        if (!this.originalDescriptors.has(obj)) {
            this.originalDescriptors.set(obj, {});
        }
        const protoDescriptors = this.originalDescriptors.get(obj);

        if (!protoDescriptors[propertyName]) {
            protoDescriptors[propertyName] = this.originalGetOwnPropertyDescriptor.call(Object, obj, propertyName);
        }

        Object.defineProperty(obj, propertyName, {
            get() {
                return value;
            },
            configurable: true,
        });
    },

    addProperty(obj, propertyName, value) {
        obj[propertyName] = value;
    },

    deleteProperty(obj, propertyName) {
        obj[propertyName] = undefined;
        console.log(obj, propertyName)
        if (!this.deletedProperties.has(obj)) {
            this.deletedProperties.set(obj, new Set());
        }
        this.deletedProperties.get(obj).add(propertyName);
    }
};
PropertyModifier.init();