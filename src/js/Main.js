import PseudoProcessor from './PseudoProcessor.js';

class Main {
    constructor () {
        this._processor = new PseudoProcessor(300);
        document.getElementById('btnStart').addEventListener('click', this._startProcessor);
    }

    _startProcessor = () => {
        let result = this._processor.startProcessing();
        this._generateReport(result);
    };

    _generateReport = (result) => {
        console.log(result);
    };

}

let main = new Main();