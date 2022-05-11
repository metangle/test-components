<template>
  <div class="form-search">
    <el-popover
      v-model="isShow"
      popper-class="form-search-pop"
      placement="bottom"
      width="200"
      trigger="click"
      @show="showPop"
      @after-leave="hidePop"
      >
        <div class="form-search-inner">
          <div class="form-search-inner-form">
            <el-input v-model="modelValue" placeholder="请输入内容筛选" clearable :size="size"></el-input>
          </div>
          <div class="form-search-inner-buttons">
            <el-button type="primary" :size="size" class="search-btn" @click="handleSubmit">{{label.submit || '确定'}}</el-button>
            <el-button plain :size="size" @click="handleReset">{{label.reset || '重置'}}</el-button>
          </div>
        </div>
      <i slot="reference" class="el-icon-search" :class="{active: isActive}"></i>
    </el-popover>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
export default {
  name: "FormSearch",
  components: {},
  props: {
    type: {
      type: String,
      default: 'input'
    },
    size: {
      type: String,
      default: 'mini'
    },
    label: {
      type: Object,
      default() {
        return {
          submit: '确定',
          reset: '重置'
        }
      }
    },
    value: null,

  },
  data () {
    return {
      isShow: false,
      historyValue: '',
      isSearching: false,
    }
  },
  directives: {
    Clickoutside
  },
  watch: {},
  computed: {
    emptyValue() {
      return ''
    },
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    isActive() {
      let val = this.modelValue
      if (typeof this.modelValue === 'object') {
        val = Object.values.length
      }
      return Boolean(val)
    }
  },
  methods: {
    handleSubmit() {
      this.isSearching = true
      this.isShow = false;
    },
    handleReset() {
      this.isSearching = true
      this.$emit('input', this.emptyValue);
      this.historyValue = this.emptyValue;
      this.isShow = false;
    },
    showPop() {
      if (typeof this.modelValue === 'object') {
        this.historyValue = JSON.parse(JSON.stringify(this.modelValue))
      } else {
        this.historyValue = this.modelValue
      }
      
    },
    hidePop() {
      if (this.isSearching) {
        // 搜索
        this.isSearching = false;
        this.$emit('search', this.modelValue)
      } else {
        console.log(22222)
        this.$emit('input', this.historyValue)
      }
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang='scss'>
  .form-search{
    
    &-pop {
      display: inline;
      
      .form-search-inner {
        &-form {
          
        }
        &-buttons {
          margin-top: 15px;
          display: flex;
          justify-content: center;
          .search-btn {
            margin-right: 15px;
          }
        }
      }
    }
    .el-popover__reference-wrapper {
      .el-icon-search {
        &.active {
          color: #409eff;
        }
      }
    }
  }
</style>