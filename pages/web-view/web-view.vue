<template>
	<page-content bgColorClass="bg-white">
		<template v-slot:content>
			<web-view style="width: 100%; height: 100%;" :src="url"></web-view>
		</template>
	</page-content>
</template>

<script setup>
	import {
		reactive,
		toRefs,
	} from "vue";
	
	const data = reactive({
		title: "",
		url: "",
	})
	import {
		onLoad
	} from "@dcloudio/uni-app";
	
	const { title, url } = toRefs(data);
	
	onLoad((info) => {
		data.title = info.title || ""
		data.url = info.url || ""
	})
	
</script>

<style>
</style>
