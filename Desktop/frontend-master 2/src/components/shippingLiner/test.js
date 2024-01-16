const baddies = ["ifechi", "esther", "seun", "zainab", "meme", "ogo"];
const newbaddies = [];
//@ts-ignore
baddies.slice(baddies.indexOf(baddies[1]), baddies.length - 1).map((item) => {
  newbaddies.push(item);
});

// console.log(newbaddies);
// console.log(baddies[1])
