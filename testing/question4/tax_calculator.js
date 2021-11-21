function tax_calulator(income, saving) {

    let total_income = income + saving;
    let rebate;
    //rules for rebate
    if (total_income < 500000) {
      rebate= 50 / 100 * saving;
        
    }else if (total_income < 1000000){
        rebate= 30 / 100 * saving;
        
    }else{
        rebate= 10 / 100 * saving;
    }

    if(rebate>50000){
        total_income -=50000;
    }else{
        total_income -= rebate;
    }

//calculating tax
    if (total_income <= 250000) {
        return "No tax"
    } else if (total_income > 250000 && total_income < 500000) {
        return 10 / 100 * total_income;

    } else if (total_income >= 500000 && total_income < 1000000) {
        return 20/100 * total_income;
    } else if (total_income >= 1000000) {
        return 30/100 * total_income
    }

}


module.exports = tax_calulator;