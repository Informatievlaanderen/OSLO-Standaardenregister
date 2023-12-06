<template>
  <div>
    <vl-modal
      id="modal-toggle-event"
      closable
      content-role="document"
      :title="titleRef"
    >
      <vl-typography v-html="content" />
    </vl-modal>
  </div>
</template>

<script setup lang="ts" name="custom-modal">
import { type Modal, type ModalEvent } from '~/types/custom-modal'
const titleRef = ref('')
let content = ''

document.addEventListener('modal-toggle', (evt: Event) => {
  const modalEvent = evt as ModalEvent
  titleRef.value = modalEvent.detail.modal.title
  content = modalEvent.detail.modal.content
})

defineProps<Modal>()
</script>
