# zetank-notice

>页面信息提示/公告轮播组件，组件的icon使用uview,使用前请自己安装插件[uview](https://www.uviewui.com/components/install.html)

###安装
下载组件到项目即可，本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范

###使用
```html
	<zetank-notice colors="#55aaff" :noticeList='noticeList' :interval="3000" @clickNotice="clicktest"></zetank-notice>

```

```json

	noticeList:[
		{id: 1,
		title: '***购买了一根辣条'},
		{id: 2,
		title: '***购买了一吨可乐'}
		],

```

