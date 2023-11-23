import api from "@/request/api.js";

const fileJs = {
	chooseImage(params, cb) {
		uni.chooseImage({
			count: params.count || 1,
			sizeType: ["compressed"],
			sourceType: ["album", "camera"],
			success: (res) => {
				// console.log('res', res);
				// 文件
				const filePath = res.tempFilePaths[0];
				console.log('filePath', filePath);
				cb(0, filePath)

				fileJs.uploadFile(filePath, params, cb)
			},
			fail: (err) => {
				console.log('err', err);
			}
		})
	},
	uploadFile(filePath, params, cb) {
		api.uploadFile({
			params: params,
			filePath: filePath,
			name: 'file',
			getTask: (task) => {
				cb(3, task);
				task.onProgressUpdate((res) => {
					cb(1, res);
				})
			}
		}).then(res => {
			console.log('res', res);
			cb(2, res);
		}, (err) => {
			console.log('err', err);
		})
	}
}

export default fileJs;