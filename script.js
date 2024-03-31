const inputFields = document.querySelectorAll('input');

function applyDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

// Add event listener for the dark mode toggle button
const darkButton = document.querySelector('.image');
darkButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
});

// Apply dark mode when the page loads
applyDarkMode();

inputFields.forEach(inputField => inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateTime();
    }
}));

function calculateTime() {
    const years = parseInt(document.getElementById('years').value);
    const months = parseInt(document.getElementById('months').value);
    const days = parseInt(document.getElementById('days').value);
    
    const yearValue = document.querySelector('.year p');
    const monthValue = document.querySelector('.month p');
    const dayValue = document.querySelector('.dayes p');

    if (isNaN(years) || isNaN(months) || isNaN(days)) {
        let errors = document.querySelectorAll('.error');
        errors.forEach((item) => item.style.opacity = 1);
        return;
    } else {
        let errors = document.querySelectorAll('.error');
        errors.forEach((item) => item.style.opacity = 0);
    }

    // Validate input values
    if (days < 1 || days > 31 || months < 1 || months > 12 || years < 1 || years > 9999) {
        let errors = document.querySelectorAll('.error');
        errors.forEach((item) => item.style.opacity = 1);
        return;
    }
    
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Calculate the difference in years, months, and days
    let diffYears = currentYear - years;
    let diffMonths = currentMonth - months;
    let diffDays = currentDay - days;

    // Adjust the difference if the current day is before the birthday
    if (diffDays < 0) {
        diffMonths--;
        diffDays += new Date(years, months - 1, 0).getDate(); // Get the number of days in the previous month
    }
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12; // Add 12 months to the difference
    }

    // Update the results section
    yearValue.innerText = diffYears;
    monthValue.innerText = diffMonths;
    dayValue.innerText = diffDays;
}
