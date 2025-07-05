document.addEventListener('DOMContentLoaded', () => {
  const baseSelect = document.getElementById('base');
  const targetSelect = document.getElementById('target');
  const amountInput = document.getElementById('amount');
  const resultBox = document.getElementById('result');
  const convertBtn = document.getElementById('convert');

  const countries = {
    "USD": "🇺🇸 যুক্তরাষ্ট্র",
    "EUR": "🇪🇺 ইউরো অঞ্চল",
    "GBP": "🇬🇧 যুক্তরাজ্য",
    "BDT": "🇧🇩 বাংলাদেশ",
    "INR": "🇮🇳 ভারত",
    "PKR": "🇵🇰 পাকিস্তান",
    "AUD": "🇦🇺 অস্ট্রেলিয়া",
    "CAD": "🇨🇦 কানাডা",
    "CNY": "🇨🇳 চীন",
    "JPY": "🇯🇵 জাপান",
    "SAR": "🇸🇦 সৌদি আরব",
    "AED": "🇦🇪 সংযুক্ত আরব আমিরাত",
    "TRY": "🇹🇷 তুরস্ক",
    "RUB": "🇷🇺 রাশিয়া",
    "NOK": "🇳🇴 নরওয়ে",
    "SEK": "🇸🇪 সুইডেন",
    "DKK": "🇩🇰 ডেনমার্ক",
    "CHF": "🇨🇭 সুইজারল্যান্ড",
    "SGD": "🇸🇬 সিঙ্গাপুর",
    "THB": "🇹🇭 থাইল্যান্ড",
    "MYR": "🇲🇾 মালয়েশিয়া",
    "KRW": "🇰🇷 দক্ষিণ কোরিয়া",
    "ZAR": "🇿🇦 দক্ষিণ আফ্রিকা",
    "HKD": "🇭🇰 হংকং",
    "EGP": "🇪🇬 মিশর",
    "NGN": "🇳🇬 নাইজেরিয়া",
    "ILS": "🇮🇱 ইসরায়েল",
    "BRL": "🇧🇷 ব্রাজিল",
    "MXN": "🇲🇽 মেক্সিকো",
    "NZD": "🇳🇿 নিউজিল্যান্ড",
    "PLN": "🇵🇱 পোল্যান্ড"
  };

  for (const code in countries) {
    const option = `<option value="${code}">${code} - ${countries[code]}</option>`;
    baseSelect.innerHTML += option;
    targetSelect.innerHTML += option;
  }

  baseSelect.value = "USD";
  targetSelect.value = "BDT";

  convertBtn.addEventListener('click', () => {
    const base = baseSelect.value;
    const target = targetSelect.value;
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
      resultBox.textContent = "⚠️ সঠিক পরিমাণ লিখুন।";
      return;
    }

    resultBox.textContent = "🔄 রেট লোড হচ্ছে...";

    fetch(`https://currency-proxy-tech.web.app/api/latest?base=${base}`)
      .then(res => res.json())
      .then(data => {
        const rate = data.rates[target];
        if (!rate) throw new Error("Invalid target currency");
        const converted = (amount * rate).toFixed(2);
        resultBox.innerHTML = `✅ ${amount} ${base} = <b>${converted} ${target}</b>`;
      })
      .catch(err => {
        console.error(err);
        resultBox.textContent = "⚠️ রেট লোড করতে সমস্যা হয়েছে।";
      });
  });
});
