let balance = 0;
let history = [];

function loginUser() {
  const name = document.getElementById("username").value;
  if (name.trim() !== "") {
    document.getElementById("displayName").textContent = name;
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("bankingSection").style.display = "block";
    showToast("Login successful!");
  }
}

function deposit() {
  const amount = parseFloat(document.getElementById("depositAmount").value);
  if (amount > 0) {
    balance += amount;
    updateDisplay();
    history.unshift(`Deposited ₹${amount}`);
    showToast(`₹${amount} Deposited`);
    drawChart();
  }
}

function withdraw() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    updateDisplay();
    history.unshift(`Withdrew ₹${amount}`);
    showToast(`₹${amount} Withdrawn`);
    drawChart();
  } else {
    showToast("Invalid withdraw", true);
  }
}

function transfer() {
  const to = document.getElementById("transferTo").value;
  const amount = parseFloat(document.getElementById("transferAmount").value);
  if (to && amount > 0 && amount <= balance) {
    balance -= amount;
    updateDisplay();
    history.unshift(`Transferred ₹${amount} to ${to}`);
    showToast(`₹${amount} sent to ${to}`);
    drawChart();
  } else {
    showToast("Invalid transfer", true);
  }
}

function updateDisplay() {
  document.getElementById("balance").textContent = balance;
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.slice(0, 6).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    list.appendChild(li);
  });
}

function drawChart() {
  const ctx = document.getElementById("pieChart").getContext("2d");
  if (window.pie) window.pie.destroy();
  window.pie = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Remaining Balance', 'Spent'],
      datasets: [{
        data: [balance, 1000 - balance],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    }
  });
}

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.backgroundColor = isError ? '#e53935' : '#4caf50';
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}

// Dark mode toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
