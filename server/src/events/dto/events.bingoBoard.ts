export class BingoBoard{
    cell: Cell[][];
    result: RESULT;
    turn: boolean;
}

export interface Cell{
    number: number;
    isSelected: boolean;
}

export enum RESULT {
    WIN = "WIN", EMPTY = "EMPTY"
}