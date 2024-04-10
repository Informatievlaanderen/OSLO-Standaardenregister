# DescriptionData

This component is a reusable description-data. It should be a wrapper around the [vl-ui-description-data](https://overheid.vlaanderen.be/webuniversum/v3/documentation/components/vl-ui-description-data) but there were some issues with the styling of the nuxt variant. Now it's a custom component that looks and behaves very similar to the original.

## How to use

```js
import type { DescriptionData } from '~/types/descriptionData'

<template>
  <DescriptionData :items="Array as () => DescriptionData[]>" />
</template>
```
