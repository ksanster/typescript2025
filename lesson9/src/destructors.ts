import * as fs from "node:fs"
import * as fsPromises from "node:fs/promises"

namespace syncDestructors {
    class File {
        constructor(public fd: number) {}

        [Symbol.dispose]() {
            fs.closeSync(this.fd);
        }
    }

    {
        using file = new File(fs.openSync("./example.txt", "w"));
        using file2 = new File(fs.openSync("./example2.txt", "r"));

        fs.writeSync(file.fd, "test");
        fs.writeSync(file2.fd, "test"); // Исключение, но все файловые дескрипторы должны закрыться
    }

}

namespace asyncDestructors {

    class File {
        constructor(public handle: fsPromises.FileHandle) {}

        [Symbol.asyncDispose]() {
            return this.handle.close();
        }
    }

    (async () => {
            await using file = new FileAsync(await fsPromises.open("./example.txt", "w"));
            await using file2 = new FileAsync(await fsPromises.open("./example2.txt", "r"));

        await file.handle.write("test");
        await file2.handle.write("test"); // Исключение, но все файловые дескрипторы должны закрыться
    })();
}
