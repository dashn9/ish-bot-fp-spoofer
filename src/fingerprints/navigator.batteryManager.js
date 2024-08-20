function generateRandomBatteryManagerData(probabilityOfCharging = 0.5) {
    const charging = Math.random() < probabilityOfCharging;
    const level = Math.random();
    const chargingTime = Math.floor(Math.random() * 10000);
    const dischargingTime = Math.floor(Math.random() * 10000);

    return {
        charging,
        chargingTime,
        dischargingTime,
        level
    };
}

const injectBattery = (fakeBattery = generateRandomBatteryManagerData()) => {
    // TODO: If it is a charging state, the user's power should keep increasing to a certain time full.
    // It also needs to simulate the situation that the user has unplugged the power.
    if ('undefined' != typeof BatteryManager) {
        console.log('battery')
        bExtensionUtils.replaceGetterWithProxy(
            BatteryManager.prototype,
            'charging',
            bExtensionUtils.makeHandler().getterValue(fakeBattery.charging),
        );

        bExtensionUtils.replaceGetterWithProxy(
            BatteryManager.prototype,
            'chargingTime',
            bExtensionUtils.makeHandler().getterValue(!fakeBattery.chargingTime ? Infinity : fakeBattery.chargingTime),
        );

        bExtensionUtils.replaceGetterWithProxy(
            BatteryManager.prototype,
            'dischargingTime',
            bExtensionUtils.makeHandler().getterValue(!fakeBattery.dischargingTime ? Infinity : fakeBattery.dischargingTime),
        );

        bExtensionUtils.replaceGetterWithProxy(
            BatteryManager.prototype,
            'level',
            bExtensionUtils.makeHandler().getterValue(fakeBattery.level),
        );
    }
};