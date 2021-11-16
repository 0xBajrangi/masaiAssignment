function sumMatrix(m,n,mat1,mat2){
    let sum = [];
    for (let i = 0; i < m;i++){
        let temp = [];
        for (let j = 0; j<n;j++){
            let sum = mat1[i][j] + mat2[i][j];
            temp.push(sum);
        }
        sum.push(temp)
        
    }
    return sum;

}

module.exports = sumMatrix;