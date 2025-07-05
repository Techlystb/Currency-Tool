document.addEventListener('DOMContentLoaded', () => {
  const baseSelect = document.getElementById('base');
  const targetSelect = document.getElementById('target');
  const amountInput = document.getElementById('amount');
  const resultBox = document.getElementById('result');
  const convertBtn = document.getElementById('convert');

  const countries = { /* তোমার countries object */ };

  // populate dropdowns...
  for (const code in countries) {
    const opt = `<option value="${code}">${code} - ${countries[code]}</option>`;
    baseSelect.innerHTML += opt;
    targetSelect.innerHTML += opt;
  }
  baseSelect.value = 'USD';
  targetSelect.value = 'BDT';

  convertBtn.addEventListener('click', () => {
    const base = baseSelect.value;
    const target = targetSelect.value;
    const amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0) {
      resultBox.textContent = '⚠️ সঠিক পরিমাণ লিখুন।';
      return;
    }
    resultBox.textContent = '🔄 রেট লোড হচ্ছে...';

    fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.rates[target]) throw new Error('Invalid rate');
        const rate = data.rates[target];
        const converted = (amount * rate).toFixed(2);
        resultBox.innerHTML = `✅ ${amount} ${base} = <b>${converted} ${target}</b>`;
      })
      .catch(err => {
        console.error(err);
        resultBox.textContent = '⚠️ রেট লোড করতে সমস্যা হয়েছে।';
      });
  });
});
