export {};
import * as fs from 'fs';

// The path and the content to write
const filePath = 'results.txt';

//if no point set and 2, 3, or 12 rolled, insant loss on pass line
const crapsNumbers: number[] = [2, 3, 12]
//if no point set and 7 or 11 rolled, instant win on pass line
const winningNumbers: number[] = [7, 11]
//run 1 million trials to determine house edge on pass line
const numTrials: number = 1000000


let diceRollSum: number;
let results: number[] = [];

for (let i = 0; i < 100; i++){

    //let curBalance so on a win, goes up by 1 and on a loss goes down by 1 (push is impossible on pass line)
    let curBalance: number = 1000000    

    for (let j = 0; j < numTrials; j++) {

        let point: number;
        let gameOver: boolean = false;

        diceRollSum = generateCrapsDiceRoll();
        //console.log(diceRollSum)

        if (crapsNumbers.includes(diceRollSum)) {
            //console.log("craps, game over");
            curBalance -= 1;
            continue;
        }

        else if (winningNumbers.includes(diceRollSum)) {
            //console.log("winner");
            curBalance += 1;
            continue;
        }

        point = diceRollSum;
        //console.log("point set at:" + diceRollSum);

        //at this point if pass line has already been won or lost, this will be skipped and another round will begin
        while (!gameOver) {

            diceRollSum = generateCrapsDiceRoll();
            if (!(diceRollSum == point || diceRollSum == 7)) {
                continue;
            }
            
            //exit while loop because either a 7 or the point number has been rolled and therefore the game is over
            gameOver = true;
            //point rolled before 7 so increase balance by 1
            if (diceRollSum == point) {
                curBalance += 1
            }
            //7 rolled before point so decrease balance by 1
            else {
                curBalance -= 1
            }

        }

    }
    results.push(curBalance)

}

let stringToWrite: string = "";
for (const result of results) {
    stringToWrite += result + "\n"
}

// Write the content to the file
fs.writeFileSync(filePath, stringToWrite, 'utf8');

function generateCrapsDiceRoll(): number {
    return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
}