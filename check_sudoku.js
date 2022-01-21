"use strict";
var fs = require("fs");
var lines = readInputArray('./input.txt');
function check_nine(nums) {
    //input: array of integers
    //output: TRUE if input contains all numbers from 1 to 9 once only
    if (nums.length !== 9) {
        return false;
    }
    for (var i = 1; i <= 9; i++) {
        if (!nums.includes(i)) {
            return false;
        }
    }
    return true;
}
function check_table(sudoku) {
    //input: array of array of integers representing 9x9 sudoku board
    //output: TRUE if valid sudoku solution, otherwise FALSE
    //TODO Room for improvement: return error row/column/box
    var _loop_1 = function (i) {
        var row = [];
        sudoku.forEach(function (line) {
            row.push(line[i]);
        });
        if (!check_nine(row)) {
            return { value: false };
        }
    };
    //check columns
    for (var i = 0; i < sudoku[0].length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    //check rows
    for (var i = 0; i < sudoku.length; i++) {
        if (!check_nine(sudoku[i])) {
            return false;
        }
    }
    //check blocks
    var offs_x = [0, 3, 6];
    var offs_y = offs_x;
    var valid = true;
    offs_x.forEach(function (x) {
        offs_y.forEach(function (y) {
            //x, y contains offsets for array pointers
            var nums_to_check = [];
            for (var xx = 0; xx < 3; xx++) {
                for (var yy = 0; yy < 3; yy++) {
                    nums_to_check.push(sudoku[x + xx][y + yy]);
                }
            }
            if (valid && !check_nine(nums_to_check)) {
                valid = false;
            }
        });
    });
    return valid;
}
var sudoku = [];
lines.forEach(function (line) {
    sudoku.push(line.split(', ').map(function (x) { return parseInt(x, 10); }));
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
