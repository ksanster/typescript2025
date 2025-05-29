declare module "*.png" {
    const File: {
        name: string;
        size: number;
        path: string;
    };

    export default File;
}

import ("./foo.png").then((value) => {
    const { name, size, path } = value.default;
    console.log(name, size, path);
});
