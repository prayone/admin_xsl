<template>
<div class="home">
    <el-form :inline="true" :model="searchParm" class="demo-form-inline px-search">
        <el-form-item label="知识点编码">
            <el-input v-model="searchParm.knowledge_code" placeholder="编码"></el-input>
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
        style="width: 960px"
        >
        <el-table-column
        prop="knowledge_code"
        label="知识点编码"
        align="left"
        width="150"
        fixed="">
        </el-table-column>
        <el-table-column
        prop="p1"
        label="知识点1"
        align="left"
        >
            <template slot-scope="scope">
                <span v-if="!scope.row.show">{{scope.row.p1}}</span>
                <el-input v-else v-model="scope.row.p1"/>
            </template>
        </el-table-column>
        <el-table-column
        prop="p2"
        label="知识点2"
        align="left"
        >
        <template slot-scope="scope">
            <span v-if="!scope.row.show">{{scope.row.p2}}</span>
            <el-input v-else v-model="scope.row.p2"/>
        </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="130"
            align="center">
            <template slot-scope="scope">
                <el-button @click="editClick(scope)" type="text" size="small">{{scope.row.show?'保存':'编辑'}}</el-button>
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
import { get_knowledge_list, update_knowledge } from '@/api/knowledge_enter'
export default {
    data(){
        return {
            loading:false,
            tableData: [],
            searchParm: {
                knowledge_code: '',
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
            get_knowledge_list({ page_index,page_size,...searchParm }).then(res => {
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
                path:'/knowledge/knowledge_add'
            })
        },
        editClick(scope){
            if( scope.row.show ){
                delete scope.row.show
                update_knowledge({...scope.row}).then(res=>{
                    if(res.status==1){
                        this.getList()
                    }
                }).catch(err=>{
                    this.getList()
                })
            } else {
                scope.row.show = true
                this.$set(this.tableData,'' + scope.$index,scope.row)
            }

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
