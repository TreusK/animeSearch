//Helper functions
function formIsEmpty(obj) {
  let isEmpty = true;
  for (let key in obj) {
      if (obj[key] !== '' && obj[key] != 1) { isEmpty = false }
  };
  return isEmpty;
}

function constructQuery(obj) {
  let inputQuery = (obj.input !== '') ? `q=${obj.input}&` : '';
  let genreQuery = (obj.genre !== '') ? `genres=${obj.genre}&` : '';
  let yearsQuery = (obj.year !== '') ? `start_date=${obj.year}&end_date=${+obj.year+1}&` : '';
  let pageQuery = (obj.currentPage !== 1) ? `page=${obj.currentPage}&` : '';
  let orderQuery = 'order_by=mal_id&';
  return (inputQuery + genreQuery + yearsQuery + orderQuery + pageQuery);
}

//Helper function to filter the names from the api
function checkWords(title, wordsArr) {
  let containsAll = true;
  if(title === null) {
      containsAll = false;
      return;
  }
  for(let word of wordsArr) {
      if(!title.toLowerCase().includes(word.toLowerCase())) {
          containsAll = false
      }
  }
  return containsAll;
}

export {formIsEmpty, constructQuery, checkWords}