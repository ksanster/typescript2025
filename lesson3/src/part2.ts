// #### Объединение интерфейсов
{
    interface User {
        id: number;
        name: string;
    }

    interface User {
        email?: string;
        logIn: () => void;
    }


    function printUser(user:User):void {
        const emailInfo = user.email ? `with email: ${user.email}` : '';
        console.log(`User: ${user.name} [${user.id}] ${emailInfo}`);

        user.logIn();
    }

    const user:User = {
        id: 1,
        name: 'Papus',

        logIn(): void {
            // Do nothing
        }
    }

    printUser(user);
}


