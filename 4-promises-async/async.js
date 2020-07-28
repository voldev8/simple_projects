  // async...await is syntactic sugar built on native JavaScript promises and generators.
  // We declare an async function with the keyword async.
  // Inside an async function we use the await operator to pause execution of our function until an asynchronous action completes and the awaited promise is no longer pending .
  // await returns the resolved value of the awaited promise.
  // We can write multiple await statements to produce code that reads like synchronous code.
  // We use try...catch statements within our async functions for error handling.
  // We should still take advantage of concurrency by writing async functions that allow asynchronous actions to happen in concurrently whenever possible.

const shopForBeans = () => {
  return new Promise((resolve, reject) => {
	const beanTypes = ['kidney', 'fava', 'pinto', 'black', 'garbanzo'];
  setTimeout(()=>{
    let randomIndex = Math.floor(Math.random() * 5)
    let beanType = beanTypes[randomIndex];
    console.log(`I bought ${beanType} beans because they were on sale.`)
   resolve(beanType);
  }, 1000)
})
}

let soakTheBeans = (beanType) => {
   return new Promise((resolve, reject) => {
     console.log('Time to soak the beans.')
    setTimeout(()=>{
      console.log(`... The ${beanType} beans are softened.`)
      resolve(true)
      }, 1000)
  })
}

let cookTheBeans = (isSoftened) => {
  return new Promise((resolve, reject) => {
    console.log('Time to cook the beans.')
    setTimeout(()=>{
      if (isSoftened) {
        console.log('... The beans are cooked!')
        resolve('\n\nDinner is served!')
      }
    }, 1000)
  })
}

async function makeBeans() {
  let type = await shopForBeans();
  let isSoft = await soakTheBeans(type);
  let dinner = await cookTheBeans(isSoft);
  console.log(dinner)
}
makeBeans()

// try-catch with async
// async function hostDinnerParty() {
//   try {
//     let souffle = await cookBeanSouffle();
//     console.log(`${souffle} is served!`)
//   } catch(error){
//     console.log(error)
//     console.log(`Ordering a pizza!`)
//   }
// }
