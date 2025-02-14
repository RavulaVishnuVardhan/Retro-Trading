function showDashboard() {
    // Hide login & signup containers
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'none';

    // Show only navigation buttons initially
    document.getElementById('nav-buttons').style.display = 'block';
    
    // Hide the full dashboard until a section is clicked
    document.getElementById('dashboard-container').style.display = 'none';
}

// Show the dashboard and the selected section
function showSection(sectionId) {
    // Based on the sectionId, redirect to the corresponding page
    switch (sectionId) {
        case 'market-analysis':
            window.location.href = '/market-analysis.html'; // Redirect to the market analysis page
            break;

        case 'trade-now':
            window.location.href = '/trade-now.html'; // Redirect to the trade page
            break;

        case 'portfolio':
            window.location.href = '/portfolio.html'; // Redirect to the portfolio page
            break;

        case 'watchlist':
            window.location.href = '/watchlist.html'; // Redirect to the watchlist page
            break;

        default:
            window.location.href = '/dashboard.html'; // Default to the dashboard page if no section is specified
            break;
    }
}

// Initial user balance (can be dynamic)
let balance = 10000;  // User starts with 10,000 USD
let transactions = [];  // To store transaction history

// Function to handle Buy button click
function buyCurrency() {
    // Get the selected currency pair from the dropdown
    let selectedPair = document.getElementById("currencySelector").value;

    // Simulated amount to buy (could be entered by user)
    let amountToBuy = parseFloat(prompt("Enter amount to buy:"));

    // Check if the user has enough balance to buy the selected amount
    if (isNaN(amountToBuy) || amountToBuy <= 0) {
        alert("Invalid amount. Please enter a valid number.");
        return;
    }

    // Calculate the cost of the currency pair (simulating here as 1 unit = 1 USD for simplicity)
    let cost = amountToBuy;

    if (balance >= cost) {
        // Deduct from balance
        balance -= cost;

        // Add transaction to history
        transactions.push({ action: 'Buy', currencyPair: selectedPair, amount: amountToBuy });

        // Update balance and transaction history in the UI
        updateUI();
    } else {
        alert("Insufficient funds to complete the purchase.");
    }
}

// Function to handle Sell button click
function sellCurrency() {
    // Get the selected currency pair from the dropdown
    let selectedPair = document.getElementById("currencySelector").value;

    // Simulated amount to sell (could be entered by user)
    let amountToSell = parseFloat(prompt("Enter amount to sell:"));

    // Check if the user is selling a positive amount
    if (isNaN(amountToSell) || amountToSell <= 0) {
        alert("Invalid amount. Please enter a valid number.");
        return;
    }

    // Add the sold amount back to the balance
    balance += amountToSell;

    // Add transaction to history
    transactions.push({ action: 'Sell', currencyPair: selectedPair, amount: amountToSell });

    // Update balance and transaction history in the UI
    updateUI();
}

// Function to update the UI with the latest balance and transaction history
function updateUI() {
    // Update the displayed balance
    document.getElementById("balance").innerText = balance.toFixed(2) + " USD";

    // Update the transaction history
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = "";  // Clear previous history

    // Loop through each transaction and add it to the list
    transactions.forEach(transaction => {
        let listItem = document.createElement("li");
        listItem.textContent = `${transaction.action} ${transaction.amount} units of ${transaction.currencyPair}`;
        historyList.appendChild(listItem);
    });
}

// Initial UI update to show balance and empty history
updateUI();


// Example portfolio data (this could come from a database in a real application)
let portfolio = {
    'EUR/USD': 100, // 100 units of EUR/USD
    'GBP/USD': 50,  // 50 units of GBP/USD
    'USD/JPY': 200, // 200 units of USD/JPY
};

// Function to display portfolio details
function displayPortfolio() {
    let portfolioList = document.getElementById("portfolioList");
    portfolioList.innerHTML = ""; // Clear previous portfolio details

    // Loop through each currency pair in the portfolio and display it
    for (let pair in portfolio) {
        let listItem = document.createElement("li");
        listItem.textContent = `Currency Pair: ${pair}, Amount: ${portfolio[pair]}`;
        portfolioList.appendChild(listItem);
    }

    // Optionally, show a message if there are no items in the portfolio
    if (Object.keys(portfolio).length === 0) {
        let noPortfolioMessage = document.createElement("li");
        noPortfolioMessage.textContent = "Your portfolio is empty.";
        portfolioList.appendChild(noPortfolioMessage);
    }
}


/// Function to handle Deposit Funds
function handleDeposit() {
    // Get the deposit amount entered by the user
    let depositAmount = parseFloat(document.getElementById("depositAmount").value);

    // Check if the deposit amount is valid
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Please enter a valid deposit amount.");
        return;
    }

    // Update the balance by adding the deposit amount
    balance += depositAmount;

    // Show an alert confirming the deposit and the updated balance
    alert(`Deposit successful! You have added ${depositAmount} USD to your balance.`);

    // Update the UI with the new balance
    updateUI();

    // Optionally, clear the deposit input field after deposit
    document.getElementById("depositAmount").value = '';
}


// Function to handle Withdraw Funds
function handleWithdraw() {
    // Get the withdrawal amount entered by the user
    let withdrawAmount = parseFloat(document.getElementById("withdrawAmount").value);

    // Check if the withdrawal amount is valid
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Please enter a valid withdrawal amount.");
        return;
    }

    // Check if the user has enough balance to withdraw the requested amount
    if (balance >= withdrawAmount) {
        // Deduct the amount from the balance
        balance -= withdrawAmount;

        // Show an alert confirming the withdrawal and the updated balance
        alert(`Withdrawal successful! You have withdrawn ${withdrawAmount} USD from your balance.`);

        // Update the UI with the new balance
        updateUI();
    } else {
        // Show an error if balance is insufficient
        alert("Insufficient funds to complete the withdrawal.");
    }

    // Optionally, clear the withdrawal input field after withdrawal
    document.getElementById("withdrawAmount").value = '';
}



function editAccountSettings() {
    let newUsername = prompt("Enter new username:");
    let newEmail = prompt("Enter new email:");

    // Check if the new username and email are valid
    if (newUsername && newEmail) {
        // Update the account details in the UI
        document.getElementById("accountUsername").textContent = newUsername;
        document.getElementById("accountEmail").textContent = newEmail;
        alert("Your account settings have been updated!");
    } else {
        alert("Invalid input! Please enter valid details.");
    }
}


function saveSettings() {
    let selectedTheme = document.getElementById("themeSelector").value;
    let notificationsEnabled = document.getElementById("notificationSettings").checked;

    // Save settings to localStorage or process them as needed (you can simulate saving here)
    localStorage.setItem("theme", selectedTheme);
    localStorage.setItem("notifications", notificationsEnabled);

    // Apply theme changes dynamically (this example just changes the background color for simplicity)
    if (selectedTheme === "dark") {
        document.body.style.backgroundColor = "#333";
        document.body.style.color = "#fff";
    } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#000";
    }

    // Show a success message to the user
    alert("Your settings have been saved!");
}

const commodityPricesInUSD = {
    gold: 1800,        // Price per unit in USD
    silver: 25,
    bronze: 4,
    oil: 70,
    naturalGas: 3,
    platinum: 900,
    copper: 4
};

const currencyConversionRates = {
    USD: 1,
    EUR: 0.93,         // 1 USD = 0.93 EUR
    GBP: 0.81,         // 1 USD = 0.81 GBP
    JPY: 130,          // 1 USD = 130 JPY
    INR: 82            // 1 USD = 82 INR
};

// Update the displayed value of a single unit of commodity in the selected currency
function updateCommodityValue() {
    const commodity = document.getElementById('commoditySelector').value;
    const amount = parseFloat(document.getElementById('amountInput').value);
    const currency = document.getElementById('currencySelector').value;

    // Get the commodity price per unit in USD
    const priceInUSD = commodityPricesInUSD[commodity];

    // Get the conversion rate for the selected currency
    const conversionRate = currencyConversionRates[currency];

    // Calculate the price of a single unit in the selected currency
    const valuePerUnitInCurrency = priceInUSD * conversionRate;

    // Display the value of a single unit of commodity
    document.getElementById('unitValue').innerText = `Value of 1 unit of ${commodity.charAt(0).toUpperCase() + commodity.slice(1)}: ${valuePerUnitInCurrency.toFixed(2)} ${currency}`;

    // If the user enters a valid amount, display the total value
    if (!isNaN(amount) && amount > 0) {
        const totalValue = valuePerUnitInCurrency * amount;
        document.getElementById('purchaseStatus').innerText = `Total value for ${amount} units: ${totalValue.toFixed(2)} ${currency}`;
    } else {
        document.getElementById('purchaseStatus').innerText = '';
    }
}

// Buy commodity (just shows a success message for now)
function buyCommodity() {
    const commodity = document.getElementById('commoditySelector').value;
    const amount = document.getElementById('amountInput').value;

    if (amount <= 0 || isNaN(amount)) {
        alert('Please enter a valid amount to trade.');
        return;
    }

    const statusMessage = `You have successfully bought ${amount} units of ${commodity}.`;
    document.getElementById('purchaseStatus').innerText = statusMessage;

    // Optionally clear the input fields after trade
    document.getElementById('amountInput').value = '';
}




// Update chart dynamically based on selected currency pair
function updateChart() {
    let selectedPair = document.getElementById("currencySelector").value;
    let chartContainer = document.getElementById('tradingview_chart');
    chartContainer.innerHTML = ""; // Clear previous chart

    new TradingView.widget({
        "container_id": "tradingview_chart",
        "width": "100%",
        "height": "500",
        "symbol": selectedPair,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false
    });
}

// Event listener to load chart when currency selection changes
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currencySelector").addEventListener("change", updateChart);
});
