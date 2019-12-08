const parseInput = input =>
  input
    .toString()
    .split('\n')
    .map(s => s.split(')'))
    .reduce((acc, [value, key]) => ({ ...acc, [key]: value.trim() }), {});

const getOrbits = (orbits, name) => (orbits[name] ? 1 + getOrbits(orbits, orbits[name]) : 0); 

const getSystem = (orbits) => {
    return (
        Object.keys(orbits)
        .map(name => getOrbits(orbits, name))
        .reduce((acc, total) => acc + total, 0)
    );
};

const getGraph = orbits =>
  Object.entries(orbits).reduce((acc, [key, value]) => {
    acc[key] = acc[key] || [];
    acc[value] = acc[value] || [];
    acc[key].push(value);
    acc[value].push(key);
    return acc;
}, {});

const minBy = cb => (a, b) => (cb(b) < cb(a) ? b : a);

const dijkstra = (graph, source) => {
    const nodes = new Set(Object.keys(graph));
    const dist = new Map();
    const prev = new Map();
  
    [...nodes].forEach(node => dist.set(node, Infinity));
    dist.set(source, 0);
  
    while (nodes.size) {
      const closest = [...nodes].reduce(minBy( n => dist.get(n)));
      nodes.delete(closest);
      graph[closest].forEach(neighbor => {
        const alt = dist.get(closest) + 1;
        if (alt < dist.get(neighbor)) {
          dist.set(neighbor, alt);
          prev.set(neighbor, closest);
        }
      });
    }
  
    return [dist, prev];
  };

exports.parseInput = parseInput;
exports.getSystem = getSystem;
exports.getOrbits = getOrbits;
exports.getGraph = getGraph;
exports.dijkstra = dijkstra;