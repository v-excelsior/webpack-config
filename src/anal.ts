function createAnal(): object {
    let counter = 0,
        destroyed: boolean = false

    const listener = (): number => counter++

    document.addEventListener('click', listener)

    return {
        destroy() {
            document.removeEventListener('clicl', listener)
            destroyed = true
        },

        getClick() {
            if (destroyed) {
                return 'Anal destroyed'
            }
            return counter
        }

    }
}

window['anal'] = createAnal()