class A {
    constructor() {
        console.log('...A')
        this.functions = {
            'xx': () => {}
        }
    }

    print() {
        console.log(this)
        console.log('A.print')
    }
}

class B extends A {
    constructor() {
        super()
        console.log('...B')
    }

    print() {
        console.log('B.print')
        super.print()
    }
}

b = new B()
b.print()

// function.caller
// a instanceof A
