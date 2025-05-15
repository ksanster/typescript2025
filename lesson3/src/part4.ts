// #### this внутри Interface
{
    interface User {
        data: {
            name: string;
            age: number | bigint; //ЗОЖ творит чудеса
        }

        get name(): this['data']['name'];
        get age(): this['data']['age'];
    }

    const user:User = {
        data: {
            name: 'Papus',
            age: 91
        },
        get name() {
            return this.data.name;
        },
        get age() {
            return this.data.age;
        }
    }
}
