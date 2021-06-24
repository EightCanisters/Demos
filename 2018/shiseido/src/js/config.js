/* requirejs 配置文件 */
require.config({
	baseUrl : "/",
	paths : {
		"jquery" : "lib/jquery/jquery-1.12.4.min",
		"header" : "js/header",
		"footer" : "js/footer",
		"template" : "lib/arttemplate/template-web",
		"cookie" : "lib/jquery-plugins/jquery.cookie",
		"fly" : "lib/jquery-plugins/jquery.fly.min",
		"zoom" : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		"carousel" : "lib/jquery-plugins/jquery.xmcarousel"
	},
	shim : { // 垫片，要使用不遵循AMD规范的模块则 shim
		fly : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		},
		carousel : {
			deps : ["jquery"]
		}
	}
});