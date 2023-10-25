<template>
  <vl-side-navigation class="sticky" title="Op deze pagina">
    <vl-side-navigation-list>
      <template v-for="item in links">
        <vl-side-navigation-item
          v-if="item?.children?.length"
          :href="item?.href"
          :text="item?.title"
        >
          <vl-side-navigation-list v-if="item?.children?.length">
            <vl-side-navigation-item
              v-for="child in item?.children"
              :href="child?.href"
              :text="child?.title"
            ></vl-side-navigation-item>
          </vl-side-navigation-list>
        </vl-side-navigation-item>
        <vl-side-navigation-item
          v-else
          :href="item?.href"
          :text="item?.title"
        />
      </template>
    </vl-side-navigation-list>
  </vl-side-navigation>
</template>

<script setup lang="ts" name="sideNavigation">
import { OverviewLinks } from '~/types/linksOverview'
defineProps<OverviewLinks>()
</script>
