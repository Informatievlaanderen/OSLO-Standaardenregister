<template>
  <vl-link-list mod-inline class="navigation">
    <vl-link-list-item class="navigation-item">
      <vl-link href="/standaarden" mod-block mod-bold>
        {{ $t('standards') }}
      </vl-link>
    </vl-link-list-item>
    <vl-link-list-item class="navigation-item">
      <vl-link href="/standaarden/statistieken" mod-block mod-bold>
        {{ $t('statistics') }}
      </vl-link>
    </vl-link-list-item>
    <vl-link-list-item class="navigation-item">
      <vl-link href="/standaarden/tijdlijn" mod-block mod-bold>
        {{ $t('timeline') }}
      </vl-link>
    </vl-link-list-item>
  </vl-link-list>
</template>

<script setup lang="ts" />

<style scoped lang="scss" src="./style.scss" />
