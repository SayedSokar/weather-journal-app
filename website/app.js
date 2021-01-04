//-------------- varibales defination----------------//
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=cc5bf4d3742aa3ac627686fffec215c2&units=metric';


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

//------------performAction-------------------------------//
function performAction(){
  const zip = document.getElementById('zip').value;
  const cunteryid = document.querySelector('#counteryid').value
  const feelings = document.getElementById('feelings').value
  getwez(baseURL, zip, cunteryid, apiKey)
    .then(function (data) {
      console.log('this is the data from weather web',data)
             
          postData('/addWezData', { temp: data.main.temp, cuntery: data.sys.country, city: data.name, dt: data.dt, feeling: feelings })
              
          updateUI()
    })
    
}
//----------------------Get the weather Data----------------//
const getwez = async (baseURL, zip, cunteryid, key) => {
    const res = await fetch(baseURL + zip + ',' + cunteryid + key)
      try {
      const data = await res.json();
      if (res.ok) {
        document.getElementById('msg').innerText =''
        return data
        
      } else {
        document.getElementById('msg').innerText = 'Zip code not found,Please Check Zip Code and try again' // play msg for the not found ZIP
        throw new Error('Zip code not found,Please Check Zip Code and try again');
        
      }
    } catch (error) {
      
      console.log(error);
      
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
    
          for (let i = existline.length; i < allData.length;i++) {
        
        let cuntDiv = createIndItem('', 'div', 'class', 'result','','') // to create cuntainer Div
        for (const [key, value] of Object.entries(allData[i])) {
          let itemTxt = value;
          let newDiv = createIndItem(itemTxt, 'div', 'class', 'dataItem', 'id', key)
          fragment.appendChild(newDiv);
        }
        
        cuntDiv.appendChild(fragment);
        titleDiv.after(cuntDiv)
              
      }
      
  }catch(error){
    console.log("error", error);
  }
}
//-------- End of Functions----------------//
  const generate= document.getElementById('generate')
  generate.addEventListener('click', performAction)
