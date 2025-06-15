export type User = { id:number, name:string };

class EventEmitter<Events extends Record<string, unknown[]>> {
    private handlers: Map<string, Set<Function>> = new Map();

    public on<EventName extends keyof Events & string>(event:EventName, handler: (...args:Events[EventName]) => void ):void {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, new Set());
        }

        this.handlers.get(event)!.add(handler);
    }

    public off<EventName extends keyof Events & string>(event:EventName, handler?:(...args:Events[EventName]) => void):void {
        if (!this.handlers.has(event)) {
            return;
        }

        if (!handler) {
            this.handlers.delete(event);
            return;
        }

        this.handlers.get(event)!.delete(handler);
    }

    public emit<EventName extends keyof Events & string>(event:EventName, ...args:Events[EventName]):void {
        if (!this.handlers.has(event)) {
            return;
        }

        this.handlers.get(event)!.forEach((handler) => {
            handler(...args);
        })
    }
}

interface UserEvents extends Record<string, unknown[]> {
    add: [user: User],
    remove: [id: number],
    change: [id: number, name: string]
}

const emitter = new EventEmitter<UserEvents>();

emitter.on('add', (user:User) => console.log(`Add user with name: ${user.name}`));
emitter.on('remove', (id: number) => console.log(`Remove user with id: ${id}`));
emitter.on('change', (id: number, name: string) => console.log(`Change username with id: ${id} to ${name}`));
