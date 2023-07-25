<template>
  <div>
    <el-row :gutter="10">
      <!--客户网上服务模块 开始-->
      <el-col style="width: 64%;">
      <el-card>
      <div slot="header" style="height: 5px;line-height: 5px">
        <span>客户网上服务</span>
      </div>
    <div style="margin: 5px 0">
      <el-input style="width: 200px" placeholder="请输入客户名称" suffix-icon="el-icon-search" v-model="username"></el-input>
      <el-button class="ml-5" type="primary" @click="load(1,5)">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
      <el-button type="primary" @click="handleAdd">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
    </div>

    <el-table :data="tableData" border :row-style="rowStyle" @row-click="handRowClicked">
      <el-table-column type="index" :index="indexMethod(1)" label="序号"></el-table-column>
      <el-table-column prop="cstmCode" label="客户代码" width="70px"></el-table-column>
      <el-table-column prop="name" label="客户名称" width="170px"></el-table-column>
      <el-table-column prop="loginCode" label="登录名" width="70px"></el-table-column>
      <el-table-column prop="pstwd" label="密码" width="70px"></el-table-column>
      <el-table-column prop="ifWebPrint" label="是否网上打印" width="60px">
        <template slot-scope="scope">
          <span>{{scope.row.ifWebPrint == 1?"是":"否"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  width="170" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="handleEdit(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
          <el-popconfirm
                  class="ml-5"
                  confirm-button-text='确定'
                  cancel-button-text='我再想想'
                  icon="el-icon-info"
                  icon-color="red"
                  title="您确定删除吗？"
                  @confirm="del(scope.row.cstmCode)"
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
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </div>

    <el-dialog title="客户信息" :visible.sync="dialogFormVisible" width="30%" >
      <el-form :model="form" :rules="rules" ref="cstmOperatorForm" label-width="110px" size="small">
        <el-form-item label="客户名称" prop="name" v-show="display == -1">
          <el-autocomplete
                  class="inline-input"
                  v-model="form.name"
                  :fetch-suggestions="querySearch"
                  @select="handleSelect"
                  style="width: 270px"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="登录名" prop="loginCode">
          <el-input v-model="form.loginCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pstwd">
          <el-input v-model="form.pstwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否网上打印" prop="ifWebPrint">
          <!-- select的v-model属性值关联的option的value继而确定使用哪个label -->
          <el-select v-model="form.ifWebPrint" style="width: 270px">
            <el-option value="1" label="是"></el-option>
            <el-option value="0" label="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

    </el-card>
      </el-col>
      <!--客户网上服务模块 结束-->

      <!--收货单位模块 开始-->
      <el-col style="width: 36%;">
        <el-card>
          <div slot="header" style="height: 5px;line-height: 5px">
            <span>收货单位</span>
          </div>
          <div style="margin: 5px 0">
            <el-button type="primary" @click="handleAdd1">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
          </div>

          <el-table :data="tableData1" border style="height: 380px">
            <el-table-column type="index" :index="indexMethod1(1)" label="序号"></el-table-column>
            <el-table-column prop="cstmCode" label="客户代码" width="70px"></el-table-column>
            <el-table-column prop="name" label="收货单位" width="140px"></el-table-column>
            <el-table-column label="操作"  width="90px" align="center">
              <template slot-scope="scope">
                <el-popconfirm
                        class="ml-5"
                        confirm-button-text='确定'
                        cancel-button-text='我再想想'
                        icon="el-icon-info"
                        icon-color="red"
                        title="您确定删除吗？"
                        @confirm="del1(scope.row.cstmCode,scope.row.consignee)"
                >
                  <el-button type="danger" slot="reference">删除 <i class="el-icon-remove-outline"></i></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0">
            <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="pageNum1"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
            </el-pagination>
          </div>

          <el-dialog title="收货单位信息" :visible.sync="dialogFormVisible1" width="30%" >
            <el-form :model="form1" :rules="rules1" ref="cstmConsigneeForm" label-width="80px" size="small">
              <el-form-item label="收货单位" prop="name">
                <el-autocomplete
                        class="inline-input"
                        v-model="form1.name"
                        :fetch-suggestions="querySearch"
                        @select="handleSelect1"
                        style="width: 285px"
                ></el-autocomplete>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="save1">确 定</el-button>
            </div>
          </el-dialog>

        </el-card>
      </el-col>
      <!--收货单位模块 结束-->

    </el-row>
  </div>
</template>

<script>
    export default {
        name: "CstmOperator",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize: 5,
                username: "",
                form: {},
                rules: {
                    name: [
                        { required: true, message: '客户名称不能为空', trigger: 'blur' }
                    ],
                    loginCode: [
                        { required: true, message: '登录名不能为空', trigger: 'blur' }
                    ],
                    pstwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    ifWebPrint: [
                        { required: true, message: '是否网上打印不能为空', trigger: 'blur' }
                    ]
                },
                url: "",
                dialogFormVisible: false,
                tableData1: [],
                total1: 0,
                pageNum1: 1,
                pageSize1: 5,
                form1: {},
                rules1: {
                    name: [
                        {required: true, message: '收货单位不能为空', trigger: 'blur'}
                    ]
                },
                rowCstmCode: "", //点击某一行时，背景变色
                dialogFormVisible1: false,
                restaurants: [{}], //存储下拉框返回数据
                display: -1  //控制客户名称下拉框显示与隐藏
            }
        },
        //页面初始化完成后执行的方法
        created() {
            // 请求分页查询数据-客户网上服务模块
            this.load(this.pageNum,this.pageSize)
        },
        //挂载之后：已经完成了HTML虚拟化，创建了el节点可以操作dom
        mounted() {
            // 请求查询客户数据
            this.loadCustomer()
        },
        methods: {
            // 请求分页查询数据-客户网上服务模块
            load(pageNum,pageSize) {
                this.pageNum = pageNum,
                    this.pageSize = pageSize
                this.$request.get("/ws_cstm_operator", {
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
            loadCustomer() {
                this.$request.get("/customer").then(res => {
                    //在这里为这个数组中每一个对象加一个value字段，
                    //因为autocomplete只识别value字段并在下拉列中显示
                    for(let i of res.data){
                        i.value = i.name; //将想要展示的数据作为value
                    }
                    this.restaurants = res.data
                })
            },
            //点击保存按钮触发的方法-客户网上服务模块
            save() {
                if(this.url.indexOf("insert") != -1){ //新增操作
                    this.pageNum = 1
                    this.pageSize = 5
                }
                this.$refs["cstmOperatorForm"].validate((valid) => {
                    if (valid) {  // 表单校验合法
                        this.$request.post(this.url, this.form).then(res => {
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
            //点击新增按钮触发的方法-客户网上服务模块
            //由于新增后的数据是第一条，因此页码要置为第一页
            handleAdd() {
                this.dialogFormVisible = true
                this.form = {}
                this.display = -1 //客户名称下拉框显示
                this.url = "/ws_cstm_operator/insert" //url要放在清空之前
                this.$refs["cstmOperatorForm"].clearValidate(); //清空验证提示
            },
            //点击编辑按钮触发的方法-客户网上服务模块
            handleEdit(row) {
               //select的v-model属性值关联的是option中的value，继而确定使用哪个label
                // 将整数1转化成字符串1
                row.ifWebPrint = row.ifWebPrint.toString()

                this.form = row
                this.dialogFormVisible = true
                this.display = 1 //客户名称下拉框隐藏
                this.url = "/ws_cstm_operator/update"  //url要放在清空之前
                this.$refs["cstmOperatorForm"].clearValidate(); //清空验证提示
            },
            //点击删除按钮触发的方法-客户网上服务模块
            del(cstmCode) {
                this.$request.delete("/ws_cstm_operator/" + cstmCode).then(res => {
                    if (res.code === 200) {
                        this.$message.success(res.msg)
                        this.load(this.pageNum,this.pageSize) //刷新当前页面数据
                        this.loadConsignee() //刷新收货单位页面数据
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //点击重置按钮触发的方法-客户网上服务模块
            reset() {
                this.username = ""
                this.load(1,5)
            },
            //每页显示条数变化时触发的方法-客户网上服务模块
            handleSizeChange(pageSize) {
                this.pageSize = pageSize
                this.load(this.pageNum,this.pageSize)
            },
            //页码变化时触发的方法-客户网上服务模块
            handleCurrentChange(pageNum) {
                this.pageNum = pageNum
                this.load(this.pageNum,this.pageSize)
            },
            //下拉框模糊查询-客户网上服务模块
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    //.toLowerCase():转小写  .indexOf:可返回某个指定的字符串值在字符串中首次出现的位置,若没有，返回-1
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
                };
            },
            //下拉框项目被选中时调用的方法-客户网上服务模块
            handleSelect(item) {
                this.form.cstmCode = item.code
            },
            //序号自动生成,从1开始，规律：1+每页显示条数*(当前页码-1)-客户网上服务模块
            indexMethod(index) {
                return index + (this.pageNum - 1 ) * this.pageSize;
            },
            //更改选中行背景色-客户网上服务模块
            rowStyle({ row }){
                if(this.rowCstmCode === row.cstmCode){
                    return {"background-color": "#ccc"}
                }
            },
            //加载事件-收货单位模块
            loadConsignee() {
                this.$request.get("/ws_cstm_consignee", {
                    params: {
                        page: this.pageNum1,
                        rows: this.pageSize1,
                        cstmCode: this.rowCstmCode
                    }
                }).then(res => {
                    this.tableData1 = res.data
                    this.total1 = res.total

                })
            },
            //当某一行被点击时会触发该事件-收货单位模块
            handRowClicked(row){
                    this.rowCstmCode = row.cstmCode;
                    this.loadConsignee()

            },
            //点击删除按钮触发的方法-收货单位模块
            del1(cstmCode,consignee) {
                this.$request.delete("/ws_cstm_consignee/" + cstmCode+"-"+consignee).then(res => {
                    if (res.code === 200) {
                        this.$message.success(res.msg)
                        this.loadConsignee()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            //点击新增按钮触发的方法-收货单位模块
            handleAdd1() {
                this.dialogFormVisible1 = true
                this.form1 = {}
                this.$refs["cstmConsigneeForm"].clearValidate(); //清空验证提示
            },
            //点击保存按钮触发的方法-收货单位模块
            save1() {
                this.$refs["cstmConsigneeForm"].validate((valid) => {
                    if (valid) {  // 表单校验合法
                        this.$request.post("/ws_cstm_consignee", this.form1).then(res => {
                            if (res.code === 200) {
                                this.$message.success(res.msg)
                                this.dialogFormVisible1 = false
                                this.loadConsignee()
                            } else {
                                this.$message.error(res.msg)
                            }
                        })
                    }else{
                        return false;
                    }
                });
            },
            //下拉框项目被选中时调用的方法-客户网上服务模块
            handleSelect1(item) {
                this.form1.consignee = item.code
                this.form1.cstmCode = this.rowCstmCode
            },
            //每页显示条数变化时触发的方法-收货单位模块
            handleSizeChange1(pageSize) {
                this.pageSize1 = pageSize
                this.loadConsignee()
            },
            //页码变化时触发的方法-收货单位模块
            handleCurrentChange1(pageNum) {
                this.pageNum1 = pageNum
                this.loadConsignee()
            },
            //序号自动生成,从1开始，规律：1+每页显示条数*(当前页码-1)-收货单位模块
            indexMethod1(index) {
                return index + (this.pageNum1 - 1 ) * this.pageSize1;
            }
        }
    }
</script>
