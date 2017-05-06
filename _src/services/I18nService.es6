import Vue from 'vue'
import VueI18n from 'vue-i18n'
import commons from './i18n/commons.es6'
import $ from 'jquery'

//  注册国际化文件
const messages = {
    zh: {
        commons: commons.zh
    }    
}

const locale = 'zh'
/**
 * 获取资源信息，格式针对于　{'sti.buttons' : ['args']}
 * @param key
 * @returns {String}
 */
let getMessage = function(key) {
    let args = null,
        k	= key
    if($.type(key) === 'object') {
        k = Object.keys(key)[0]
        args = key[k]
    }
    return Vue.t(k, locale, args)
    //  return Vue.message(k, args)
}

//  启动国际化服务，勿修改
Vue.use(VueI18n)
const I18nService = {
    
    init () {
        this.installDirective()
        this.installComponent()
        
        //  初始化I18n
        const i18n = new VueI18n({
            locale: 'zh',
            messages
        })
        return i18n
    },
    
    installDirective() {
          /**
         * 添加message指令，根据参数自动添加上下文指令
         */
        Vue.directive('message', {

            bind (el, binding) {
                let value = binding.value,
                    message = getMessage(value)
                $(el).text(message)
            }

        })
        
        /**
         * 安装placeholder指令
         */
        Vue.directive('placeholder', {

            bind (el, binding) {
                let value = binding.value,
                    message = getMessage(value)
                $(el).attr('placeholder', message)
            }

        })
    },
    
    /**
     * 安装组件
     */
    installComponent () {
        let template = '<span v-html="message"></span>'
        Vue.component('message', {

            template,

            props : {
                keys : {
                    type : String,
                    required : true
                }
            },

            /**
             * 需要改进
             */
            computed : {
                message () {
                    return getMessage(this.keys)
                }
            }
        })
    }
}

export default I18nService