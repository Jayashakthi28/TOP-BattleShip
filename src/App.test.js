import { gameData } from "./gameData";

describe('Initialize Board', () => {
  it('Board Initialized', () => {
    expect(gameData).not.toBe(null);
  });
});

describe('Check Placement', () => {
  it('Place 2*2 board 00->01', () => {
    expect(gameData.setShipinBoard(0,1,0,"horizontal")).toBe(true);
  });
  it('Place board Agian in 00->01', () => {
    expect(gameData.setShipinBoard(0,1,0,"horizontal")).toBe(false);
  });
  it('Place board in 10->11',()=>{
    expect(gameData.setShipinBoard(0,1,1,"horizontal")).toBe(false);
  });
  it('Place board in 02->03', () => {
    expect(gameData.setShipinBoard(2,3,0,'horizontal')).toBe(false);
  });
  it('Place board in 12->13', () => {
    expect(gameData.setShipinBoard(2,3,1,'horizontal')).toBe(false);
  });
  it('Place board in 22->23', () => {
    expect(gameData.setShipinBoard(2,3,2,'horizontal')).toBe(true);
  });
});