<template>
<div class="home">
    <el-form :inline="true" :model="searchParm" class="demo-form-inline px-search">
        <el-form-item label="题目编码">
            <el-input v-model="searchParm.item_code" placeholder="编码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="add_question">添加</el-button>
        </el-form-item>
    </el-form>
    <el-table
        v-loading='loading'
        :data="tableData"
        border
        :height="tHeight"
        >
        <el-table-column
        prop="item_code"
        label="题目编码"
        align="left"
        width="100"
        fixed="">
        </el-table-column>
        <el-table-column
        prop="item_name"
        label="题目来源"
        align="left"
        width="260">
        </el-table-column>
        <el-table-column
        prop="star"
        label="难度"
        width='80'
        align="center">
        </el-table-column>
        <el-table-column
        prop="knowledge"
        label="知识点"
        width="280"
        align="left">
        </el-table-column>
        <el-table-column
        prop="item_img"
        label="图片地址"
        width="330"
        align="left">
            <template slot-scope="scope">
                <span style="">
                    <a target="_blank" :href="scope.row.item_img">{{scope.row.item_img}}</a>
                    <a target="_blank" style="word-wrap: break-word;word-break: normal;" :href="scope.row.img">{{scope.row.img}}</a>
                </span>
            </template>
        </el-table-column>
        <el-table-column
        prop="pdf"
        width="200"
        label="pdf地址"
        align="left">
        <template slot-scope="scope">
            <span style=""><a target="_blank" :href="scope.row.pdf">{{scope.row.pdf}}</a></span>
        </template>
        </el-table-column>
        <el-table-column
        prop="video"
        width="220"
        label="视频地址"
        align="left">
        <template slot-scope="scope">
            <span style=""><a target="_blank" :href="scope.row.video">{{scope.row.video}}</a></span>
        </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center">
            <template slot-scope="scope">
                <el-button @click="editClick(scope.row.item_code)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    @current-change='sizeChage'
    >
    </el-pagination>
</div>
</template>
<script>
import { get_question_list } from '@/api/course_enter'
export default {
    data(){
        return {
            loading:false,
            tableData: [],
            searchParm: {
                item_code: '',
            },
            page_index:1,
            page_size:10,
            total:0
        }
    },
    computed:{
        tHeight(){
            return document.documentElement.clientHeight - 280
        }
    },
    created(){
        this.getList()
    },
    methods:{
        sizeChage(page){
            this.page_index = page
            this.getList()
        },
        onSearch() {
            this.page_index = 1
            this.getList()
        },
        getList(){
            const { page_index, page_size, searchParm } = this
            this.loading = true
            get_question_list({ page_index,page_size,...searchParm }).then(res => {
                this.loading = false
                this.tableData = res.data
                this.total = res.count
            }).catch(error => {
                this.loading = false
                console.log(error)
            })
        },
        add_question(){
            this.$router.push({
                path:'/course/question_add'
            })
        },
        editClick(code){
             this.$router.push({
                path:'/course/question_add',
                query:{
                    code
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
a{
    color: #409EFF;
}
.home{
    // color: #304156;
    h1{
        margin-top: 200px;
        font-size: 40px;
    }
}
</style>
