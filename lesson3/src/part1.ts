// #### Объектные типы и словари
{
    type User = {
        id: number;
        name: string;
        email?: string;
    }

    type UserDict = {[key: User['id']]: User};

    const user:User = {
        id: 1,
        name: 'Papus'
    };

    const dict:UserDict = {};
    dict[user.id] = user;

    type GetUserEmail = (id:number, users:UserDict) => string|undefined;

    const getUserEmail:GetUserEmail = (id, users) => {
        return users[id]?.email;
    }

}





