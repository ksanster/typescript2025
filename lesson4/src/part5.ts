interface Resource {
    accessLevel: number;
}

interface UnsafeEmployee {
    accessLevel:Employee['accessLevel'];
}

class Employee {
    private id: number;
    private accessLevel: number;

    get unsafe():UnsafeEmployee {
        return this as unknown as UnsafeEmployee;
    }

    constructor(id:number, accessLevel:number) {
        this.id = id;
        this.accessLevel = accessLevel;
    }
}

class AccessManager {
    checkAccess(user:Employee, resource:Resource):boolean {
        return user.unsafe.accessLevel >= resource.accessLevel;
    }

    // Тут не понял про "реализовать с проверкой прав"
    // Права надо проверять у того, кто вызывает этот метод
    // Или AccessManager должен быть слугой у Employee? Но на это была отдельная задача..
    setAccessLevel(user:Employee, value:number):void {
        user.unsafe.accessLevel = value;
    }
}

const employee = new Employee(1, 0);
const manager = new AccessManager();
const resource:Resource = { accessLevel: 1 };

console.log(manager.checkAccess(employee, resource));
manager.setAccessLevel(employee, 100);
console.log(manager.checkAccess(employee, resource));
