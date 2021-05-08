<template>
   <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
@import '@/assets/css/vars.scss';
@import '@/assets/css/button.scss';
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: $ff-main;
  color: $color-text;
  background: $color-bg;
}
img {
  max-width: 100%;
  max-height: 100%;
  height: auto;
  vertical-align: middle;
  border: 0;
}
.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
}
a {
  text-decoration: none;
  color: $color-text;
}
li, ul {
  list-style-type: none;
}

input, textarea {
  height: 45px;
  padding: 10px;
  color: $color-text;
  border: none;
  box-shadow: none;
  outline: none;
  font-family: $ff-main;
  background: $color-bg;
  max-width: 300px;
}
input, textarea {
  &::-webkit-input-placeholder,
  &:-ms-input-placeholder,
  &:-ms-input-placeholder,
  &::placeholder {
    color: #fff !important;
    font-size: 16px;
    font-family: $ff-main;
  }
}
.box {
  background: #fff;
  padding: 40px;
}
.page {
  &__row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
    .box {
      &:nth-child(1) {
        grid-column-start: 1;
        grid-row-start: 1;
        grid-row-end: 3;
      } 
    }
  }
}
.page-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}
</style>
