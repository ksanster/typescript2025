type TaskStatus = 'idle' | 'running' | 'complete';

class Task {
    private taskId: number;
    private taskDescription: string;
    private taskStatus: TaskStatus;
    private taskPriority:number;

    public readonly servant:TaskServant;

    public get status():TaskStatus {
        return this.taskStatus;
    }

    public set status(value:TaskStatus) {
        this.taskStatus = value;
    }

    public get priority():number {
        return this.taskPriority;
    }

    constructor(id:number, description?:string) {
        this.taskId = id;
        this.taskDescription = description || `Task ${id}`;
        this.taskStatus = 'idle';
        this.taskPriority = 0;
        this.servant = new TaskServant(this);
    }
}

interface TaskUnsafe {
    status: Task['status'];
    priority: Task['priority'];
}

class TaskServant {
    private parent:TaskUnsafe;

    constructor(parent:Task) {
        this.parent = parent as unknown as TaskUnsafe;
    }

    start():void {
        this.parent.status = 'running';
    }

    stop():void {
        this.parent.status = 'idle';
    }

    setPriority(priority:number):void {
        this.parent.priority = priority;
    }

    static stopByPriority(tasks:Task[], priority:number):void {
        tasks.forEach((task) => {
            const unsafe = task as unknown as TaskUnsafe;
            if (unsafe.priority === priority) {
                unsafe.status = 'idle';
            }
        });
    }
}

const task1 = new Task(1);
const task2 = new Task(2);

task1.servant.start();
task2.servant.start();

console.log(task1['status'], task2['status']);

TaskServant.stopByPriority([task1, task2], 0);

console.log(task1['status'], task2['status']);

// На unsafe доступ есть отдельная задача с friendly classes
// В этом кейсе, как я понимаю, вполне допустимо сделать нормальные аксессоры на свойства Task,
// потому что основное значение TaskServant - это не переключать свойства Task, а вынести функционал выполнения задач -
// добавлять их в пул выполняемых, распределять между ними процессорное время и тп
