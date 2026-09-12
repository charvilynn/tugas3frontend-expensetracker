// elemen dom
const expenseForm = document.getElementById('expense-form');
const expenseTitle = document.getElementById('expense-title');
const expenseAmount = document.getElementById('expense-amount');
const formError = document.getElementById('form-error');

const totalCountEl = document.getElementById('total-count');
const totalAmountEl = document.getElementById('total-amount');
const expenseListEl = document.getElementById('expense-list');
const emptyStateEl = document.getElementById('empty-state');

// key storage dan state data pengeluaran
const STORAGE_KEY = 'expense_ledger_items';
let expenses = loadExpensesFromStorage();

// format mata uang rupiah
function formatRupiah(nominal) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(nominal);
}

// baca dan simpan ke localstorage
function loadExpensesFromStorage() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  } catch (error) {
    return [];
  }
}

function saveExpensesToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error(error);
  }
}

// tampilkan dan bersihkan pesan error
function showError(message) {
  formError.textContent = message;
  formError.classList.add('visible');
}

function clearError() {
  formError.textContent = '';
  formError.classList.remove('visible');
}

// render tampilan data ke halaman
function render() {
  expenseListEl.innerHTML = '';

  if (expenses.length === 0) {
    emptyStateEl.style.display = 'block';
  } else {
    emptyStateEl.style.display = 'none';

    expenses.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'expense-item';

      const leftDiv = document.createElement('div');
      leftDiv.className = 'expense-left';

      const badgeDiv = document.createElement('div');
      badgeDiv.className = 'expense-badge';
      badgeDiv.textContent = item.title.trim().charAt(0).toUpperCase();

      const titleSpan = document.createElement('span');
      titleSpan.className = 'expense-title';
      titleSpan.textContent = item.title;

      leftDiv.appendChild(badgeDiv);
      leftDiv.appendChild(titleSpan);

      const rightDiv = document.createElement('div');
      rightDiv.className = 'expense-right';

      const nominalSpan = document.createElement('span');
      nominalSpan.className = 'expense-nominal';
      nominalSpan.textContent = formatRupiah(item.amount);

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn-delete';
      deleteBtn.setAttribute('data-id', item.id);
      deleteBtn.setAttribute('aria-label', `Hapus catatan ${item.title}`);
      deleteBtn.textContent = 'Hapus';

      rightDiv.appendChild(nominalSpan);
      rightDiv.appendChild(deleteBtn);

      li.appendChild(leftDiv);
      li.appendChild(rightDiv);

      expenseListEl.appendChild(li);
    });
  }

  // hitung total transaksi dan jumlah nominal pengeluaran
  const count = expenses.length;
  totalCountEl.textContent = `${count} Transaksi`;

  const totalNominal = expenses.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount;
  }, 0);
  totalAmountEl.textContent = formatRupiah(totalNominal);

  saveExpensesToStorage();
}

// proses tambah pengeluaran baru
expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();
  clearError();

  const titleValue = expenseTitle.value.trim();
  const amountValue = parseFloat(expenseAmount.value);

  // validasi agar input tidak kosong dan nominal bernilai positif
  if (!titleValue) {
    showError('Keterangan pengeluaran wajib diisi.');
    expenseTitle.focus();
    return;
  }

  if (isNaN(amountValue) || amountValue <= 0) {
    showError('Nominal pengeluaran harus berupa angka lebih dari 0.');
    expenseAmount.focus();
    return;
  }

  const newExpense = {
    id: Date.now().toString(),
    title: titleValue,
    amount: Math.round(amountValue)
  };

  expenses.unshift(newExpense);
  expenseForm.reset();
  expenseTitle.focus();
  render();
});

// proses hapus pengeluaran yang dipilih
expenseListEl.addEventListener('click', function (event) {
  const target = event.target;

  if (target && target.classList.contains('btn-delete')) {
    const targetId = target.getAttribute('data-id');

    if (targetId) {
      expenses = expenses.filter((item) => item.id !== targetId);
      render();
    }
  }
});

// hilangkan pesan error ketika pengguna mengetik ulang
expenseTitle.addEventListener('input', clearError);
expenseAmount.addEventListener('input', clearError);

// render awal saat halaman dibuka
document.addEventListener('DOMContentLoaded', function () {
  render();
});
