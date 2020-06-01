async function start() {
    return await Promise.resolve('Its work')
}
let promiseTest = document.createElement('p')
promiseTest.classList.add('center')
start().then( res => promiseTest.textContent =  res)
document.body.appendChild(promiseTest)
