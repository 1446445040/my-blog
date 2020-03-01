import Vue from 'vue'
import {
  Tag, Time, LoadingBar, Message, List,
  Form, FormItem, Button, Input, Icon, Layout, Header,
  Card, Menu, MenuItem, Content, BackTop
} from 'view-design'

Vue.prototype.$Message = Message
Vue.prototype.$Loading = LoadingBar

Vue.component('BackTop', BackTop)
Vue.component('Tag', Tag)
Vue.component('Time', Time)
Vue.component('List', List)
Vue.component('ListItem', List.Item)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Button', Button)
Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Card', Card)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Content', Content)
