<template>
<div class="home">
    <el-table
        v-loading='loading'
        :data="tableData"
        border
        :height="tHeight"
        style="width: 700px"
        >
        <el-table-column
        prop="paper_code"
        label="试卷编码"
        align="left"
        width="180"
        fixed="">
        </el-table-column>
        <el-table-column
        prop="paper_name"
        label="试卷名称"
        align="left"
        >
        </el-table-column>
    </el-table>
</div>
</template>
<script>
import { get_paper_list } from '@/api/paper'
export default {
    data(){
        return {
            loading:false,
            tableData: [],
        }
    },
    computed:{
        tHeight(){
            return document.documentElement.clientHeight - 130
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            const { page_index, page_size, searchParm } = this
            this.loading = true
            get_paper_list({ page_index,page_size,...searchParm }).then(res => {
                this.loading = false
                this.tableData = res.data
            }).catch(error => {
                this.loading = false
                console.log(error)
            })
        },
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
