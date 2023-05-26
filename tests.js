class A {
    b;
    c() {
        console.log('hello')
    }
}
function bb($) { with($) { b=456 }  }
a = new A();
[a].forEach(($) => { with($) { b = 789; c() } })

console.log(a.b)

// for with to work, variables must be pre-declared on the class

function K_step($) {
    with($) {
        b = 123
    }
}

class K {
    b;
    step() {
        K_step(this)
    }
}

k = new K()
k.step()

console.log(k.b)