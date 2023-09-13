<template>
  <div>
    <vl-region>
      <vl-introduction>
        Dit project dient als basis voor alle OSLO frontend-projecten die
        gebruik willen maken van webcomponenten 3.0. Het project draait
        momenteel in de {{ environment }} omgeving
      </vl-introduction>
    </vl-region>
  </div>
</template>

<script>
export default {
  data() {
    return {
      environment: import.meta.env.VITE_ENVIRONMENT,
    }
  },
}
</script>
