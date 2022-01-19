const sortFnc = (sortParam) => (a, b) => {
  if(a[sortParam] < b[sortParam]) {
    return -1
  } else if(a[sortParam] > b[sortParam]) {
    return 1
  }
  return 0
}

const reduceFnc = (arr)=>arr.reduce((totalHeight, height) => totalHeight + Math.round(height),0)

const helpers = {
  sortFnc,
  reduceFnc
};

module.exports = helpers
