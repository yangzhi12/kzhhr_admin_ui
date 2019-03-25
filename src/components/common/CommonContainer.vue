<template>
  <div class="commonContainer">
    <div class="leftTop common">
      <slot name="filter"></slot>
    </div>
    <slot></slot>
    <div class="leftBottom common">
      <slot name="result"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'common-container'
}
</script>
<style lang="scss" scoped>
.commonContainer {
  position: absolute;
  margin-left: 10px;
  margin-top: 10px;
  z-index: 999;
  max-width: 360px;
}
.common {
  background-color: #ffffff;
  padding: 10px 10px;
}
.leftTop {
}

.leftBottom {
  margin-top: 10px;
  height: calc(100vh - 300px);
  overflow-y: auto;
}
.areacombox {
  // margin-left: 10px;
  padding-bottom: 10px;
}
</style>
