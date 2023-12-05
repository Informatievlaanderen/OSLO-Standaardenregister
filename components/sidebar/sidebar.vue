<template>
  <vl-sidebar
    label-close-aria="Sluiten"
    class="sidebar"
    ref="sidebar"
    mod-collapsible
    mod-flyout
    mod-right
  >
    <vl-sidebar-header>
      <slot name="header" />
    </vl-sidebar-header>
    <vl-sidebar-content>
      <slot name="content" />
    </vl-sidebar-content>
    <vl-sidebar-footer>
      <slot name="footer" />
    </vl-sidebar-footer>
  </vl-sidebar>
</template>

<script setup lang="ts" name="sidebar">
const sidebar = ref({
  toggle: () => {},
})
const toggleSidebar = () => {
  sidebar?.value?.toggle()
}

// expose the method to any potential parent components
defineExpose({
  toggleSidebar,
})
</script>

<style lang="scss" src="./style.scss" />
