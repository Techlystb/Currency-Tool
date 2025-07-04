document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('currency-converter');
  container.innerHTML = '<h2>কারেন্সি রেট লোড হচ্ছে...</h2>';
  fetch('https://api.exchangerate.host/latest?base=USD')
    .then(res => res.json())
    .then(data => {
      container.innerHTML = '<h2>💱 কারেন্সি কনভার্টার</h2>';
      const rates = data.rates;
      container.innerHTML += '<p>১ USD = ' + rates.BDT + ' BDT</p>';
    }).catch(err => {
      container.innerHTML = '<p>ডেটা লোড করতে সমস্যা হয়েছে।</p>';
    });
});
