<template>
    <div class="news-component">
        <div v-if="dayType === 1" style="text-align: center;margin-top: 220px;">当天没有新闻</div>
        <NewCaseComponent v-else v-for="(newsCase , key) in news" :key="key" :newsCase="newsCase"></NewCaseComponent>
    </div>
</template>

<script>
    import NewCaseComponent from '@/components/NewCaseComponent.vue';

    export default {
        name: 'news',
        props: {
            news: Array,
            dayType: Number
        },
        data() {
            return {
                length: 0
            }
        },
        components: {
            NewCaseComponent
        },
        watch: {
            news() {
                // this.length = this.tableData.length;
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
    .news-component {
        min-height: 500px;
    }

    .blackFont {
        color:black;
    }

    .redFont {
        color:red;
    }
</style>
