import { check } from '../utils/auth';

//可以自己注册的指令
function install(Vue, options = {}) {
    Vue.directive(options.name || 'auth', {
        inserted(el, binding) {
            if (!check(binding.value)) {
                //权限校验不通过直接把元素从dom节点上移除掉
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    })
}



export default { install };