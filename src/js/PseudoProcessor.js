import Process from './process.js';

class PseudoProcessor {
    constructor (cycles) {
        this._cycles = cycles;
        this._first = null;
        this._noProcess = 0;
    }

    startProcessing = () => {
        this._first = null;
        this._noProcess = 0;
        let clocktimes = 0;
        let emptyTimes = 0;
        let maxProcessNumber = 0;
        let attendedProcess = 0;
        let currentProcess = this._first;

        do {
            this._spawnProcess();

            if (currentProcess) {
                currentProcess.data.remainingCycles--;
                currentProcess = currentProcess.next;
                console.log(currentProcess.prev.data.remainingCycles);
                if (currentProcess.prev.data.remainingCycles === 0) {
                    if (this._finishProcess(currentProcess)) {
                        currentProcess = null;
                    }
                    attendedProcess++;
                }

            } else {
                emptyTimes++;
                currentProcess = this._first;
            }

            if (this._noProcess > maxProcessNumber){
                maxProcessNumber = this._noProcess;
            }

            clocktimes++;
        } while (clocktimes <= 300);

        let remainingProcess = this._noProcess;
        let remainingCycles = this._calculateRemainingCycles();

        return {
            emptyTimes,
            maxProcessNumber,
            remainingCycles,
            remainingProcess,
            attendedProcess,
        };
    };

    _spawnProcess = () => {
        let probability = Math.ceil(Math.random() * 100);
        if (probability <= 39) {
            let current = this._first;
            if (current) {
                let temp = {prev: current.prev, data: new Process(), next: current};
                current.prev = temp;
                current.prev.prev.next = temp;

            } else {
                this._first = {prev: this._first, data: new Process(), next: this._first};
                this._first.next = this._first;
                this._first.prev = this._first;
            }
            this._noProcess++;
        }
    };

    _finishProcess = (process) => {
        if (this._noProcess === 1){
            this._first = null;
            return true;
        } else if (process.prev === this._first){
            this._first = process.next;
            process.prev = process.prev.prev;
            process.prev.next = process;
        } else{
            process.prev = process.prev.prev;
            process.prev.next = process;
        }
        this._noProcess--;
    };

    _calculateRemainingCycles = () => {
        let remainingC = 0;
        let current = this._first;
        console.log(this._first);
        do {
            //console.log(current.data)
            remainingC += current.data.remainingCycles;
            current = current.next;
        } while(current !== this._first);
        return remainingC;
    };
}

export default PseudoProcessor;