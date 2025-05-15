// #### Наследование интерфейсов
{
    interface Shape {
        color: string;
        area: () => number;
    }

    interface Circle extends Shape {
        radius: number;
    }

    interface Rectangle extends Shape {
        width: number;
        height: number;
    }

    function createCircle(radius: number, color = '#FFFFFF'): Circle {
        return {
            color,
            radius,
            area() {
                return Math.PI * radius * radius;
            }
        } as Circle;
    }
    function createRectangle(width: number, height: number, color = '#FFFFFF'): Rectangle {
        return {
            color,
            width,
            height,
            area() {
                return width * height;
            }
        } as Rectangle;
    }

    function calcArea(shape: Shape): number {
        return shape.area();
    }
}
