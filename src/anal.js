function createAnal(){
    let counter = 0
    destroyed = false

    const listener = () => counter++

    document.addEventListener('click', listener)

    return {
        destroy(){
            document.removeEventListener('clicl', listener)
            destroyed = true
        },

        getClick(){
            if (destroyed){
                return 'Anal destroyed'
            }
            return counter
        }

    }
}

window.anal = createAnal()