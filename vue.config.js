const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    configureWebpack: config => {
        if (isProd) {
            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT',
                'moment': 'moment',
                'axios':'axios'
            }
        }
    },
}
