"use strict";
const fs = require("fs");
const lines = readInputArray('./input.txt');

function check_nine(nums: number[]):boolean {
    //input: array of integers
    //output: TRUE if input contains all numbers from 1 to 9 once only
    if (nums.length !== 9) {
        return false;
    }
    for (let i = 1; i<=9; i++) {
        if (! nums.includes(i)) {
            return false;
        }
    }
    return true;
}

function check_table(sudoku: number[][]): boolean {
    //input: array of array of integers representing 9x9 sudoku board
    //output: TRUE if valid sudoku solution, otherwise FALSE
    //TODO Room for improvement: return error row/column/box

    //check columns
    for (let i = 0; i<sudoku[0].length; i++) {
        let row:number[] = [];
        sudoku.forEach(line => {
            row.push(line[i])
        });
        if (!check_nine(row)) {
            return false;
        }
    }

    //check rows
    for (let i = 0; i< sudoku.length; i++) {
        if (!check_nine(sudoku[i])) {
            return false;
        }
    }

    //check blocks
    const offs_x = [0,3,6];
    const offs_y = offs_x;
    let valid:boolean = true;
    offs_x.forEach(x => {
        offs_y.forEach(y => {
            //x, y contains offsets for array pointers
            const nums_to_check:number[] = [];
            for (let xx:number = 0; xx<3; xx++) {
                for (let yy:number = 0; yy<3; yy++) {
                    nums_to_check.push(sudoku[x+xx][y+yy]);
                }
            }
            if (valid && !check_nine(nums_to_check)){
                valid = false;
            }
        })
    })    

    return valid;
}

const sudoku = [];
lines.forEach(line => {
    sudoku.push(line.split(', ').map(x => parseInt(x,10)));
});

if (check_table(sudoku)) {
    console.log("Valid sudoku solution.");
}
else {
    console.log("Invalid sudoku solution.");
}

function readInputArray(path) {
    return fs.readFileSync(path, 'utf8').split(/\r?\n/);
}


