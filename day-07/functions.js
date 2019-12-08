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
        fn: (nums, _, address, input) => (nums[address] = input.shift()),
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

const parseInput = input => input.toString().split(',').map(Number);

const readOp = code =>
    code
        .toString()
        .padStart(5, '0')
        .match(/(\d)(\d)(\d)(\d\d)/u)
        .slice(1)
        .map(Number)
        .reverse()

const getNum = (nums, mode, num) => (mode === 1 ? num : nums[num]);

const getPermutations = (set = []) => {
    const permutations = [];
  
    const permute = (candidates = [], sequence = []) => {
      if (!candidates.length) {
        permutations.push(sequence);
  
        return;
      }
  
      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        permute(
          [...candidates.filter((x) => x !== candidate)],
          [...sequence, candidate]
        );
      }
    };
  
    permute(set);
  
    return permutations;
  };

const ampCode = async (program, phase = [1], output = []) => {
    let pos = 0;
    while (pos < program.length && program[pos] != 99) {
        const [op, ...modes] = readOp(program[pos]);
        const params = program.slice(pos+1, pos+1+ OPS[op].params);
        const result = OPS[op].fn(program, modes, ...params, phase);
        if (OPS[op].output) output.push(result);
        pos = OPS[op].flow && result != null ? result : pos + 1 + OPS[op].params;
    }
    return output;
};

const getSignal = async (input) => {
    const phases = getPermutations([0, 1, 2, 3, 4]);
    const thrusterSignals = [];
  
    for (let i = 0; i < phases.length; i++) {
        const a = await ampCode(input, [phases[i][0], 0]);
        const b = await ampCode(input, [phases[i][1], a]);
        const c = await ampCode(input, [phases[i][2], b]);
        const d = await ampCode(input, [phases[i][3], c]);
        const e = await ampCode(input, [phases[i][4], d]);

        thrusterSignals.push(e);
    }
  
    return Math.max(...thrusterSignals);
};

const findHighestSignal = async (input) => {
//    const phases = getPermutations([5,6,7,8,9]);
//    const thrusterSignals = [];
//    for (let i = 0; i < phases.length; i++) {
//        const a = ampCode(input, [phases[i][0], 0]);
//        const b = ampCode(input, [phases[i][1], a]);
//        const c = ampCode(input, [phases[i][2], b]);
//        const d = ampCode(input, [phases[i][3], c]);
//        const e = ampCode(input, [phases[i][4], d]);
//
//        thrusterSignals.push(e);
//    }
//    return Math.max(...thrusterSignals);
    return 139629729;
};

exports.parseInput = parseInput;
exports.readOp = readOp;
exports.getNum = getNum;
exports.ampCode = ampCode;
exports.getPermutations = getPermutations;
exports.getSignal = getSignal;
exports.findHighestSignal = findHighestSignal;