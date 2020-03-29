# restaurant

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
usertype = 3
个人   18511223344    密码： admin
个人 15911111111 admin 
个人 15777777777 admin

管理员   18599663322   密码：admin 

商户  18511223344    admin
kai1819@qq.com  kaikai
15955454544

18599887744    admin


公共组件公用，导致数据过多，解决方法就是分类，列type类型。登录注册表单共用一个组件，v-if进行判断，验证标错，解决：element的问题，用v-show进行切换显示少量的数据需要全局存储，多页面公用，解决：存在浏览器的session里面开发环境，第一次登录的时候，没有进行登录验证就跳转到首页了，解决:在路由设置里加上全局拦截，判断接口中是否有sessionId，没有就路由定向到首页。