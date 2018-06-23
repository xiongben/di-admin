<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
          v-model="filter.time"
          type="daterange"
          range-separator="to"
          start-placeholder="start time"
          end-placeholder="end time">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input  style="width: 200px;" class="filter-item"  v-model="filter.keyword">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="filterData()">filter</el-button>
      </el-form-item>
    </el-form>
    </div>

    <el-table  :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
      style="width: 100%">
      <el-table-column align="center"   label="Date">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[16]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="user_base">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[7]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="ios">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[5]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="andriod">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[11]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_watch_live_uv">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[0]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="total_go_live_uv">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[14]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"  label="total_top_up_uv">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[12]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_male">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[8]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_female">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[3]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_age<16">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[13]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_age 16-25">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[10]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_age 26-35">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[17]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="total_age>35">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[1]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="login_google">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[9]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="login_twitter">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[4]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="login_facebook">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[6]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="login_phone">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[15]]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"   label="login_instagram">
        <template slot-scope="scope">
          <span>{{scope.row[keyArr[2]]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getOverall } from '@/api/getForm'
import { formateDate } from '@/utils/common'
export default {
  name: 'complexTable',
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      keyArr:null,
      filter:{
        time:null,
        keyword:null,
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
        this.listLoading = true;
        let params = null;
        if(!!this.filter.time){
          params = {
            start_date : formateDate(this.filter.time[0]),
            end_date : formateDate(this.filter.time[1]),
          }
        }
        getOverall(params).then((res)=>{
            this.list = res.data;
            this.total = res.data.length;
            this.listLoading = false;
            let data = this.list[0];
            this.keyArr = Object.keys(data);
        });
    },
    filterData(){
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>