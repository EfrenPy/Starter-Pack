const ESTIMATES = {
  ch: {
    rent: { single: 1800, couple: 2200, 'family-1': 2600, 'family-2': 3200 },
    groceries: { single: 600, couple: 900, 'family-1': 1100, 'family-2': 1400 },
    transport: 70,
    utilities: { single: 150, couple: 200, 'family-1': 250, 'family-2': 300 },
    other: { single: 400, couple: 600, 'family-1': 700, 'family-2': 900 },
  },
  fr: {
    rent: { single: 900, couple: 1100, 'family-1': 1300, 'family-2': 1600 },
    groceries: { single: 400, couple: 600, 'family-1': 800, 'family-2': 1000 },
    transport: 100,
    utilities: { single: 120, couple: 150, 'family-1': 180, 'family-2': 220 },
    other: { single: 300, couple: 450, 'family-1': 550, 'family-2': 700 },
  },
  eurToChf: 0.96,
  cernTaxRate: 0.10,
  chisRate: 0.03,
  pensionRate: 0.10,
  convenio: 290,
};

function fmt(n) {
  return n.toLocaleString('de-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function initCostCalculator() {
  const form = document.getElementById('calculator-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const gross = Number(document.getElementById('gross-salary').value);
    const country = document.getElementById('country').value;
    const family = document.getElementById('family-size').value;

    const tax = Math.round(gross * ESTIMATES.cernTaxRate);
    const chis = Math.round(gross * ESTIMATES.chisRate);
    const pension = Math.round(gross * ESTIMATES.pensionRate);
    const net = gross - tax - chis - pension;

    const est = ESTIMATES[country];
    const toChf = country === 'fr' ? ESTIMATES.eurToChf : 1;

    const rent = Math.round((typeof est.rent === 'object' ? est.rent[family] : est.rent) * toChf);
    const groceries = Math.round((typeof est.groceries === 'object' ? est.groceries[family] : est.groceries) * toChf);
    const transport = Math.round((typeof est.transport === 'object' ? est.transport[family] : est.transport) * toChf);
    const utilities = Math.round((typeof est.utilities === 'object' ? est.utilities[family] : est.utilities) * toChf);
    const other = Math.round((typeof est.other === 'object' ? est.other[family] : est.other) * toChf);
    const convenio = Math.round(ESTIMATES.convenio * ESTIMATES.eurToChf);

    const totalExpenses = rent + groceries + transport + utilities + other + convenio;
    const savings = net - totalExpenses;

    document.getElementById('res-gross').textContent = 'CHF ' + fmt(gross);
    document.getElementById('res-tax').textContent = '- CHF ' + fmt(tax);
    document.getElementById('res-chis').textContent = '- CHF ' + fmt(chis);
    document.getElementById('res-pension').textContent = '- CHF ' + fmt(pension);
    document.getElementById('res-net').innerHTML = '<strong>CHF ' + fmt(net) + '</strong>';
    document.getElementById('res-rent').textContent = 'CHF ' + fmt(rent);
    document.getElementById('res-groceries').textContent = 'CHF ' + fmt(groceries);
    document.getElementById('res-transport').textContent = 'CHF ' + fmt(transport);
    document.getElementById('res-convenio').textContent = 'CHF ' + fmt(convenio);
    document.getElementById('res-utilities').textContent = 'CHF ' + fmt(utilities);
    document.getElementById('res-other').textContent = 'CHF ' + fmt(other);
    document.getElementById('res-total-expenses').innerHTML = '<strong>CHF ' + fmt(totalExpenses) + '</strong>';
    document.getElementById('res-savings').textContent = 'CHF ' + fmt(savings);
    document.getElementById('res-savings').style.color = savings >= 0 ? 'var(--color-primary)' : 'var(--color-accent)';

    const results = document.getElementById('calculator-results');
    results.hidden = false;
    results.setAttribute('aria-live', 'polite');
  });
}
