<template>
  <div>
    <ul :id="elementId" class="context-menu" v-click-outside="onClickOutside">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="context-menu__item"
        :class="[option.class]"
        @click.stop="optionClicked(option.action, option)"
      >
        <span v-html="option.icon"></span>
        <span v-html="option.name" :class="[option.span]"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);
export default {
  name: 'VueSimpleContextMenu',
  props: {
    elementId: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      item: null,
      menuWidth: null,
      menuHeight: null,
    };
  },
  methods: {
    showMenu(event, item) {
      this.item = item;
      var menu = document.getElementById(this.elementId);
      if (!menu) {
        return;
      }
      if (!this.menuWidth || !this.menuHeight) {
        menu.style.visibility = 'hidden';
        menu.style.display = 'block';
        this.menuWidth = menu.offsetWidth;
        this.menuHeight = menu.offsetHeight;
        menu.removeAttribute('style');
      }
      if (this.menuWidth + event.pageX >= window.innerWidth) {
        menu.style.left = event.pageX - this.menuWidth + 2 + 'px';
      } else {
        menu.style.left = event.pageX - 150 + 'px';
      }
      if (this.menuHeight + event.pageY >= window.innerHeight) {
        menu.style.top = event.pageY - this.menuHeight + 2 + 'px';
      } else {
        menu.style.top = event.pageY + 20 + 'px';
      }
      menu.classList.add('context-menu--active');
    },
    actions(action) {
      console.log(action);
    },
    hideContextMenu() {
      let element = document.getElementById(this.elementId);
      if (element) {
        element.classList.remove('context-menu--active');
      }
    },
    onClickOutside() {
      this.hideContextMenu();
    },
    optionClicked(action, option) {
      this.hideContextMenu();
      this.$emit('option-clicked', {
        item: this.item,
        option: option,
        action,
      });
    },
    onEscKeyRelease(event) {
      if (event.keyCode === 27) {
        this.hideContextMenu();
      }
    },
  },
  mounted() {
    document.body.addEventListener('keyup', this.onEscKeyRelease);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onEscKeyRelease);
  },
};
</script>
<style lang="scss">
$light-grey: #b3b3b3;
$grey: darken($light-grey, 15%);
$white: #fff;
$black: #333;
$primary: #26a69a;
.context-menu {
  max-width: 200px;
  width: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  visibility: hidden;
  list-style: none;
  position: absolute;
  z-index: 1100;
  background-color: $white;
  box-shadow: 0 0px 8px 3px rgba($black, 0.2);
  border-radius: 5px;
  transition: opacity 0.3s linear;
  &--active {
    opacity: 1;
    visibility: visible;
  }
  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $primary;
    cursor: pointer;
    padding: 10px 15px;
    align-items: center;
    &:hover {
      background-color: $primary;
      color: $white;
      & .context-menu__icon {
        fill: $white;
      }
    }
  }
  li {
    &:first-of-type {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    &:last-of-type {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  &__icon {
    fill: $primary;
  }
  &__span {
    margin-left: 15px;
  }
}
</style>
