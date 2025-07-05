document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('currency-converter');
  container.innerHTML = `<label for="base">মূল মুদ্রা নির্বাচন করুন:</label>
<select id="base">
<option value="USD">USD - 🇺🇸 যুক্তরাষ্ট্র</option>
<option value="EUR">EUR - 🇪🇺 ইউরো অঞ্চল</option>
<option value="GBP">GBP - 🇬🇧 যুক্তরাজ্য</option>
<option value="BDT">BDT - 🇧🇩 বাংলাদেশ</option>
<option value="INR">INR - 🇮🇳 ভারত</option>
<option value="PKR">PKR - 🇵🇰 পাকিস্তান</option>
<option value="AUD">AUD - 🇦🇺 অস্ট্রেলিয়া</option>
<option value="CAD">CAD - 🇨🇦 কানাডা</option>
<option value="CNY">CNY - 🇨🇳 চীন</option>
<option value="JPY">JPY - 🇯🇵 জাপান</option>
<option value="SAR">SAR - 🇸🇦 সৌদি আরব</option>
<option value="AED">AED - 🇦🇪 সংযুক্ত আরব আমিরাত</option>
<option value="TRY">TRY - 🇹🇷 তুরস্ক</option>
<option value="RUB">RUB - 🇷🇺 রাশিয়া</option>
<option value="NOK">NOK - 🇳🇴 নরওয়ে</option>
<option value="SEK">SEK - 🇸🇪 সুইডেন</option>
<option value="DKK">DKK - 🇩🇰 ডেনমার্ক</option>
<option value="CHF">CHF - 🇨🇭 সুইজারল্যান্ড</option>
<option value="SGD">SGD - 🇸🇬 সিঙ্গাপুর</option>
<option value="THB">THB - 🇹🇭 থাইল্যান্ড</option>
<option value="MYR">MYR - 🇲🇾 মালয়েশিয়া</option>
<option value="KRW">KRW - 🇰🇷 দক্ষিণ কোরিয়া</option>
<option value="ZAR">ZAR - 🇿🇦 দক্ষিণ আফ্রিকা</option>
<option value="HKD">HKD - 🇭🇰 হংকং</option>
<option value="EGP">EGP - 🇪🇬 মিশর</option>
<option value="NGN">NGN - 🇳🇬 নাইজেরিয়া</option>
<option value="ILS">ILS - 🇮🇱 ইসরায়েল</option>
<option value="BRL">BRL - 🇧🇷 ব্রাজিল</option>
<option value="MXN">MXN - 🇲🇽 মেক্সিকো</option>
<option value="NZD">NZD - 🇳🇿 নিউজিল্যান্ড</option>
<option value="PLN">PLN - 🇵🇱 পোল্যান্ড</option>
</select>
<div id="rate-output"><p>🔄 ডেটা লোড হচ্ছে...</p></div>`;

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

  const output = document.getElementById('rate-output');
  const baseSelect = document.getElementById('base');

  function loadRates(base = 'USD') {
    output.innerHTML = '<p>🔄 ডেটা লোড হচ্ছে (' + base + ')...</p>';
    fetch('https://currency-proxy-tech.web.app/api/latest?base=' + base)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.rates) throw new Error("Invalid data");
        const rates = data.rates;
        output.innerHTML = '<table><thead><tr><th>দেশ</th><th>১ ' + base + ' =</th></tr></thead><tbody>';
        for (const code in countries) {
          if (rates[code]) {
            output.innerHTML += '<tr><td>' + countries[code] + '</td><td>' + rates[code] + ' ' + code + '</td></tr>';
          }
        }
        output.innerHTML += '</tbody></table>';
      })
      .catch(err => {
        console.error(err);
        output.innerHTML = '<p style="color:red">⚠️ ডেটা লোড করতে সমস্যা হয়েছে।</p>';
      });
  }

  loadRates();

  baseSelect.addEventListener('change', () => {
    loadRates(baseSelect.value);
  });
});
