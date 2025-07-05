document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('currency-converter');
  container.innerHTML = '<h2>কারেন্সি রেট লোড হচ্ছে...</h2>';

  const fallbackRate = 110.45; // fallback

  fetch('https://currency-proxy-tech.web.app/api/latest')
    .then(res => res.json())
    .then(data => {
      if (!data || !data.rates || !data.rates.BDT) throw new Error("Invalid data");
      const rate = data.rates.BDT;
      container.innerHTML = `<h2>💱 কারেন্সি কনভার্টার</h2>
        <p>১ USD = ${rate} টাকা</p>`;
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<p style="color:red">
        ⚠️ ডেটা লোড করতে সমস্যা হয়েছে। অফলাইনে শেষ রেট দেখানো হচ্ছে:<br/>
        ১ USD = ${fallbackRate} টাকা</p>`;
    });
});
