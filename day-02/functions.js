const gravityAssist = ( input ) => {
    let arr = input.map(Number);
    let length = arr.length;

    for (let i = 0; i < length; i += 4 ){
        let opcode = arr[i];
        let a = arr[i+1];
        let b = arr[i+2];
        let c = arr[i+3];

        if (opcode == 1) {
            arr[c] = arr[a] + arr[b];
        } else if (opcode == 2) {
            arr[c] = arr[a] * arr[b];
        } else if (opcode == 99) {
            break;
        }
    }

    return arr;
};

exports.gravityAssist = gravityAssist;