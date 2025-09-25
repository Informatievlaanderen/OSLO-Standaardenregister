<template>
  <vl-grid>
    <vl-column width="10" width-s="12">
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
        <vl-link-list-item class="navigation-item">
          <vl-link href="/standaarden/domain-graph" mod-block mod-bold>
            {{ $t('domains') }}
          </vl-link>
        </vl-link-list-item>
        <vl-link-list-item class="navigation-item">
          <vl-link href="/standaarden/namespace-graph" mod-block mod-bold>
            {{ $t('namespaces') }}
          </vl-link>
        </vl-link-list-item>
        <vl-link-list-item class="navigation-item">
          <vl-link href="/standaarden/organisation-graph" mod-block mod-bold>
            {{ $t('organizations') }}
          </vl-link>
        </vl-link-list-item>
      </vl-link-list>
    </vl-column>
    <vl-column width="2" width-s="12">
      <div class="navigation-language">
        <language-toggle />
      </div>
    </vl-column>
  </vl-grid>
</template>

<script setup lang="ts" />

<style scoped lang="scss" src="./style.scss" />
