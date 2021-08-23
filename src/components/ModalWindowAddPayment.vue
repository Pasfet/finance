<template>
  <div class="modal">
    <div
      class="modal__backdrop"
      @click="closeModal()"
      data-testid="close"
    ></div>
    <div class="modal__dialog">
      <div class="modal__header">
        {{ modalSettings.header }}
        <button
          type="button"
          class="modal__close"
          @click="closeModal()"
          data-testid="closeBtn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="modal__body">
        <component :is="modalSettings.name" @close="closeModal" />
      </div>
      <div class="modal__footer">
        {{ modalSettings.footer }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    modalSettings: Object,
  },
  components: {
    AddPayment: () => import('./addPayment.vue'),
    EditPayment: () => import('./editPayment.vue'),
  },
  methods: {
    closeModal() {
      this.$modal.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &__dialog {
    background-color: #fff;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }
  &__close {
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
  &__header {
    font-size: 18px;
    font-weight: 700;
    padding: 20px 20px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__body {
    padding: 10px 20px 20px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  &__footer {
    padding: 10px 20px 20px;
  }
}
</style>
