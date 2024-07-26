const users = [];
let currentUser;
let currentPage = 1;
const adsPerPage = 10;
const totalAds = 100;
const exchangeRate = 130; // Simulated exchange rate: 1 USD = 130 KES

function signUp() {
    const email = document.getElementById('signup-email').value;
    const username = document.getElementById('signup-username').value;
    const phone = document.getElementById('signup-phone').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    users.push({ email, username, phone, password, balanceUSD: 0.0, balanceKES: 0.0 });
    alert('Sign up successful!');
    document.getElementById('signup-form').reset();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    currentUser = users.find(u => u.username === username && u.password === password);

    if (currentUser) {
        document.getElementById('header-username').innerText = currentUser.username;
        document.getElementById('account-balance').innerText = currentUser.balanceKES.toFixed(2);
        document.getElementById('login-signup-container').style.display = 'none';
        document.getElementById('home-page').style.display = 'block';
        loadAds();
        updatePageInfo();
    } else {
        alert('Invalid username or password!');
    }
}

function loadAds() {
    const adsContainer = document.getElementById('ads-container');
    adsContainer.innerHTML = '';

    const start = (currentPage - 1) * adsPerPage;
    const end = start + adsPerPage;

    for (let i = start; i < end; i++) {
        const adContainer = document.createElement('div');
        adContainer.className = 'ad-container';
        adContainer.innerHTML = `
            <p>Ad ${i + 1}</p>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-2997878465725278">"  <!-- Replace with your AdSense client ID -->
                 data-ad-slot="XXXXXXXXXX"  <!-- Replace with your AdSense ad slot ID -->
                 data-ad-format="auto"></ins>
            <button onclick="viewAd(${i + 1})">Click to View</button>
        `;
        adsContainer.appendChild(adContainer);

        // Initialize the ads
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
}

function viewAd(adId) {
    const adPriceUSD = (Math.random() * 10).toFixed(2);  // Simulating ad price in USD
    const adPriceKES = (adPriceUSD * exchangeRate).toFixed(2);  // Convert to KES
    currentUser.balanceUSD += parseFloat(adPriceUSD);
    currentUser.balanceKES += parseFloat(adPriceKES);
    document.getElementById('account-balance').innerText = currentUser.balanceKES.toFixed(2);
    alert(`You viewed Ad ${adId} and earned $${adPriceUSD} (${adPriceKES} KES)`);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadAds();
        updatePageInfo();
    }
}

function nextPage() {
    if (currentPage * adsPerPage < totalAds) {
        currentPage++;
        loadAds();
        updatePageInfo();
    }
}

function updatePageInfo() {
    document.getElementById('page-info').innerText = `Page ${currentPage}`;
}

function showWithdrawForm() {
    document.getElementById('withdraw-phone').innerText = currentUser.phone;
    document.getElementById('withdraw-form-container').style.display = 'flex';
}

function hideWithdrawForm() {
    document.getElementById('withdraw-form-container').style.display = 'none';
}

function withdraw() {
    const amountKES = parseFloat(document.getElementById('withdraw-amount').value);

    if (amountKES > currentUser.balanceKES) {
        alert('Insufficient balance!');
        return;
    }

    currentUser.balanceKES -= amountKES;
    document.getElementById('account-balance').innerText = currentUser.balanceKES.toFixed(2);
    alert(`Withdrawn ${amountKES} KES to phone number ${currentUser.phone}`);
    hideWithdrawForm();
}

function deposit() {
    alert('Deposit function is not implemented.');
}

function toggleForms() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm.style.display === 'none') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}