/**
 * Adres użytkownika.
 */
export interface Address {
    /**
     * Miasto.
     */
    city?: string | null;

    /**
     * Kod pocztowy.
     */
    postalCode?: string | null;

    /**
     * Ulica.
     */
    street?: string | null;
}
