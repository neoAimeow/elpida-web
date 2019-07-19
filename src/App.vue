<script src="../.eslintrc.js"></script>
<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu class="menu" mode="horizontal"
                         router>
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/news">新闻</el-menu-item>
                    <el-menu-item index="/quotation">当天行情</el-menu-item>
                    <el-menu-item index="/reflection">复盘日记</el-menu-item>
                    <el-menu-item index="/">当前持仓</el-menu-item>
                </el-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <el-divider><I class="el-icon-data-analysis"></I></el-divider>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

    export default {
        name: 'app',
        created: function () {

        }
    }
</script>

<style>

    html, body, #app {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: "PingFang SC";
    }

    .el-header, .el-footer {
        line-height: 60px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-main {
        height: 100%;
    }


</style>

