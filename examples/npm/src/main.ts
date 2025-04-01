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
const form = document.querySelector('form');
form!.addEventListener('submit', e => {
    e.preventDefault();

    // Ustawiamy adres użytkownika
    selector.setAddress({
        city: form!.city.value,
        postalCode: form!.postalCode.value,
        street: form!.address.value,
    });
});
