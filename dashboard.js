/*
 * Dashboard client‑side logic
 *
 * This file manages quota tracking, module generation, and navigation
 * for the EduText dashboard. It uses localStorage to persist data
 * across sessions in this demo. In a real application, this state
 * should be managed on the server.
 */

// Initialize state on page load
document.addEventListener('DOMContentLoaded', () => {
  initQuota();
  renderModules();
});

function initQuota() {
  // Retrieve remaining quota from localStorage or set default
  let remaining = parseInt(localStorage.getItem('edutext_quota'), 10);
  if (isNaN(remaining)) {
    remaining = 10; // default quota
    localStorage.setItem('edutext_quota', remaining);
  }
  document.getElementById('quotaRemaining').textContent = remaining;
}

function updateQuota(newValue) {
  localStorage.setItem('edutext_quota', newValue);
  document.getElementById('quotaRemaining').textContent = newValue;
}

function purchaseQuota() {
  // For this demo, redirect to pricing section where user can buy more
  window.location.href = 'index.html#pricing';
}

function generateModule(event) {
  event.preventDefault();
  // Get selected values
  const subject = document.getElementById('subject').value;
  const topic = document.getElementById('topic').value.trim();
  if (!subject || !topic) {
    alert('Silakan pilih mata pelajaran dan topik.');
    return;
  }
  // Check quota
  let quota = parseInt(localStorage.getItem('edutext_quota'), 10);
  if (quota <= 0) {
    alert('Kuota Anda telah habis. Silakan beli kuota baru.');
    return;
  }
  // Decrement quota
  quota -= 1;
  updateQuota(quota);
  alert('Modul berhasil dibuat! Kuota tersisa: ' + quota);
  // Generate a module record
  const modules = JSON.parse(localStorage.getItem('edutext_modules') || '[]');
  const now = new Date();
  modules.push({
    name: `${subject} – ${topic}`,
    date: now.toLocaleString('id-ID'),
    url: '#',
  });
  localStorage.setItem('edutext_modules', JSON.stringify(modules));
  renderModules();
  // Reset form
  document.getElementById('generateForm').reset();
}

function renderModules() {
  const modules = JSON.parse(localStorage.getItem('edutext_modules') || '[]');
  const tbody = document.getElementById('modulesList');
  const noModulesMsg = document.getElementById('noModulesMessage');
  // Clear table
  tbody.innerHTML = '';
  if (modules.length === 0) {
    noModulesMsg.style.display = 'block';
    return;
  }
  noModulesMsg.style.display = 'none';
  modules.forEach((mod) => {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.textContent = mod.name;
    const tdDate = document.createElement('td');
    tdDate.textContent = mod.date;
    const tdLink = document.createElement('td');
    const link = document.createElement('a');
    link.href = mod.url;
    link.textContent = 'Download';
    link.target = '_blank';
    tdLink.appendChild(link);
    tr.appendChild(tdName);
    tr.appendChild(tdDate);
    tr.appendChild(tdLink);
    tbody.appendChild(tr);
  });
}