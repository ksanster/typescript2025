type MyNotification = string;

interface NotificationStrategy {
    send(note:MyNotification):string;
}

class NotificationService {
    private strategy:NotificationStrategy;

    constructor() {
        this.strategy = new SendByEmail();
    }

    setStrategy(value:NotificationStrategy):void {
        this.strategy = value;
    }

    send(note:MyNotification):void {
        if (!this.strategy) {
            throw new Error('Strategy not set!');
        }

        if (!note) {
            throw new Error('Empty notification!')
        }

        const result = this.strategy.send(note);
        console.log(result);
    }
}

class SendByEmail implements NotificationStrategy {
    send(note: MyNotification): string {
        return `Notification "${note}" sent by email`;
    }
}

class SendBySms implements NotificationStrategy {
    send(note: MyNotification): string {
        return `Notification "${note}" sent by sms`;
    }
}

class SendByPigeon implements NotificationStrategy {
    send(note: MyNotification): string {
        return 'Sorry, all pigeons are out. Please wait some time';
    }
}

const service = new NotificationService();
service.setStrategy(new SendBySms());
service.send('Hello, world!');

service.setStrategy(new SendByPigeon());
service.send('Oh, no!');
