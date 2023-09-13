<template>
  <vl-content-footer>
    <vl-layout>
      <vl-grid mod-stacked>
        <vl-column width="4" width-s="12">
          <vl-link-list mod-small>
            <li><a href="#">Subsidies</a></li>
            <li><a href="#">Bedrijfsvoering</a></li>
            <li><a href="#">Landbouwbeleid</a></li>
            <li><a href="#">Voorlichting &amp; info</a></li>
          </vl-link-list>
        </vl-column>
        <vl-column width="4" width-s="12">
          <vl-link-list mod-small>
            <li><a href="#">Visserij</a></li>
            <li><a href="#">Dier</a></li>
            <li><a href="#">Plant</a></li>
            <li><a href="#">Bio</a></li>
          </vl-link-list>
        </vl-column>
        <vl-column width="4" width-s="12">
          <vl-link-list mod-small>
            <li><a href="#">Home</a></li>
            <li><a href="#">Nieuwsbrief</a></li>
            <li><a href="#">Publicaties</a></li>
          </vl-link-list>
        </vl-column>
      </vl-grid>
    </vl-layout>
  </vl-content-footer>
</template>

<script>
export default {
  name: 'contentFooter',
  mounted() {
    const footerScript = document.createElement('script')
    switch (import.meta.env.VITE_ENVIRONMENT) {
      case 'Test':
        footerScript.setAttribute(
          'src',
          'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/c0df3610-36b9-4113-a487-05dfed92c317/embed',
        )
      case 'Production':
        footerScript.setAttribute(
          'src',
          'https://prod.widgets.burgerprofiel.vlaanderen.be/api/v1/widget/f1d7f80f-ad17-4f25-92b4-027a99785068/embed',
        )
      default:
        footerScript.setAttribute(
          'src',
          'https://tni.widgets.burgerprofiel.dev-vlaanderen.be/api/v1/widget/c0df3610-36b9-4113-a487-05dfed92c317/embed',
        )
    }
    document.head.appendChild(footerScript)
  },
}
</script>
