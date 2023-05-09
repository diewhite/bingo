import { ShortId } from 'shortid';

export class Room {
    title: string;
    number : string;
    player1 : string;
    player2 : string;

    constructor() {
        this.number = ShortId.generate();
    }
};