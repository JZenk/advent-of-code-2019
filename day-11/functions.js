const fs = require('fs');

const OPS = {
    1: {
      fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
        setAtAddress(
          nums,
          base,
          modeAddress,
          address,
          getNum(nums, base, mode1, num1) + getNum(nums, base, mode2, num2)
        ),
      params: 3
    },
    2: {
      fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
        setAtAddress(
          nums,
          base,
          modeAddress,
          address,
          getNum(nums, base, mode1, num1) * getNum(nums, base, mode2, num2)
        ),
      params: 3
    },
    3: {
      fn: (nums, base, [modeAddress], address, input) =>
        setAtAddress(nums, base, modeAddress, address, input.shift()),
      params: 1,
      input: true
    },
    4: {
      fn: (nums, base, [mode], num) => getNum(nums, base, mode, num),
      params: 1,
      output: true
    },
    5: {
      fn: (nums, base, [mode1, mode2], num1, num2) =>
        getNum(nums, base, mode1, num1) ? getNum(nums, base, mode2, num2) : null,
      params: 2,
      flow: true
    },
    6: {
      fn: (nums, base, [mode1, mode2], num1, num2) =>
        !getNum(nums, base, mode1, num1) ? getNum(nums, base, mode2, num2) : null,
      params: 2,
      flow: true
    },
    7: {
      fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
        setAtAddress(
          nums,
          base,
          modeAddress,
          address,
          getNum(nums, base, mode1, num1) < getNum(nums, base, mode2, num2) ? 1 : 0
        ),
      params: 3
    },
    8: {
      fn: (nums, base, [mode1, mode2, modeAddress], num1, num2, address) =>
        setAtAddress(
          nums,
          base,
          modeAddress,
          address,
          getNum(nums, base, mode1, num1) === getNum(nums, base, mode2, num2) ? 1 : 0
        ),
      params: 3
    },
    9: {
      fn: (nums, base, [mode], num) => base + getNum(nums, base, mode, num),
      params: 1,
      base: true
    }
};

const expandMemory = (nums, pos) =>
  pos >= nums.length && nums.push(...[...'0'.repeat(pos - nums.length + 1)].map(Number));

const getAtAddress = (nums, pos) => (expandMemory(nums, pos), nums[pos]);

const setAtAddress = (nums, base, mode, pos, value) => {
  pos = mode === 2 ? pos + base : pos;
  expandMemory(nums, pos);
  nums[pos] = value;
};

const getNum = (nums, base, mode, num) =>
  mode === 1 ? num : getAtAddress(nums, num + (mode === 2 ? base : 0));

const parseInput = input => input.toString().split(',').map(Number);

const readOp = code =>
    code
        .toString()
        .padStart(5, '0')
        .match(/(\d)(\d)(\d)(\d\d)/u)
        .slice(1)
        .map(Number)
        .reverse();


function* intCode(program, ...input) {
    let base = 0;
    let pos = 0;
    while (program[pos] !== 99) {
      const [op, ...modes] = readOp(program[pos]);
      const params = program.slice(pos + 1, pos + 1 + OPS[op].params);
      if (OPS[op].input) {
        const inp = yield;
        if (inp) input = Array.isArray(inp) ? inp : [inp];
      }
      const result = OPS[op].fn(program, base, modes, ...params, input);
      if (OPS[op].output) yield result;
      if (OPS[op].base) base = result;
      pos = OPS[op].flow && result != null ? result : pos + 1 + OPS[op].params;
    }
};

const DIRS = {
    UP: {x:0, y:-1},
    DOWN: {x:0, y:1},
    LEFT: {x:-1, y:0},
    RIGHT: {x:1, y:0},
};

const TURN = {
    UP: { 0: 'LEFT', 1: 'RIGHT'},
    DOWN: { 0: 'RIGHT', 1: 'LEFT'},
    LEFT: {0: 'DOWN', 1: 'UP'},
    RIGHT: {0: 'UP', 1: 'DOWN'},
};

const COLORS = {
    0: ',',
    1: '#',
    '#': 1,
    '.': 0,
};

const makeArray = (ySize, xSize, fill) => {
    const arr = [];
    for (let y = 0; y < ySize; y++) {
      if (xSize) {
        arr.push([]);
        for (let x = 0; x < xSize; x++) {
          arr[y].push(fill);
        }
      } else {
        arr.push(fill);
      }
    }
    return arr;
  };

const output2dArray = arr => arr.map(line => line.join('')).join('\n');

class Grid {
    constructor(fill) {
        this.fill = fill;
        this.grid = new Map();
    }

    get cells() {
        return [...this.grid.entries()]
          .map(([pos, value]) => [...pos.split(',').map(Number), value])
          .map(([x, y, value]) => ({ x, y, value }));
      }
    
      get bounds() {
        const cells = this.cells;
        return {
          min: {
            x: fastMin(cells.map(({ x }) => x)),
            y: fastMin(cells.map(({ y }) => y))
          },
          max: {
            x: fastMax(cells.map(({ x }) => x)),
            y: fastMax(cells.map(({ y }) => y))
          }
        };
      }
    
      toArray() {
        const { min, max } = this.bounds;
        const array = makeArray(max.y - min.y + 1, max.x - min.x + 1, this.fill);
        for (let y = min.y; y <= max.y; y++) {
          for (let x = min.x; x <= max.x; x++) {
            array[y - min.y][x - min.x] = this.get(x, y);
          }
        }
        return array;
      }
    
      key(x, y) {
        return `${x},${y}`;
      }
    
      set(x, y, value) {
        this.grid.set(this.key(x, y), value);
      }
    
      get(x, y) {
        return this.grid.has(this.key(x, y)) ? this.grid.get(this.key(x, y)) : this.fill;
      }
}


let data = fs.readFileSync('./day-11/input.txt');

const run = function*(start, visualize) {
    const pos = { x: 0, y: 0 };
    let dir = 'UP';
    const grid = new Grid('.');
    grid.set(0, 0, start);
  
    const program = intCode(parseInput(data.toString()));
    let value, done;
    let instructions = 0;
    while (!done) {
      ({ value, done } = program.next(COLORS[grid.get(pos.x, pos.y)]));
      if (value == null) continue;
  
      instructions++;
      if (instructions === 1) {
        grid.set(pos.x, pos.y, COLORS[value]);
        if (visualize) yield grid;
      } else {
        dir = TURN[dir][value];
        const { x, y } = DIRS[dir];
        pos.x += x;
        pos.y += y;
        instructions = 0;
      }
    }
    yield grid;
};

exports.Grid = Grid;
exports.run = run;
exports.output2dArray = output2dArray;
