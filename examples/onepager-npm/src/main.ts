import { createSelector } from 'paczkoapi/lazy';
// można też użyć bez lazy loadingu:
// import { createSelector } from 'paczkoapi';

// Tworzymy komponent selektora
const selector = createSelector('#selector', {
    // NOTE: na stackblitz nie działa mapa DHL - ten problem nie wystąpi w rzeczywistości
    providers: ['inpost', 'dhl'],
    // Obsługa zdarzenia wybrania punktu odbioru
    onPointSelected: point => {
        console.log(point);
        // Wyświetlamy wybrany punkt
        document.getElementById('point')!.textContent = JSON.stringify(point, null, 2);
    },
});

// Obsługa formularza
const cityInput = document.querySelector('input[name="city"]') as HTMLInputElement;
cityInput.addEventListener('change', () => {
    selector.setCity(cityInput.value);
});

const postalCodeInput = document.querySelector('input[name="postalCode"]') as HTMLInputElement;
postalCodeInput.addEventListener('change', () => {
    selector.setPostalCode(postalCodeInput.value);
});

const addressInput = document.querySelector('input[name="address"]') as HTMLInputElement;
addressInput.addEventListener('change', () => {
    selector.setStreet(addressInput.value);
});
