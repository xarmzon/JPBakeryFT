const  priceCalc = (size, quantity) =>{
    switch(size){
        case "small":
            size = 1000;
            break;
        case "medium":
            size = 3000;
            break;
        case "large":
            size = 5000;
            break;
    }
    price = size * quantity;
    return price;
}

module.exports = priceCalc