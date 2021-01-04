//-------------- varibales defination----------------//
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = ',us&appid=cc5bf4d3742aa3ac627686fffec215c2';
const resultDiv = document.querySelector('.resContainer')
console.log(resultDiv)
const fragment = document.createDocumentFragment();
const titleDiv = document.querySelector('.title')
//-----------Helper Functions----------------//
//-------------- Create new Indication Item---------------------//
function createIndItem(itemTxt, elementType, attName, attValue, attName1, attValue1) {
    let newElement = document.createElement(elementType);
    newElement.innerText = itemTxt;
  newElement.setAttribute(attName, attValue)
  if (attName1 !== '') {
    newElement.setAttribute(attName1, attValue1)
  }
    return newElement;
};
//----------- Create -----------//
//------------performAction-------------------------------//
function performAction(){
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value
  getwez(baseURL, zip, apiKey)
    .then(function (data) {
      console.log('this is the data from weather web',data)
      // if (typeof data != "undefined") {

        
          postData('/addWezData', { temp: data.main.temp, cuntery: data.sys.country, city: data.name, dt: data.dt, feeling: feelings })
      console.log('post done')
        //.then(function (newData) {
          updateUI()
        //})
          
      
        
      // } else {

        //console.log('No POST data to the server');
        
      // }
      //console.log(data)
      
    })
    // .then(
    //   updateUI()
    // )
}
//------------------------------------------------//
const getwez = async (baseURL, zip, key) => {
  //console.log(baseURL+zip+key)
  const res = await fetch(baseURL + zip + key)
  
    try {
      const data = await res.json();
      if (res.ok) {
        document.getElementById('msg').innerText =''
        return data
        
      } else {
        document.getElementById('msg').innerText = 'Zip code not found,Please Check Zip Code and try again'
        throw new Error('Zip code not found,Please Check Zip Code and try again');
        
      }
    } catch (error) {
      //document.getElementById('msg').innerHTML = 'zip code not found please enter a valid zip code'
      console.log(error);
      // appropriately handle the error
    }
}
//----------------------------------------------//
//-----------------POST DATA Function-------//
const postData = async ( url, data = {})=>{
      const res = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await res.json();
        console.log('this is the POST Response *******',newData);
        return newData;
      }catch(error) {
      console.log("this is catch error", error);
      }
  }
//-----------------updateUI---------------------//
const updateUI = async () => {
  const res = await fetch('/retriveData');
  try{
    const allData =  await res.json();
    console.log('this is the Length----++++++', allData.length)
    const existline = document.querySelectorAll('.result')
    console.log(existline.length)
    
    
    if (allData.length > 0) {
      for (let i = existline.length; i < allData.length;i++) {
        //console.log(allData.length-1)
        let cuntDiv = createIndItem('', 'div', 'class', 'result','','') // to create cuntainer Div
        for (const [key, value] of Object.entries(allData[i])) {
          let itemTxt = value;
          let newDiv = createIndItem(itemTxt, 'div', 'class', 'dataItem', 'id', key)
          fragment.appendChild(newDiv);
        }
        
        cuntDiv.appendChild(fragment);
        titleDiv.after(cuntDiv)
        //resultDiv.appendChild(cuntDiv);


      //   document.getElementById('date').innerHTML = allData[allData.length-1].dt;
      //   document.getElementById('cuntery').innerHTML = allData[allData.length-1].cuntery;
      // document.getElementById('city').innerHTML = allData[allData.length-1].city;
      // document.getElementById('temp').innerHTML = allData[allData.length-1].temp;
      // document.getElementById('content').innerHTML = allData[allData.length-1].feeling;
      // document.getElementById('date1').innerHTML = allData[allData.length-2].dt;
      //   document.getElementById('cuntery1').innerHTML = allData[allData.length-2].cuntery;
      // document.getElementById('city1').innerHTML = allData[allData.length-2].city;
      // document.getElementById('temp1').innerHTML = allData[allData.length-2].temp;
      // document.getElementById('content1').innerHTML = allData[allData.length-2].feeling;
      }
      
    } else {
      console.log('length is zero')
      updateUI()
      //performAction()
      //console.log(res.body.json())
    }

  }catch(error){
    console.log("error", error);
  }
}
//-------- End of Functions----------------//
  const generate= document.getElementById('generate')
  generate.addEventListener('click', performAction)
