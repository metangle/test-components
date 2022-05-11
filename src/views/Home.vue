<template>
  <div class="home">
    <el-card>
      <el-form :model="formData" :inline="true" ref="formData" label-width="100px">
        <el-form-item
          label="主胜："
          prop="a"
          :rules="rules"
          :size="formSize"
        >
          <el-input type="number" v-model="formData.a" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="平："
          prop="b"
          :rules="rules"
          :size="formSize"
        >
          <el-input type="number" v-model="formData.b" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="客胜："
          prop="c"
          :rules="rules"
          :size="formSize"
        >
          <el-input type="number" v-model="formData.c" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button :size="formSize" type="primary" plain @click="resetForm('formData', $event)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="result" v-show="isNumber">
        <div class="item"><span class="text">X：</span>{{result.x}}</div>
        <div class="item"><span class="text">Y：</span>{{result.y}}</div>
        <div class="item"><span class="text">|X - Y|：</span>{{result.x_y}}</div>
        <div class="item"><span class="text">最终结果：</span>{{result.preRes}}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      rules: [
        { required: true, message: '不能为空'},
        // { type: 'number', message: '只能输入数字'},
        // {pattern: /^\d+$|^\d*\.\d+$/g, message: '只能输入数字，数字末尾不能以点结束'}
      ],
      formSize: 'mini',
      formData: {
        a: '', // 主胜
        b: '', // 平
        c: '' // 客胜
      },
      result: {},
    }
  },
  mounted() {
    document.body.addEventListener('touchmove', function(evt) {
      evt.preventDefault();
    })
  },
  watch: {
    formData: {
      handler(newObj) {
        /* const x1 = this.abs(this.minus(this.divide(100, newObj.a), 33));
        const x2 = this.abs(this.minus(this.divide(100, newObj.b), 33));
        const x3 = this.abs(this.minus(this.divide(100, newObj.c), 33));
        const x = this.divide(this.plus(this.plus(x1, x2), x3), 3); */
        // debugger
        const x1 = this.abs(this.minus(this.divide(1, newObj.a), this.divide(1, 3)));
        const x2 = this.abs(this.minus(this.divide(1, newObj.b), this.divide(1, 3)));
        const x3 = this.abs(this.minus(this.divide(1, newObj.c), this.divide(1, 3)));
        // console.log('+++', x1 + x2 + x3)
        const x = this.multiply(this.divide(100, 3), this.plus(this.plus(x1, x2), x3));

        const c1 = this.minus(this.divide(1, newObj.a), this.divide(1, newObj.c));
        const c = this.multiply(3, Math.pow(c1, 2));

        const d1 = this.minus(this.plus(this.divide(1, newObj.a), this.divide(1, newObj.c)), this.divide(2, newObj.b));
        const d = Math.pow(d1, 2);

        const y = this.multiply(this.divide(50, 3), Math.sqrt(this.plus(c, d)));

        const x_y = Math.abs(x - y);

        let preRes = null;
        if (x_y > 0.86) {
          preRes = '主胜';
        } else if (x_y < 0.542) {
          preRes = '客胜';
        } else {
          preRes = '平';
        }
        this.result = {
          x: x.toFixed(3),
          y: y.toFixed(3),
          x_y: x_y.toFixed(3), // |x - y|
          preRes // 主胜 平 客胜
        }
      },
      deep: true
    }
  },
  computed: {
    isNumber() {
      function isNumber(obj) {  
        var reg = /^[0-9]+.?[0-9]*$/;
        return reg.test(obj);
      }
      return isNumber(this.result.x) && isNumber(this.result.y)
    }
  },
  methods: {
    resetForm(formName, ev) {
      this.$refs[formName].resetFields();
    },
    // 加
    plus(a, b) {
      return BigNumber(a).plus(b).toNumber();
    },
    // 减
    minus(a, b) {
      return BigNumber(a).minus(b).toNumber()
    },
    // 乘
    multiply(a, b) {
      return BigNumber(a).multipliedBy(b).toNumber()
    },
    // 除以
    divide(a, b) {
      return BigNumber(a).dividedBy(b).toNumber()
    },
    // 绝对值
    abs(a) {
      return BigNumber(a).abs().toNumber()
    }
  }
}
</script>

<style lang="scss">
  .home {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .el-card {
      margin-bottom: 15px;
      .el-form {
        color: #f00;
        .el-form-item__label {
          font-weight: 700;
        }
        .btns {
          display: flex;
          justify-content: center;
          margin-bottom: 0;
          .el-button {
            color: #409EFF;
            background: #ecf5ff;
            border-color: #b3d8ff;
          }
        }
      }
      &.result {
        .item {
          margin-bottom: 10px;
          font-weight: 700;
          color: rgb(0, 60, 255);
        }
      }
      .text {
        font-weight: 700;
        color: #666;
      }
    }
  }
</style>
