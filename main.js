const cryptoOptions = async () => {
  const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  const response = await fetch (url);
  const results = await response.json ();

  let selectcrypto = document.querySelector("#cryptocurrency");
  let htmlOptions = `<option value= ""> Selecciona </option>`;

  results.Data.map(option => {
    htmlOptions+= `<option value= "${option.CoinInfo.name}">${option.CoinInfo.FullName}</option>`;
  });

  selectcrypto.innerHTML=htmlOptions;
};

const quoteCurrency = () => {

  const currency= document.querySelector("#currency").value;
  const crypto= document.querySelector("#cryptocurrency").value;

  if(currency === '' || crypto === '') {
    showError ("#form__error", "Seleccione ambas monedas para comparar...");
    return;
  }

  quote(currency, crypto);
};

const quote = async (currency, crypto) => {
  const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`

  const response = await fetch (url);
  let results = await response.json();

  results = results.DISPLAY[crypto][currency];

  let divResults= document.querySelector('#divResults');

  divResults.innerHTML = `<div style="text-align:center"><img src="assets/loading.gif" width=50 height=50></div>`;

  setTimeout(() => {
    divResults.innerHTML= `<div class="form__price"> El precio es: <span>${results.PRICE}</span></div>
    <div class="form__info"> El precio más alto del día es: <span>${results.HIGHDAY}</span></div>
    <div class="form__info"> El precio más bajo del día es: <span>${results.LOWDAY}</span></div>
    <div class="form__info"> Variación últimas 24 horas: <span>${results.CHANGEPCT24HOUR}</span></div>
    <div class="form__info"> Última actualización: <span>${results.LASTUPDATE}</span></div>
    `;
  },2000);
}

const showError = (elements, message) => {
  divError = document.querySelector(elements);
  divError.innerHTML=`<p class="form__error">${message}</p>`;
  setTimeout(() => { divError.innerHTML=``;},2000);
}

