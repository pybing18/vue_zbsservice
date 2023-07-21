<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" placeholder="请输入客户名称" suffix-icon="el-icon-search" v-model="username"></el-input>
      <el-button class="ml-5" type="primary" @click="load(1,8)">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border stripe :header-cell-class-name="'headerBg'">
      <el-table-column type="index" :index="indexMethod(1)" label="序号"></el-table-column>
      <el-table-column prop="code" label="客户代码"></el-table-column>
      <el-table-column prop="name" label="客户名称"></el-table-column>
      <el-table-column label="操作"  width="200" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定删除吗？"
                  @confirm="del(scope.row.code)"
          >
            <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[8, 16, 24, 32]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </div>

    <el-dialog title="客户信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form :model="form" :rules="rules" ref="userForm" label-width="80px" size="small">
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 8,
                username: "",
                form: {},
                dialogFormVisible: false,
                multipleSelection: [],
                rules: {
                    name: [
                        { required: true, message: '客户名称不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        //页面初始化完成后执行的方法
        created() {
            // 请求分页查询数据
            this.load(this.pageNum,this.pageSize)
        },
        methods: {
            load(pageNum,pageSize) {
                this.pageNum = pageNum,
                    this.pageSize = pageSize
                this.$request.get("/customer/page", {
                    params: {
                        page: pageNum,
                        rows: pageSize,
                        name: this.username
                    }
                }).then(res => {
                    this.tableData = res.data
                    this.total = res.total

                })
            },
            //点击保存按钮触发的方法
            save() {
                if(this.form.code == null){ //新增操作
                    this.pageNum = 1
                    this.pageSize = 8
                }
                this.$refs["userForm"].validate((valid) => {
                    if (valid) {  // 表单校验合法
                        this.$request.post("/customer", this.form).then(res => {
                            if (res.code === 200) {
                                this.$message.success(res.msg)
                                this.dialogFormVisible = false
                                this.load(this.pageNum, this.pageSize)
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    }else{
                        return false;
                    }
                });
            },
            //点击新增按钮触发的方法
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
                //清空验证提示
                this.$refs["userForm"].clearValidate();
            },
            //点击编辑按钮触发的方法
            handleEdit(row) {
                this.form = row
                this.dialogFormVisible = true
                //清空验证提示
                this.$refs["userForm"].clearValidate();
            },
            //点击删除按钮触发的方法
            del(code) {
                this.$request.delete("/customer/" + code).then(res => {
                    if (res.code === 200) {
                        this.$message.success(res.msg)
                        this.load(this.pageNum,this.pageSize)
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //点击重置按钮触发的方法，从第一页开始显示
            reset() {
                this.username = ""
                this.load(1,8)
            },
            //每页显示条数变化时触发的方法
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.load(this.pageNum,this.pageSize)
            },
            //页码变化时触发的方法
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.load(this.pageNum,this.pageSize)
            },
            //序号自动生成,从1开始，规律：1+每页显示条数*(当前页码-1)
            indexMethod(index) {
                return index + (this.pageNum - 1 ) * this.pageSize;
            }
        }
    }
</script>

<style>
  .headerBg {
    background: #eee!important;
  }
</style>
