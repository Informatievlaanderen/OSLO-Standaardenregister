# Tooltip

This component is a reusable tooltip. It's a wrapper around the [vl-ui-tooltip component/ vl-button](https://overheid.vlaanderen.be/webuniversum/v3/documentation/js-components/vl-ui-tooltip/) from the Webuniversum of the Flemish Government.

## How to use

```js
<template>
    <tooltip v-if="filter?.tooltip" :title="filter?.tooltip" />
</template>
```
