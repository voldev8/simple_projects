// What is a Promise?
//
// Promises are objects that represent the eventual outcome of an asynchronous operation. A Promise object can be in one of three states:
//
//     Pending: The initial state— the operation has not completed yet.
//     Fulfilled: The operation has completed successfully and the promise now has a resolved value.
// For example, a request’s promise might resolve with a JSON object as its value.
//     Rejected: The operation has failed and the promise has a reason for the failure. This reason is usually an Error of some kind.


const checkAvailability = (itemName, distributorName) => {
    console.log(`Checking availability of ${itemName} at ${distributorName}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (restockSuccess()) {
                console.log(`${itemName} are in stock at ${distributorName}`)
                resolve(itemName);
            } else {
                reject(`Error: ${itemName} is unavailable from ${distributorName} at this time.`);
            }
        }, 1000);
    });
};

// This is a function that returns true 80% of the time
// We're using it to simulate a request to the distributor being successful this often
function restockSuccess() {
    return (Math.random() > .2);
}

const onFulfill = (itemsArray) => {
  console.log(`Items checked: ${itemsArray}`);
  console.log(`Every item was available from the distributor. Placing order now.`);
};

const onReject = (rejectionReason) => {
	console.log(rejectionReason);
};

// Write your code below:

const checkSunglasses = checkAvailability('sunglasses', 'Favorite Supply Co.');
const checkPants = checkAvailability('pants', 'Favorite Supply Co.');
const checkBags = checkAvailability('bags', 'Favorite Supply Co.');

Promise.all([checkSunglasses, checkPants, checkBags])
  .then(onFulfill)
  .catch(onReject);
