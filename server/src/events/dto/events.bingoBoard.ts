export class BingoBoard{
    cell: Cell[][];
    result: RESULT;
    turn: boolean;

    constructor() {
        this.cell = [];
        this.result = RESULT.EMPTY;
        this.turn = false;
    }
}

export interface Cell{
    number: number;
    isSelected: boolean;
}

export enum RESULT {
    WIN = "WIN", EMPTY = "EMPTY"
}