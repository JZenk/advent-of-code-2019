const getLayers = ( input , width, height ) => {
    const layers = [];
    const bits = input.split('').map(Number);

    for (let x = 0; x < input.length; x += width * height) {
        layers.push(bits.slice(x, x + width * height));
    }
    return layers;
};

const fewestZeros = input => {
    let minLayer = input.map((layer) => {
        return {
            zeros: layer.filter((bit) => bit === 0).length,
            ones: layer.filter((bit) => bit === 1).length,
            twos: layer.filter((bit) => bit === 2).length,
        };
    })
    .sort((a, b) => a.zeros - b.zeros);

    return minLayer;
};

const getPixels = (input, width, height) => {
    const pixels = [];
    for (let i = 0; i < width * height; i++) {
        const layeredPixels = input.map((layer) => layer[i]);

        for (let p = 0; p < layeredPixels.length; p++) {
            if (layeredPixels[p] !== 2) {
                pixels.push(layeredPixels[p]);
                break;
            }
        }
    }
    return pixels;
};

const getImage = (input, width, height) => {
    const image = [];

    for (let i = 0; i < width * height; i += width) {
        image.push(input.slice(i, i + width));
    }

    return image
        .map((row) => row
        .map((c) => c === 0 ? ' ' : 'X')
        .join(''))
        .join('\n');
};

exports.getLayers = getLayers;
exports.fewestZeros = fewestZeros;
exports.getPixels = getPixels;
exports.getImage = getImage;