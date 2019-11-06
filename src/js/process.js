class Process {
    constructor () {
        this._remainingCycles = Math.ceil(Math.random() * 11) + 3;
    };

    get remainingCycles () {
        return Number(this._remainingCycles);
    }

    set remainingCycles (newValue) {
        this._remainingCycles = newValue;
    }
}

export default Process;