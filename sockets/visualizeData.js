const fetch = require('node-fetch')

module.exports = async function (socket) {
  let index = 0;
  let Open = [];
  let High = [];
  let Low = [];
  let Close = [];
  let Volume = [];

 
 let responseData = await getThirdPartyCall();
 setInterval(async ()=>{
  index++
   index == responseData.data.length ? index = 0 : index
   let obj = responseData.data[index]
   Open.push({x: obj.date, y: obj.open});
   High.push({x: obj.date, y: obj.high});
   Low.push({x: obj.date, y: obj.low});
   Close.push({x: obj.date, y: obj.close});
   Volume.push({x: obj.date, y: obj.volume});
   let data = {
     Open,
     High, 
     Low,
     Close,
     Volume
   }
   socket.emit('visualizeData', data);
 },3000);


};
async function getThirdPartyCall() {
  let responseData = await fetch('http://api.marketstack.com/v1/eod?access_key=e96e230697ccbb66d51c1146093c19ab&symbols=AAPL', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then(response => {
    return response.json();
  }).catch(err => {console.log(err);});
 return responseData;
}