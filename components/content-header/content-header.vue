<template>
  <vl-content-header
    mod-large
    mod-show-mobile
    :background="{
      src: '//www.vlaanderen.be/sites/default/files/ip_acm/page_banner_narrow/header.jpg',
      srcset:
        '//www.vlaanderen.be/sites/default/files/ip_acm/page_banner_mobile_alt/header.jpg 320w, //www.vlaanderen.be/sites/default/files/ip_acm/page_banner_narrow/header.jpg 1024w, //www.vlaanderen.be/sites/default/files/ip_acm/page_banner_wide_alt/header.jpg 1600w',
      alt: 'Content Header',
    }"
  >
    <div class="vl-content-header__logo-wrapper">
      <vl-content-header-entity
        prefix="Digitaal"
        title="Vlaanderen"
        logo="true"
        href="https://www.vlaanderen.be/digitaal-vlaanderen"
        mod-small
      />
    </div>
    <vl-content-header-title title="OSLO-frontend-template" tag-name="h1" />
  </vl-content-header>
  <div>
    {{ environment }}
  </div>
</template>

<script>
export default {
  name: 'contentHeader',
  mounted() {
    const headerScript = document.createElement('script')
    switch (import.meta.env.VITE_ENVIRONMENT) {
      case 'Test':
        headerScript.setAttribute(
          'src',
          'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/99790a73-9a6b-4927-94ad-5df8ae9adf78/embed',
        )
      case 'Production':
        headerScript.setAttribute(
          'src',
          'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget/b0dae312-e7a6-4612-978a-f0e3b2d975bf/embed',
        )
      default:
        headerScript.setAttribute(
          'src',
          'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/99790a73-9a6b-4927-94ad-5df8ae9adf78/embed',
        )
    }
    document.head.appendChild(headerScript)
  },
}
</script>
