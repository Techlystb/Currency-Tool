document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('currency-converter');
  container.innerHTML = '<h2>কারেন্সি রেট লোড হচ্ছে...</h2>';
  
  fetch('https://api.exchangerate.host/latest?base=USD&cors=true')
    .then(res => res.json())
    .then(data => {
      if (!data || !data.rates) throw new Error("Invalid data");
      container.innerHTML = '<h2>💱 কারেন্সি কনভার্টার</h2>';
      const rates = data.rates;
      container.innerHTML += '<p>১ USD = ' + rates.BDT + ' টাকা</p>';
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = '<p style="color:red">⚠️ ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে ইন্টারনেট কানেকশন চেক করুন অথবা কিছুক্ষণ পর আবার চেষ্টা করুন।</p>';
    });
});
