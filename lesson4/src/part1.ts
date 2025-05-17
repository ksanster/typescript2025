interface Device {
    get name():string;
    get status():boolean;

    switchOn():void;
    switchOff():void;
}

class SmartHome {
    private devices:Device[] = [];

    addDevice(value:Device):void {
        this.devices.push(value);
    }

    switchOn():void {
        this.devices.forEach((device) => device.switchOn());
    }

    switchOff():void {
        this.devices.forEach((device) => device.switchOff());
    }

    getStatus():[string, boolean][] {
        return this.devices.map((device) => [device.name, device.status]);
    }
}

abstract class DeviceBase implements Device {
    private deviceStatus:boolean = false;
    private deviceName:string;

    get name():string {
        return this.deviceName;
    }

    get status():boolean {
        return this.deviceStatus;
    }

    protected constructor(name:string) {
        this.deviceName = name;
    }

    switchOn():void {
        this.deviceStatus = true;
    }

    switchOff():void {
        this.deviceStatus = false;
    }
}

class LightBulb extends DeviceBase {
    private level:number = 0;

    constructor() {
        super('light bulb');
    }

    tune(level:number):void {
        this.level = level;
    }
}

class Oven extends DeviceBase {
    constructor() {
        super('oven');
    }

    setTimer(timeInSeconds:number):void {
        //...
    }
}

const home = new SmartHome();
home.addDevice(new LightBulb());
home.addDevice(new Oven());

home.switchOn();
console.log(home.getStatus());
