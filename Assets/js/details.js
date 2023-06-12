function showLoader() {
    $('.loader').fadeIn(500);
}

function hideLoader() {
    $('.loader').fadeOut(500);
}

showLoader();

const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('countryName');

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
        let currencies = Object.keys(data[0].currencies)[0];
        let language = Object.keys(data[0].languages)[0];
        let allDetails = `
            <div class="row">
                <div class="col-md-6">
                    <div class="px-lg-5 mb-5">
                        <img src="${data[0].flags.png}" width="100%">
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-center">
                    <div class="px-lg-5 mb-5 content-details w-100">
                        <div class="container-fluid">
                            <h2>${countryName}</h2>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <p>Native Name: <span>${data[0].name.nativeName[language].common}</span></p>
                                    <p>Population: <span>${data[0].population}</span></p>
                                    <p>Region: <span>${data[0].region}</span></p>
                                    <p>Sub Region: <span>${data[0].subregion}</span></p>
                                    <p>Capital: <span>${data[0].capital}</span></p>
                                </div>
                                <div>
                                    <p>Top Level Domain: <span>${data[0].tld[0]}</span></p>
                                    <p>Currencies: <span>${data[0].currencies[currencies].name}</span></p>
                                    <p>Languages: <span>${data[0].languages[language]}</span></p>
                                </div>
                            </div>
                            <div class="border-countries">
                                <div style="font-weight: 600; font-size: 16px;">Borders:</div>
                                ${data[0].borders?.map(border => `<div class="content"><span>${border}</span></div>`).slice(0, 3).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        document.getElementById('allDetails').innerHTML = allDetails;
        hideLoader();

    })

$("#getBack").click(function () {
    window.location.replace('index.html')
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