export default function (location) {
  const searchObj = {};
  if (location && location.search) {
    let search = location.search.replace('?', '');
    search = search.split('&');
    search.map(item => {
      const item_arr = item.split('=');
      if(item_arr.length===2){
        searchObj[item_arr[0]] = item_arr[1];
      }
    });
  }
  return searchObj;
}