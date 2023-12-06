export interface Modal {
    title?: string,
    content?: string,
}

export interface ModalEvent extends CustomEvent {
    modalId: string,
    modal: Modal
}