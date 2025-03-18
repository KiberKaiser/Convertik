const apiKey = '8a45c9d1dd77c6c832484f0f';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
let rates = {};

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        rates = data.conversion_rates;
        const currencyList = Object.keys(rates);
        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        currencyList.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency;
            option1.textContent = currency;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = currency;
            option2.textContent = currency;
            toCurrencySelect.appendChild(option2);
        });

        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    })
    .catch(error => console.error('Error loading data:', error));

function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = 'Please, enter the correct data';
        return;
    }

    const rate = rates[toCurrency] / rates[fromCurrency];
    const convertedAmount = (amount * rate).toFixed(2);
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}