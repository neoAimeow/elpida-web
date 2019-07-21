<template>
    <div class="stockTable">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{title}}</span>
                <el-divider direction="vertical"></el-divider>
                <span style="font-family: HYZhengYuan-CEW;font-size: 13px;">{{length}}个</span>
            </div>

            <el-table
                    :data="tableData"
                    height="300"
                    style="width: 100%">
                <el-table-column
                        prop="stockName"
                        label="股票名字"
                >
                </el-table-column>
                <el-table-column
                        prop="stockCode"
                        label="股票代码"
                >
                </el-table-column>
                <el-table-column
                        prop="closePrice"
                        label="收盘价"
                >
                </el-table-column>
                <el-table-column
                        prop="changeRate"
                        label="涨跌幅"
                >
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'StockTable',
        props: {
            tableData: Array,
            title: String
        },
        data() {
            return {
                length: 0
            }
        },
        watch: {
            tableData() {
                this.length = this.tableData.length;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

    .box-card {
        min-width: 480px;
    }
</style>
