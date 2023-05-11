import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventsGateway } from './events.gateway';
import { BingoBoard, Cell, RESULT } from './dto/events.bingoBoard';

describe('EventsService', () => {
  let eventsService: EventsService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [EventsService, EventsGateway],
    }).compile();

    eventsService = app.get<EventsService>(EventsService);
  });

  describe('win-check', () => {
    it('should return added result value of WIN', () => {
        const mockCell1: Cell = { number: 1, isSelected: true };
        const mockCell2: Cell = { number: 1, isSelected: false };
        
        const mockBoard: BingoBoard = {
            cell: Array.from(Array(5), () => Array(5).fill(mockCell1)),
            result: RESULT.EMPTY,
            turn: true,
        };

        const mockBoardRes: BingoBoard = {
            cell: Array.from(Array(5), () => Array(5).fill(mockCell1)),
            result: RESULT.WIN,
            turn: true,
        };
      expect(eventsService.checklogic(mockBoard)).toStrictEqual(mockBoardRes);
    });
  });

  describe('empty-check', () =>{
    it('should return added result value of EMPTY', () => {
        const mockCell1: Cell = { number: 1, isSelected: true };
        const mockCell2: Cell = { number: 1, isSelected: false };
        
        const mockBoard: BingoBoard = {
            cell: Array.from(Array(5), () => Array(5).fill(mockCell2)),
            result: RESULT.EMPTY,
            turn: true,
        };

        const mockBoardRes: BingoBoard = {
            cell: Array.from(Array(5), () => Array(5).fill(mockCell2)),
            result: RESULT.EMPTY,
            turn: true,
        };
      expect(eventsService.checklogic(mockBoard)).toStrictEqual(mockBoardRes);
    });
  });
});
