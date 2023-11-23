import request from "./request.js";

const api = {
	// 登录
	login: (params) => request.post('/customLogin', params),
	// 注册
	register: (params) => request.post('/register', params),
	// 重置密码
	reset: (params) => request.post('/reset', params),
	// 获取配置列表
	getConfigsList: (params) => request.get('/configs/getConfigsList', {params}),
	// 获取我的订单
	getMyOrderList: (params) => request.get('/order/getOrderList', {params}),
	// 获取问题列表
	getProblemList: (params) => request.get('/configs/getProblemList', {params}),
	// 获取详情
	getConfigsInfoById: (params) => request.get('/configs/getConfigsInfoById', {params}),
	// 获取纸张列表
	getPaperList: (params) => request.get('/configs/getPaperList', {params}),
	// 添加留言
	addMessage: (params) => request.post('/message/addData', params),
	// 添加投诉
	addComplaint: (params) => request.post('/complaint/addData', params),
	// 获取全部品类
	getCategoryAllList: (params) => request.get('/category/getCategoryAllList', {params}),
	// 获取商品列表
	getCommodityList: (params) => request.get('/commodity/getCommodityList', {params}),
	// 获取规格列表
	getSpecList: (params) => request.get('/spec/getSpecList', {params}),
	// 获取材质列表根据id列表
	getMaterialByIds: (params) => request.get('/material/getMaterialByIds', {params}),
	// 获取全部风格
	getStylesAllList: (params) => request.get('/styles/getStylesAllList', {params}),
	// 获取产品列表根据id列表
	getProductByIds: (params) => request.get('/product/getProductByIds', {params}),
	// 获取产品信息根据id
	getProductById: (params) => request.get('/product/getProductById', {params}),
	// 根据id 获取配置
	getConfigsById: (params) => request.get('/configs/getConfigsInfoById', {params}),
	// 添加订单
	addOrder: (params) => request.post('/order/addData', params),
	// 修改订单
	updateOrder: (params) => request.put('/order/updateData', params),
	// 获取素材
	getSourceByIds: (params) => request.get('/source/getSourceByIds', {params}),
	// 删除订单
	updateOrderList: (params) => request.put('/order/updateOrderList', params),
	// 上传文件
	uploadFile: (params) => request.upload('/system/addFile', params),
	addBase64: (params) => request.post('/system/addBase64', params),
	getLinksInfo: (params) => request.get('/links/getLinksById', {params}),
};

export default api;