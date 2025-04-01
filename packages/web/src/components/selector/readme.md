# paczkoapi-selector



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                 | Type                                                                                | Default     |
| ------------------- | --------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| `address`           | --                    | The address to search for pickup points     | `Address \| null \| undefined`                                                      | `undefined` |
| `addressCity`       | `address-city`        | The city to search for pickup points        | `null \| string \| undefined`                                                       | `undefined` |
| `addressPostalCode` | `address-postal-code` | The postal code to search for pickup points | `null \| string \| undefined`                                                       | `undefined` |
| `addressStreet`     | `address-street`      | The street to search for pickup points      | `null \| string \| undefined`                                                       | `undefined` |
| `limit`             | `limit`               | The limit of pickup points to fetch         | `null \| number \| undefined`                                                       | `undefined` |
| `point`             | --                    | The currently selected pickup point         | `PickupPoint \| null`                                                               | `null`      |
| `pointName`         | `point-name`          | The currently selected pickup point ID      | `null \| string \| undefined`                                                       | `undefined` |
| `pointProvider`     | `point-provider`      | The currently selected pickup point type    | `"dhl" \| "inpost" \| null \| undefined`                                            | `undefined` |
| `prices`            | --                    | The prices of pickup points                 | `null \| undefined \| { inpost?: number \| undefined; dhl?: number \| undefined; }` | `undefined` |
| `providers`         | `providers`           | The providers to search for pickup points   | `"dhl" \| "inpost" \| Provider[]`                                                   | `[]`        |
| `showRadio`         | `show-radio`          | Whether to show the radios                  | `boolean \| null \| undefined`                                                      | `undefined` |
| `theme`             | `theme`               | The theme of the selector                   | `"border" \| null \| undefined`                                                     | `undefined` |


## Events

| Event      | Description                                   | Type                       |
| ---------- | --------------------------------------------- | -------------------------- |
| `selected` | Event emitted when a pickup point is selected | `CustomEvent<PickupPoint>` |


## Methods

### `selectPoint(provider: Provider, id: string) => Promise<void>`



#### Parameters

| Name       | Type                | Description |
| ---------- | ------------------- | ----------- |
| `provider` | `"inpost" \| "dhl"` |             |
| `id`       | `string`            |             |

#### Returns

Type: `Promise<void>`



### `setAddress(address: Address, forceFetch?: boolean) => Promise<void>`

Set the address of the selector

#### Parameters

| Name         | Type      | Description |
| ------------ | --------- | ----------- |
| `address`    | `Address` |             |
| `forceFetch` | `boolean` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------


