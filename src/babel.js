async function start() {
    return await Promise.resolve("Its work")
}

start().then(console.log)

class Util {
    static Id = Date.now()
}
