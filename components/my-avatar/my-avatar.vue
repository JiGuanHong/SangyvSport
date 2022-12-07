<template>
	<view class="my-avatar-container" :class="{'my-avatar-container-my': showMy}">
		<view class="avatar-box" :class="{'avatar-box-my': showMy}">
			<view class="img-box" :class="{'img-box-user': hasLogin,'img-box-my': showMy}">
				<image class="img" :class="{'img-my': showMy}" :src=cSrc mode="scaleToFill" @click="$emit('click')" />
			</view>
			<text class="user-name">{{hasLogin ? userInfo.nickname : "未登录，点击登录"}}</text>
		</view>
	</view>
</template>

<script>
	// import { useUserStore } from '@/store/user.js';
	export default {
		name: "my-avatar",
		props: {
			userInfo: {
				type: Object,
				default: () => {
					return {}
				}
			},
			showMy: {
				type: Boolean,
				default: false
			},
			hasLogin: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			hasLogin: {
				handler(res) {
					console.log(res);
					// console.log("用户信息", this.userInfo)
					if (res && this.userInfo.avatar_file.url && this.userInfo.avatar_file.url.substring(0, 8) ==
						"cloud://") {
						uniCloud.getTempFileURL({
							fileList: [this.userInfo.avatar_file.url]
						}).then(res => {
							// console.log(res);
							this.cSrc = res.fileList[0].tempFileURL
						})
					} else if (res) {
						this.cSrc = this.userInfo.avatar_file.url;
					}
				},
				immediate: true
			}
		},
		data() {
			return {
				cSrc: "/static/images/default-avatar.png"
			};
		}
	}
</script>

<style lang="scss" scoped>
	.my-avatar-container {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100px;

		&-my {
			width: 100%;
			margin-top: 30px;
			height: 100%;
			display: flex;
			justify-content: center;
			// align-items: center;
		}

		.avatar-box {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 10px;

			&-my {
				flex-direction: column;
				// display: block;
			}

			.img-box {
				// display: inline-block;
				width: 64px;
				height: 64px;
				margin-right: 10px;

				&-my {
					display: block;
					width: 128px;
					height: 128px;
					margin-bottom: 20px;
				}

				.img {
					width: 64px;
					height: 64px;
					border-radius: 100%;

					&-my {
						width: 128px;
						height: 128px;
					}
				}

				&-user {
					border-radius: 100%;
					border: #2c2c2c solid 1px;
				}
			}

			.user-name {
				display: block;
				text-align: center;
				font-size: 20px;
				font-weight: 400;
			}
		}
	}
</style>
