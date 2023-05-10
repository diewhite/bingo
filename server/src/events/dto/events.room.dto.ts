import * as shortid from 'shortid';

export class Room {
    title: string;
    number : string;
    player1 : string;
    player2 : string;

    constructor() {
        this.title = '';
        this.number = shortid.generate();
        this.player1 = '';
        this.player2 = '';
    }
};