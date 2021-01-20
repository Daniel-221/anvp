<script>
import { check } from "../utils/auth";
export default {
  //函数式组件
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  render(h, context) {
    //在2.2的新语法中，slot都会挂载在scopedSlots下面，不用去区分是作用域插槽还是具名插槽
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>
