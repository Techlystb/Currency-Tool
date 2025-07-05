document.addEventListener('DOMContentLoaded', () => {
  const base = document.getElementById('base');
  const target = document.getElementById('target');
  const amount = document.getElementById('amount');
  const result = document.getElementById('result');
  const btn = document.getElementById('convert');

  // স্কিপ countries declaration—যদি আগে দেখানো না হয়ে থাকে!

  btn.addEventListener('click', () => {
    const b = base.value;
    const t = target.value;
    const amt = parseFloat(amount.value);
    if (!amt || amt <= 0) {
      return result.textContent = '⚠️ সঠিক পরিমাণ লিখুন।';
    }

    result.textContent = '🔄 রেট লোড হচ্ছে…';

    // ফ্রি API URL (CORS-enabled)
    const url = `https://api.exchangerate.host/latest?base=${b}&symbols=${t}`;
    fetch(url)
      .then(res => {
        console.log('Fetch HTTP status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Fetch JSON response:', data);
        if (!data || !data.rates || !data.rates[t]) {
          throw new Error('রেট পাওয়া যায়নি বা ভ্যালু সরাসরি রেসপন্সে নেই');
        }
        const rate = data.rates[t];
        const conv = (amt * rate).toFixed(2);
        result.innerHTML = `✅ ${amt} ${b} = <b>${conv} ${t}</b>`;
      })
      .catch(err => {
        console.error('Error during fetch or parsing:', err);
        result.textContent = '⚠️ রেট লোড করতে সমস্যা হয়েছে। দয়া করে কনসোল দেখো বা কিছুক্ষণ পরে আবার চেষ্টা করো।';
      });
  });
});
