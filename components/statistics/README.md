# Statistics

This component is a reusable statistics component. It uses the [badge component](https://overheid.vlaanderen.be/webuniversum/v3/documentation/atoms/vl-ui-badge) from the Webuniversum of the Flemish Government to display statistics about how many standards are in a certain state.

## How to use

```js
import type { Statistics } from '~/types/statistics'

<template>
  <statistics :statistics="Object as PropType<Statistics>" />
</template>
```
