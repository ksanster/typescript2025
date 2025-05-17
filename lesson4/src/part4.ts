interface Renderer {
    render(image:BaseImage):void;
}

abstract class BaseImage {
    protected renderer?: Renderer;

    setRenderer(renderer:Renderer):void {
        this.renderer = renderer;
    }

    draw():void {
        this.renderer?.render(this);
    }
}

class PngImage extends BaseImage {
    private data:ArrayBuffer;

    constructor(data:ArrayBuffer) {
        super();
        this.data = data;
    }
}

class SvgImage extends BaseImage {
    private points: {x:number, y:number}[];

    constructor(points: {x:number, y:number}[]) {
        super();
        this.points = points;
    }
}

class SimpleRenderer implements Renderer {
    render(image:BaseImage): void {
        console.log(`Just render ${image.constructor.name}`);
    }
}

class PrettyRenderer implements Renderer {
    render(image:BaseImage): void {
        console.log(`Render ${image.constructor.name} with effects`);
    }
}

const simpleRenderer = new SimpleRenderer();
const prettyRenderer = new PrettyRenderer();

const image = new SvgImage([]);
image.setRenderer(simpleRenderer);
image.draw();

const image1 = new PngImage(new ArrayBuffer(255));
image1.setRenderer(prettyRenderer);
image1.draw();

