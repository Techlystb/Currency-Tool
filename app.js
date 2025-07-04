
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("currency-converter");
  container.innerHTML = `
    <h2>কারেন্সি কনভার্টার</h2>
    <input type="number" id="amount" placeholder="পরিমাণ লিখুন">
    <select id="from"></select>
    <select id="to"></select>
    <button onclick="convert()">রূপান্তর করুন</button>
    <canvas id="chart" height="120"></canvas>
    <div id="result"></div>
    <p style="text-align:center; margin-top:10px;">Powered by Techlystb</p>
  `;

  const from = document.getElementById('from');
  const to = document.getElementById('to');
  const currencies = ['USD','BDT','EUR','INR','JPY'];

  currencies.forEach(code => {
    from.innerHTML += `<option value="${code}">${code}</option>`;
    to.innerHTML += `<option value="${code}">${code}</option>`;
  });

  from.value = 'USD';
  to.value = 'BDT';
  fetchHistory('USD', 'BDT');

  window.convert = async function () {
    const amt = document.getElementById("amount").value;
    const res = document.getElementById("result");
    const fromCurr = from.value;
    const toCurr = to.value;
    if (!amt) return (res.innerText = "পরিমাণ লিখুন");

    const api = \`https://api.exchangerate.host/convert?from=\${fromCurr}&to=\${toCurr}&amount=\${amt}\`;
    const r = await fetch(api);
    const d = await r.json();
    res.innerText = \`\${amt} \${fromCurr} = \${d.result.toFixed(2)} \${toCurr}\`;
    fetchHistory(fromCurr, toCurr);
  };

  async function fetchHistory(fromCurr, toCurr) {
    const end = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - 30*86400000).toISOString().split('T')[0];
    const url = \`https://api.exchangerate.host/timeseries?start_date=\${start}&end_date=\${end}&base=\${fromCurr}&symbols=\${toCurr}\`;
    const res = await fetch(url);
    const data = await res.json();
    const labels = Object.keys(data.rates);
    const values = labels.map(d => data.rates[d][toCurr]);

    const ctx = document.getElementById("chart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: \`\${fromCurr} থেকে \${toCurr}\`,
          data: values,
          borderColor: "green",
          tension: 0.3
        }]
      }
    });
  }
});

