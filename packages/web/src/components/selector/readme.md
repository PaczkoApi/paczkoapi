# paczkoapi-selector



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                 | Type                                         | Default     |
| ------------------- | --------------------- | ------------------------------------------- | -------------------------------------------- | ----------- |
| `addressCity`       | `address-city`        | The city to search for pickup points        | `null \| string`                             | `null`      |
| `addressPostalCode` | `address-postal-code` | The postal code to search for pickup points | `null \| string`                             | `null`      |
| `addressStreet`     | `address-street`      | The street to search for pickup points      | `null \| string`                             | `null`      |
| `limit`             | `limit`               | The limit of pickup points to fetch         | `number`                                     | `5`         |
| `point`             | --                    | The currently selected pickup point         | `PickupPoint \| null`                        | `null`      |
| `priceDhl`          | `price-dhl`           | The price of DHL pickup points              | `null \| number`                             | `null`      |
| `priceInpost`       | `price-inpost`        | The price of InPost pickup points           | `null \| number`                             | `null`      |
| `providers`         | `providers`           | The providers to search for pickup points   | `"dhl" \| "inpost" \| ("inpost" \| "dhl")[]` | `[]`        |
| `selectedPoint`     | `selected-point`      | The currently selected pickup point ID      | `null \| string`                             | `null`      |
| `selectedProvider`  | `selected-provider`   | The currently selected pickup point type    | `"dhl" \| "inpost" \| null`                  | `null`      |
| `theme`             | `theme`               | The theme of the selector                   | `"border" \| "default"`                      | `'default'` |


## Events

| Event      | Description                                   | Type                       |
| ---------- | --------------------------------------------- | -------------------------- |
| `selected` | Event emitted when a pickup point is selected | `CustomEvent<PickupPoint>` |


----------------------------------------------


