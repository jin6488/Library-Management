<template>
  <div>
    <h2>主页面</h2>

    <!-- 表的内容 -->
    <el-table :data="tableData" style="width: 800px;margin:auto">
      <!-- 第一列内容 -->
      <el-table-column label="出书日期" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <!-- 第二列内容 -->
      <el-table-column label="书名" width="180" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <!-- 第二列内容 -->
      <el-table-column label="作者" width="180" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.author }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <!-- 第三列内容 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 返回后台一个id值 进行该id的书籍的查看-->
          <el-button size="mini" @click="seeall(scope.row._id),dialogTableVisible=true">查看</el-button>
          <!-- 返回后台一个id值 进行该id的书籍的修改 -->
          <el-button size="mini" @click="handleEdit(scope.row._id)">编辑</el-button>
          <!-- 返回后台一个书的名字 对该书进行删除 -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加图书 -->
    <el-button type="primary" @click="dialogFormVisible = true">添加图书</el-button>
    <div class="create">
      <el-dialog
        title="添加图书"
        :visible.sync="dialogFormVisible"
        style="width:650px;height:650px;margin:auto"
      >
        <el-form id="#create" ref="create" label-width="100px">
          <el-form-item label="图书书名" prop="book_name">
            <el-input v-model="create.name"></el-input>
          </el-form-item>

          <el-form-item label="作者" prop="author">
            <el-input v-model="create.author"></el-input>
          </el-form-item>
          <el-form-item label="出版日期" prop="date">
            <el-input v-model="create.date"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" prop="imgurl">
            <el-input v-model="create.imgurl"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createbook">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看图书 -->
    <el-dialog title="查看图书" :visible.sync="dialogTableVisible" :data="seealldata" id="seeall">
      <img :src="seealldata[0].imgurl" style="width:150px;height:200px;">
      <el-table :data="seealldata">
        <el-table-column property="date" label="出版日期" width="100px"></el-table-column>
        <el-table-column property="name" label="书名" width="150px"></el-table-column>
        <el-table-column property="author" label="作者" width="100px"></el-table-column>
        <!-- 书的简介 稍后增加 -->
        <el-table-column property="content" label="简介"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 查看图书结束 -->
    <!-- 修改图书开始   编辑按钮-->
    <div class="repaire" :data="createdata">
      <el-dialog
        title="修改图书"
        :visible.sync="dialogFormVisible_re"
        style="width:650px;height:650px;margin:auto"
      >
        <el-form id="#repatre" :model="repaire" ref="repaire" label-width="100px">
          <el-form-item label="出版日期" prop="date">
            <el-input v-model="createdata[0].date"></el-input>
          </el-form-item>
          <el-form-item label="图书书名" prop="book_name">
            <el-input v-model="createdata[0].name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="createdata[0].author"></el-input>
          </el-form-item>
          <el-form-item label="图片地址" prop="imgurl">
            <el-input v-model="createdata[0].imgurl"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible_re = false">取 消</el-button>
          <el-button type="primary" @click="re_book(createdata[0])">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 修改图书结束 -->
  </div>
</template>


<script>
export default {
  // 页面创建时 进行的向后台请求数据
  created() {
    this.$axios.get("/test/showUser").then(res => {
      console.log(res.data.data);
      this.tableData = res.data.data;
    });
  },

  data() {
    return {
      dialogFormVisible_re: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      tableData: [
        {
          _id: "",
          name: "",
          author: ""
        }
      ],
      // 修改数据时 弹出框内的数据
      createdata: [
        {
          id: "",
          name: "",
          author: "",
          date: "",
          imgurl: ""
        }
      ],
      seealldata: [
        {
          id: "",
          name: "",
          author: "",
          date: "",
          imgurl: ""
        }
      ],
      create: {
        name: "",
        author: "",
        date: "",
        imgurl: ""
      },
      repaire: {
        book_name: "",
        author: "",
        date: "",
        imgurl: ""
      }
    };
  },
  mounted() {},

  methods: {
    // 删除事件
    handleDelete(canshu) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/test/handleDelete", { bookname: canshu })
            .then(res => {
              this.$axios.get("/test/showUser").then(res => {
                console.log(res.data.data);
                this.tableData = res.data.data;
              });
              console.log(canshu);
            });

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 创建图书
    createbook() {
      this.$axios.post("/test/addcontent", this.create).then(res => {
        console.log(res.data);

        this.$axios.get("/test/showUser").then(res => {
          console.log(res.data.data);
          this.tableData = res.data.data;
        });
      });
      this.dialogFormVisible = false;
    },
    // 查看图书  向后台发送图书的
    seeall(canshu_bookid) {
      console.log(canshu_bookid);
      this.$axios.post("/test/seeall", { _id: canshu_bookid }).then(res => {
        this.seealldata = res.data.data;
        // 接收有用的数据
        console.log(this.seealldata);
      });
    },

    // 修改图书   用户点击确定按钮后确定按钮  向后台发送修改的书籍的id  进行对书籍的修改
    re_book(canshu_newbookdata) {
      console.log(canshu_newbookdata);
      this.$axios.post("/test/updatecontent", canshu_newbookdata).then(res => {
        // console.log(res.data);
        // 刷新页面的效果 再次对后台进行调用查看所有书籍接口
        this.$axios.get("/test/showUser").then(res => {
          console.log(res.data.data);
          this.tableData = res.data.data;
        });
      });
      this.dialogFormVisible_re = false;
    },

    // 编辑图书  编辑图书弹出的对话框的设置
    handleEdit(canshu_bookid) {
      // 修改的弹框出来
      this.$axios.post("/test/seeall", { _id: canshu_bookid }).then(res => {
        // console.log(res.data.data);
        this.createdata = res.data.data;
        console.log(this.createdata);
      });
      this.dialogFormVisible_re = true;
    }
  }
};
</script>

<style>
div {
  padding-top: 1px;
}
.create {
  width: 1000px;
  margin: auto;
  height: 600px;
}
/* el-table--enable-row-hover  */

.el-dialog {
  width: 600px;
}
.el-form {
  width: 500px;
}
/* .dialog-footer { */
/* float: left; */
/* margin-left: 550px; */
/* } */
</style>