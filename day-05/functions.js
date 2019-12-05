const parseInput = (input) => input.toString().split(',').map(Number);

const getNum = (nums, mode, num) => (mode === 1 ? num : nums[num]);

const OPS = {
    1: {
        fn: (nums, [mode1, mode2], num1, num2, address) =>
        (nums[address] = getNum(nums, mode1, num1) + getNum(nums, mode2, num2)),
        params: 3
    },
    2: {
        fn: (nums, [mode1, mode2], num1, num2, address) =>
        (nums[address] = getNum(nums, mode1, num1) * getNum(nums, mode2, num2)),
        params: 3
    },
    3: {
        fn: (nums, _, address, input) => (nums[address] = input),
        params: 1
    },
    4: {
        fn: (nums, [mode], num) => getNum(nums, mode, num),
        params: 1,
        output: true
    },
    5: {
        fn: (nums, [mode1, mode2], num1, num2) =>
        getNum(nums, mode1, num1) ? getNum(nums, mode2, num2) : null,
        params: 2,
        flow: true
    },
    6: {
        fn: (nums, [mode1, mode2], num1, num2) =>
        !getNum(nums, mode1, num1) ? getNum(nums, mode2, num2) : null,
        params: 2,
        flow: true
    },
    7: {
        fn: (nums, [mode1, mode2], num1, num2, address) =>
        (nums[address] = getNum(nums, mode1, num1) < getNum(nums, mode2, num2) ? 1 : 0),
        params: 3
    },
    8: {
        fn: (nums, [mode1, mode2], num1, num2, address) =>
        (nums[address] = getNum(nums, mode1, num1) == getNum(nums, mode2, num2) ? 1 : 0),
        params: 3
    },
};

const readOp = code =>
    code
        .toString()
        .padStart(5, '0')
        .match(/(\d)(\d)(\d)(\d\d)/u)
        .slice(1)
        .map(Number)
        .reverse();

const run = (program, input = 1) => {
    const output = [];
    let pos = 0;
    while (pos < program.length && program[pos] != 99) {
        const [op, ...modes] = readOp(program[pos]);
        const params = program.slice(pos+1, pos+1+ OPS[op].params);
        const result = OPS[op].fn(program, modes, ...params, input);
        if (OPS[op].output) output.push(result);
        pos = OPS[op].flow && result != null ? result : pos + 1 + OPS[op].params;
    }
    return output;
};

exports.run = run;
exports.readOp = readOp;
exports.OPS = OPS;
exports.getNum = getNum;
exports.parseInput = parseInput;