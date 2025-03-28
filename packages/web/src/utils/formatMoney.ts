const withDecimalsFormat = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: 'always',
});

const noDecimalsFormat = new Intl.NumberFormat('pl-PL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: 'always',
});

export type FormatCurrencyOptions = {
    withDecimals?: boolean;
    withCurrency?: boolean;
};

const OPTIONS_DEFAULT: FormatCurrencyOptions = {};

export function formatMoney(
    value: number | string | null | undefined,
    options: FormatCurrencyOptions = OPTIONS_DEFAULT,
) {
    if (value == null) {
        return '';
    }

    let withDecimals = options.withDecimals ?? false;

    value = Number(value);
    if (!withDecimals && value % 1 !== 0) {
        withDecimals = true;
    }

    let formatted = withDecimals
        ? withDecimalsFormat.format(value)
        : noDecimalsFormat.format(value);

    formatted = formatted.replace(/\s/g, '\u00A0');

    const withCurrency = options.withCurrency ?? true;
    if (withCurrency) {
        const currency = 'zł';
        return `${formatted}\u00A0${currency}`;
    }

    return formatted;
}
