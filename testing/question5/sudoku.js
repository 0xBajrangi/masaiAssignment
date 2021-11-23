 function checkSquare(arr,r, c, choice) {
        let row = Math.floor(r / 3) * 3;
        let col = Math.floor(c / 3) * 3;

        //check in square
        for (let i = row; i < row + 3; i++){
            for (let j = col; j < col + 3; j++){
            
                if (arr[i][j] === choice) {
                

                    return false;
                }
            }

        }
        //check in row;
        for (let i = 0; i < 9; i++){

            
            if (arr[r][i] === choice) {
               
                return false;
            }
        }
        //check in column
        for (let i = 0; i < 9; i++){
          
            if (arr[i][c] === choice) {
              
                return false;
            }
        }
        return true;
    }

    function solve(pos_fill,arr, curr) {

        
        if (curr === pos_fill.length) {
        //      for (let el of arr) {
            
        //     console.log(el.join(' '));
        // }
            ans = arr;
            flag = true;
            return arr ;
        }

        let curr_i = pos_fill[curr][0];
        let curr_j = pos_fill[curr][1];
        for (let choice = 1; choice < 10; choice++) {
          
          
            if (checkSquare(arr,curr_i, curr_j, choice)) {

               arr[curr_i][curr_j] = choice;
                ans = solve(arr, curr + 1);
                 arr[curr_i][curr_j]= 0;
            }

        }
        return ans;

         
    }
function sudoku(arr) {
    //find the elments with positon 0
    let ans;
      arr = arr.trim().split('\n').map((el) => {
       return  el.trim().split(' ').map(Number)
    });

    let flag = false;
    let pos_fill = [];
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            
            if (arr[i][j] === 0) {
                
                pos_fill.push([i,j]);
            }
        }
    }
    
    return solve(pos_fill, arr, 0);

}
console.log(sudoku(`0 4 0 0 0 0 1 7 9 
0 0 2 0 0 8 0 5 4 
0 0 6 0 0 5 0 0 8 
0 8 0 0 7 0 9 1 0 
0 5 0 0 9 0 0 3 0 
0 1 9 0 6 0 0 4 0 
3 0 0 4 0 0 7 0 0 
5 7 0 1 0 0 2 0 0 
9 2 8 0 0 0 0 6 0`))

module.exports = sudoku;




