function showLoader() {
    $('.loader').fadeIn(500);
}

function hideLoader() {
    $('.loader').fadeOut(500);
}

showLoader();

fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(data => {
        let allCountries = '';
        for (let i = 0; i < data.length; i++) {
            allCountries += `
            <div class="col-lg-3 col-md-6 px-4">
            <div onclick="details('${data[i].name.official}')" class="country-box">
            <img src='${data[i].flags.png}' width="100%" alt='${data[i].flags.alt}'> 
            <div class='px-3'>
            <h4 class="mt-3">${data[i].name.common}</h4>
            <p>Population: <span>${data[i].population}</span></p>
            <p>Region: <span>${data[i].region}</span></p>
            <p>Capital: <span>${data[i].capital}</span></p>
            </div>
            </div>
            </div>
            `
        }
        document.getElementById('allCountries').innerHTML = allCountries;
        hideLoader();
    })

function details(countryName) {
    window.location.replace('details.html?countryName=' + encodeURIComponent(countryName));
}


$('#countrySearch').keyup(function () {
    let countryName = $(this).val();
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => {
            let allCountries = '';
            for (let i = 0; i < data.length; i++) {
                allCountries += `
            <div class="col-lg-3 col-md-6 px-4">
            <div onclick="details('${data[i].name.official}')" class="country-box">
            <img src='${data[i].flags.png}' width="100%" alt='${data[i].flags.alt}'> 
            <div class='px-3'>
            <h4 class="mt-3">${data[i].name.common}</h4>
            <p>Population: <span>${data[i].population}</span></p>
            <p>Region: <span>${data[i].region}</span></p>
            <p>Capital: <span>${data[i].capital}</span></p>
            </div>
            </div>
            </div>
            `
            }
            document.getElementById('allCountries').innerHTML = allCountries;
        })
});

$('#regionSearch').change(function () {
    let region = $(this).val();
    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response => response.json())
        .then(data => {
            let allCountries = '';
            for (let i = 0; i < data.length; i++) {
                allCountries += `
            <div class="col-lg-3 col-md-6 px-4">
            <div onclick="details('${data[i].name.official}')" class="country-box">
            <img src='${data[i].flags.png}' width="100%" alt='${data[i].flags.alt}'> 
            <div class='px-3'>
            <h4 class="mt-3">${data[i].name.common}</h4>
            <p>Population: <span>${data[i].population}</span></p>
            <p>Region: <span>${data[i].region}</span></p>
            <p>Capital: <span>${data[i].capital}</span></p>
            </div>
            </div>
            </div>
            `
            }
            document.getElementById('allCountries').innerHTML = allCountries;
        })
});

const toggleSwitch = document.querySelector('.toggle-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

toggleSwitch.addEventListener('change', function (e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});