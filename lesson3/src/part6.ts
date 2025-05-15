// #### Кортежи с rest-параметрами
{
    type Coordinates = [latitude:number, longitude:number, ...landmarks: string[]];

    function describeLocation(coords: Coordinates): string {
        const [latitude, longitude, ...landmarks] = coords;
        const strLandmarks = landmarks?.length > 0 ? ` Ориентиры: ${landmarks.join(', ')}` : '';

        return `Широта: ${latitude}, Долгота: ${longitude}.${strLandmarks}`;
    }

    console.log(
        describeLocation([55.75, 37.62])
    );
}

// #### Базовые операции с кортежами
{
    type Person = [name: string, age: string, email?: string];

    function greet(person: Person): string {
        const [name, age, email] = person;
        const contacts = email ? `Контакты: ${email}` : '';

        return `Привет, ${name}! Тебе ${age} лет.${contacts}`;
    }
}

// #### Readonly и деструктуризация
{
    type RGB = readonly [number, number, number];

    const rgb:RGB = [255, 255, 255];

    function invertColor([r, g, b]: RGB): RGB {
        return [255 - r, 255 - g, 255 - b];
    }

    invertColor(rgb);

    type RGBA = readonly [...RGB, alpha?: number];

    const rgba:RGBA = [255, 255, 255];
}

// #### Гибридные кортежи
{
    type Status = 'pending' | 'completed';
    type Meta = [string, any];
    type Order = [id: string, goods: string[], status?: Status, ...meta:Meta[]];

    function processOrder(order: Order): string {
        const [id, goods, status, ...meta] = order;
        const metas = meta && meta.length ? meta.join('; ') : '';

        return `Заказ ${id}. Товары: ${goods.join(', ')}. Статус: ${status || 'не указан'}. ${meta}`;
    }

    processOrder(['112', ['Red', 'White', 'lollipop'], 'completed']);
}
