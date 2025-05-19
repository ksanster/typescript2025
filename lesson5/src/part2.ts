interface Form {
    readonly name: string;
    readonly email: string;
    readonly age: number;
}

type RenamedForm = {
    -readonly [K in keyof Form as `form${Capitalize<K>}`]: Form[K] extends string ? Form[K] : undefined
}

const t:RenamedForm = {
    formName: '1',
    formEmail: '1',
    formAge: undefined
}

t.formName = 'Papus';
