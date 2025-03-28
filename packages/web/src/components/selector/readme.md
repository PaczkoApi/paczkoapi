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
| `pointName`         | `point-name`          | The currently selected pickup point ID      | `null \| string`                             | `null`      |
| `pointProvider`     | `point-provider`      | The currently selected pickup point type    | `"dhl" \| "inpost" \| null`                  | `null`      |
| `priceDhl`          | `price-dhl`           | The price of DHL pickup points              | `null \| number`                             | `null`      |
| `priceInpost`       | `price-inpost`        | The price of InPost pickup points           | `null \| number`                             | `null`      |
| `providers`         | `providers`           | The providers to search for pickup points   | `"dhl" \| "inpost" \| ("inpost" \| "dhl")[]` | `[]`        |
| `theme`             | `theme`               | The theme of the selector                   | `"border" \| "default"`                      | `'default'` |


## Events

| Event           | Description                                   | Type                       |
| --------------- | --------------------------------------------- | -------------------------- |
| `pointSelected` | Event emitted when a pickup point is selected | `CustomEvent<PickupPoint>` |


## Methods

### `selectPoint(provider: Provider, id: string) => Promise<void>`



#### Parameters

| Name       | Type                | Description |
| ---------- | ------------------- | ----------- |
| `provider` | `"inpost" \| "dhl"` |             |
| `id`       | `string`            |             |

#### Returns

Type: `Promise<void>`



### `setAddress(address: { city?: string; postalCode?: string; street?: string; }) => Promise<void>`

Set the address of the selector

#### Parameters

| Name      | Type                                                                                              | Description |
| --------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `address` | `{ city?: string \| undefined; postalCode?: string \| undefined; street?: string \| undefined; }` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------


