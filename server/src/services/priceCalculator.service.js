const priceCalc =(cakeSize, qty)=>{
    switch(cakeSize){
        case "small":
            cakeSize = 1000;
            break;
        case "medium":
            cakeSize = 3000;
            break;
        case "large":
            cakeSize = 5000;
            break;
    }

   return price = cakeSize * qty;
}

module.exports = {
    priceCalc
}