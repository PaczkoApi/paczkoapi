# paczkoapi-selector



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                 | Type                                         | Default       |
| ------------- | -------------- | ------------------------------------------- | -------------------------------------------- | ------------- |
| `city`        | `city`         | The city to search for pickup points        | `string`                                     | `undefined`   |
| `classPrefix` | `class-prefix` | The prefix for CSS classes                  | `string`                                     | `'paczkoapi'` |
| `postalCode`  | `postal-code`  | The postal code to search for pickup points | `string`                                     | `undefined`   |
| `providers`   | `providers`    | The providers to search for pickup points   | `"dhl" \| "inpost" \| ("inpost" \| "dhl")[]` | `undefined`   |
| `selectedId`  | `selected-id`  | The currently selected pickup point ID      | `string`                                     | `undefined`   |
| `street`      | `street`       | The street to search for pickup points      | `string`                                     | `undefined`   |


## Events

| Event           | Description                                   | Type                       |
| --------------- | --------------------------------------------- | -------------------------- |
| `pointSelected` | Event emitted when a pickup point is selected | `CustomEvent<PickupPoint>` |


----------------------------------------------


