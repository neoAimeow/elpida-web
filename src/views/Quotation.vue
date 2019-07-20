<template>
    <div class="quotation-container">

        <div id="quotation-title">
            <div class="quotation-title-inner">
                <div class="quotation-title-left">
                    <span style="font-size: 40px;">当天行情</span>
                    <el-divider direction="vertical"></el-divider>
                    <span style="font-family: HYZhengYuan-CEW">{{date}}</span>
                </div>

                <div class="quotation-title-right">
                    <el-date-picker @change="dateChange" v-model="date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
            </div>

            <el-divider></el-divider>
        </div>

        <div id="quotation-body">
            <div class="quotation" v-loading="loading">
                <div class="quotation-icon">
                    <i @click="goYesterday" class="el-icon-back"></i>
                </div>

                <div id="quotation-content">
                    <div v-if="dayType === 1" style="text-align: center;margin-top: 220px;">当天没有行情</div>
                    <div v-else>

                    </div>
                </div>
                <div style="text-align: right;" class="quotation-icon">
                    <i @click="goTomorrow" v-if="dayType === -1" class="el-icon-right"></i>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'quotation',
        data() {
            return {
                stockData: {},
                loading: true,
                date: '',
                // 0为同一天，1表示将来，-1表示过去
                dayType: 0,
                yesterdayDateStr: '',
                tomorrowDateStr: '',
                dialogVisible: false
            }
        },
        created: function () {
            this.loadData();
        },
        watch: {
            "$route": "loadData"
        },
        methods: {
            loadData() {
                this.handleDate(this.$route.query.date);
            },
            handleDate(date) {
                this.stockData = {};
                this.loading = true;
                this.date = this.$moment(date, "YYYYMMDD").format("YYYY-MM-DD");
                let nowTime = this.$moment(new Date()).format("YYYY-MM-DD");
                if (this.$moment(nowTime, "YYYY-MM-DD").isSame(this.date)) {
                    this.dayType = 0;
                } else if (this.$moment(nowTime, "YYYY-MM-DD").isBefore(this.date)) {
                    this.dayType = 1;
                } else {
                    this.dayType = -1
                }

                this.tomorrowDateStr = this.$moment(this.date).add(1, 'days').format("YYYYMMDD");
                this.yesterdayDateStr = this.$moment(this.date).subtract(1, 'days').format("YYYYMMDD");

                this.request(date);
            },

            request(date) {
                var that = this;
                this.$ajax.get('/getAnalysisResult', {
                    params: {
                        tradeDate: date
                    }
                }).then(function (response) {
                    that.news = response.data.model;
                    that.loading = false;
                }).catch(function () {
                    that.loading = false;
                });
            },
            goYesterday() {
                this.$router.push({query: {date: this.yesterdayDateStr}});
            },
            goTomorrow() {
                this.$router.push({query: {date: this.tomorrowDateStr}});
            },
            dateChange() {
                let dateStr = this.$moment(this.date, 'YYYY-MM-DD').format('YYYYMMDD');
                this.$router.push({query: {date: dateStr}});
            }
        }
    }
</script>


<style>

    .quotation {
        display: flex;
        flex-direction: row;
        justify-content: center;
        /*align-items: center;*/
    }

    #quotation-title {
        background-color: white;
        height: 90px;
        width: 100%;
    }

    .quotation-title-inner {
        display: flex;
        flex-direction: row;
        justify-content: space-between	;
        align-items: flex-end;
    }

    .quotation-icon {
        width: 5%;
        font-size: 30px;
    }
    #quotation-body {
        margin-top: 15px;
    }

    #quotation-content {
        /*background-color: red;*/
        width: 90%;
        min-height: 500px;
    }

</style>
