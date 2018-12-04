const fs = require('fs');

module.exports = {
    writeToFile: (fileUri, positions) => {
        fs.writeFileSync(fileUri, '');

        const pos0Meta = positions[0].metadata.keys();
        const pos0Bins = positions[0].metadata.get('binsY');
        const pos0Length = positions[0].metadata.get('binYLength');

        for (const key of pos0Meta) {
            let line = key;
            for (const position of positions)
                line += `, ${position.metadata.get(key)}`;

            fs.appendFileSync(fileUri, `${line}\n`);
        }

        let probeDataOutput = 'Probe Data and Noise\n';
        for (let i = 0; i < pos0Bins; i++) {
            for (let j = 0; j < pos0Length; j++) {
                probeDataOutput += `${j}`;
                for (const position of positions)
                    probeDataOutput += `, ${position.probeData[i][j]}`;
                probeDataOutput += '\n';
            }
            probeDataOutput += '\n';
        }

        fs.appendFileSync(fileUri, probeDataOutput);

//        let probeNoiseOutput = 'Probe Noise\n';
        let probeNoiseOutput = '';
        for (let i = 0; i < pos0Bins; i++) {
            for (let j = 0; j < pos0Length; j++) {
                probeNoiseOutput += `${j}`;
                for (const position of positions)
                    probeNoiseOutput += `, ${position.probeNoise[i][j]}`;
                probeNoiseOutput += '\n';
            }
            probeNoiseOutput += '\n';
        }

        fs.appendFileSync(fileUri, probeDataOutput);

    }
};