<template>
  <div class="wrapper">
      <vxe-grid :ref="ref" v-bind="gridOptions">
         <template #num1_default="{ row }">
            <span>{{ row.role }}</span>
          </template>

          <template #num1_header="{ column }">
            <span>
              <i>@</i>
              <span style="color: red;">{{ column.title }}</span>
            </span>
          </template>

          <template #num1_footer="{ items, _columnIndex }">
            <span>
              <vxe-button status="primary" size="mini">自定义</vxe-button>
              <span>累计：{{ items[_columnIndex] }}</span>
            </span>
          </template>

          <template #num1_filter="{ row, column, $panel }">
            <div>
              <el-autocomplete
                type="textarea"
                class="my-input"
                v-model="column.role"
                :fetch-suggestions="((queryString,callback) => {querySearch(queryString,callback,row, column, $panel)})"
                :placeholder="JSON.stringify(column)"
                @select="((item) => {handleSelect(item, row, column, $panel)})"
              ></el-autocomplete>
            </div>
          </template>
        <template #num1_edit="{ row, column, $panel}">
            <el-autocomplete
                type="textarea"
                class="my-input"
                v-model="row.role"
                :fetch-suggestions="((queryString,callback) => {querySearch(queryString,callback,row, column, $panel)})"
                placeholder="请输入内容"
              ></el-autocomplete>
          </template>
      </vxe-grid>
  </div>
</template>

<script>
export default {
  name: "DfxGrid",
  components: {},
  props: {
      id: {
          type: String,
          required: true
      },
      config: {
          type: Object,
          default() {
            return {

            }
          }
      },
      // data: {
      //     type: Array,
      //     default() {
      //         return []
      //     }
      // }
  },
  data () {
    return {}
  },
  watch: {},
  computed: {
      ref() {
          return 'xGrid' + this.id
      },
      gridOptions() {
        let baseOptions = {
          border: true,
          showHeaderOverflow: true,
          showOverflow: true,
          keepSource: true,
          id: 'dfx',
          height: 600,
          rowId: 'id',
          rowConfig: {
            isHover: true
          },
          columnConfig: {
            resizable: true
          },
          sortConfig: {
            trigger: 'cell',
            remote: true
          },
          filterConfig: {
            remote: true
          },
          pagerConfig: {
            pageSize: 10,
            pageSizes: [20, 50, 100]
          },
          toolbarConfig: {
            custom: true
          },
          proxyConfig: {
            sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
            filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
            form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为 //TODO
            // 对应响应结果 { result: [], page: { total: 100 } }
            props: {
              result: 'result', // 配置响应结果列表字段
              total: 'page.total' // 配置响应结果总页数字段
            },
            // 只接收Promise，具体实现自由发挥
            ajax: {
              // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
              query: ({
                page,
                sorts,
                filters,
                form
              }) => {
                console.log('page', page)
                console.log('sorts', sorts)
                console.log('filters', filters)
                console.log('form', form)
                const queryParams = Object.assign({}, form)
                // 处理排序条件
                const firstSort = sorts[0]
                if (firstSort) {
                  queryParams.sort = firstSort.property
                  queryParams.order = firstSort.order
                }
                let res = [
                    {
                        name: '小明',
                        role: '前端开发'
                    },
                    {
                        name: '小红',
                        role: '后端开发'
                    },
                ]
                // return new Promise((resolve, reject) => {
                //     resolve({ result: res, page: { total: 1000 } })
                // })
                return fetch(`${this.serveApiUrl}/api/pub/page/list/${page.pageSize}/${page.currentPage}`, queryParams).then(response => response.json())
              }
            }
          },
          columns: [{
              type: 'checkbox',
              title: 'ID',
              width: 120
            },
            {
              field: 'sex',
              title: 'Sex',
              filters: [
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ],
              editRender: { name: '$select', options: [], props: { placeholder: '请选择性别' } }
            },
            {
              field: 'role',
              title: '角色',
              sortable: true,
              titleHelp: {
                useHTML: true,
                content: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>'
              },
              filters: [{
                  label: '前端开发',
                  value: '前端开发'
                },
                {
                  label: '后端开发',
                  value: '后端开发'
                },
                {
                  label: '测试',
                  value: '测试'
                },
                {
                  label: '程序员鼓励师',
                  value: '程序员鼓励师'
                }
              ],
              editRender: { autofocus: '.my-input' },
              slots: {
                  default: 'num1_default',
                  header: 'num1_header',
                  // footer: 'num1_footer',
                  filter: 'num1_filter',
                  edit: 'num1_edit'
              }
            },
          ],
          importConfig: {
            remote: true,
            importMethod: this.importMethod,
            types: ['xlsx'],
            modes: ['insert']
          },
          exportConfig: {
            remote: true,
            exportMethod: this.exportMethod,
            types: ['xlsx'],
            modes: ['current', 'selected', 'all']
          },
          checkboxConfig: {
            labelField: 'id',
            reserve: true,
            highlight: true,
            range: true
          },
          editRules: {
            name: [{
                required: true,
                message: 'app.body.valid.rName'
              },
              {
                min: 3,
                max: 50,
                message: '名称长度在 3 到 50 个字符'
              }
            ],
            email: [{
              required: true,
              message: '邮件必须填写'
            }],
            role: [{
              required: true,
              message: '角色必须填写'
            }]
          },
          editConfig: {
            trigger: 'dblclick',
            mode: 'row',
            showStatus: true
          }
        }

        let cg = Object.assign({}, baseOptions, this.config)
        return cg
      },
  },
  methods: {
    querySearch(queryString, cb, row, column, $panel) {
      // debugger
      console.log('queryString==', queryString, )
      console.log(' cb,=', cb,)
      console.log(' column=', column)
      console.log('$panel=',  $panel)
        let data = column.filters;
        console.log('datadata', data)

        let results = queryString ? data.filter(this.createFilter(queryString)) : data;
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return (item.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item, row, column, $panel) {
      console.log('88888--', item, row, column, $panel)
    }
  },
  created() {},
  mounted() {}
}

</script>
<style lang='scss' scoped>
  .wrapper{
    
  }
</style>