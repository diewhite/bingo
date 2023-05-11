import { Injectable } from '@nestjs/common';
import { RESULT, BingoBoard, Cell } from './dto/events.bingoBoard';

@Injectable()
export class EventsService {
    createBoard(): BingoBoard{
        const bingoBoard:BingoBoard = new BingoBoard();
        const numbers = Array.from({ length: 25 }, (_, index) => index + 1);
        const shuffledNumbers = shuffleArray(numbers);
        
        for (let i = 0; i < 5; i++) {
            const cell:Cell[] = [];
            for (let j = 0; j < 5; j++) {
                const index:number = (i*5)+j;
                cell.push({number : shuffledNumbers[index], isSelected : false})
            }
            bingoBoard.cell.push(cell);
        }
        
        return bingoBoard;
    }

    checklogic(data:BingoBoard):BingoBoard{
        const userData: BingoBoard = data;
        const columSize: number = userData.cell.length;
        const rowSize: number = userData.cell[0].length;

        let completeLine: number = 0;

        //rows check
        for (let i = 0; i < columSize; i++) {
            let xChecked:number = 0;
            for (let j = 0; j < rowSize; j++) {
                if(userData.cell[i][j].isSelected) {
                    xChecked++;
                }
            }
            if(xChecked===5){
                completeLine++;
            }
        }

        //colums check
        for (let i = 0; i < rowSize; i++) {
            let yChecked:number = 0;
            for (let j = 0; j < columSize; j++) {
                if(userData.cell[j][i].isSelected) {
                    yChecked++;
                }
            }
            if(yChecked===5){
                completeLine++;
            }
        }

        //cross-line check-1
        if(userData.cell[0][0] && userData.cell[1][1] && userData.cell[2][2] && userData.cell[3][3] && userData.cell[4][4]) {
            completeLine++;
        }
        //cross-line check-2
        if(userData.cell[0][4] && userData.cell[1][3] && userData.cell[2][2] && userData.cell[3][1] && userData.cell[4][0]) {
            completeLine++;
        }
        

        //result check
        if(completeLine>=3){
            userData.result = RESULT.WIN;
        }

        return userData;
    }
}

function shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }