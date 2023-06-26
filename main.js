// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// Invalid but all mastercards and one weird one, given my username it had to be mastercard 
const master1 = [5, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const master2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const master3 = [5, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const master4 = [5, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const master5 = [7, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// validate credit card number with Luhn algorithm
function validateCred(arr){  
    // set up a counter and placeholder for the checksum
    let count = 0, checkSum = 0;
    // loop through the array backwards
    for(let i = arr.length -1;i>=0;i--){
        // increment the counter
        count++;
        // if the counter is even multiply by 2 otherwise by 1 
        let num = arr[i]*(2-(count%2));
        // if 10 or over subtract 9
        if (num>=10){num -=9};
        // add the final number to the checksum
        checkSum +=num;
        

    }
    // true if the units digit of the checksum is 0 (checksum mod 10 is 0)
    return checkSum%10===0;
}

function findInvalidCards(arr){
    // filter to remove the valid cards
    return arr.filter(arr1 =>!validateCred(arr1))
}

function getCompany(arr){
    //simpekl switch statment to generate the company names
    switch(arr[0]){
        case 3 :
            return 'Amex (American Express)';
        case 4:
            return 'Visa';
        case 5:
            return 'Mastercard';
        case 6:  
            return'Discover';
        default:
            console.log ('Company not found');
            return false
            break; 

    }
}


function idInvalidCardCompanies(arr){
    // set up arry for output
    let arrInvalComps = [];
    // get the invalid cards
    let arrInvalCards = findInvalidCards(arr);
    // iterate through the invalid cards
    arrInvalCards.forEach(card => {
        // get the company
        let cardComp = getCompany(card);
        //check if the company is not in the oputput array also checks if the return is truthy to avoid not found companies
        if(cardComp && !arrInvalComps.some(comp=>comp===cardComp)){
            // ifs push the comany name to the output array. 
            arrInvalComps.push(cardComp);
        }
    });
    // return our list of companies
    return arrInvalComps;
}


// tests
// validateion

console.log(validateCred(valid1)); // should return true
console.log(validateCred(invalid1)); // should return false

// invalid cards
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Should return empty
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // should return everything
console.log(findInvalidCards(batch)); // tests all the numbers including the mysteries

// invalid card companies
console.log(idInvalidCardCompanies(([valid1, valid2, valid3, valid4, valid5])));
console.log(idInvalidCardCompanies([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers
console.log(idInvalidCardCompanies([master1, master2, master3, master4, master5])); // should print "mastercard" and also "Company notFound"


