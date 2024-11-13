
const index = { 1: 'I', 5: 'V', 10: 'X', 100: 'C', 500: 'D', 1000: 'M' }

var romanToInt = function (s) {

    const input = s.split('')
    var numeros = []
    const ns = input.map((a) => {
        numeros = [...numeros, index[a]]
    })
    console.log(ns)

};

romanToInt("III") // 3