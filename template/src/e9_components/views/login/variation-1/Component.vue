<template>
    <div class="container">
        <div class="left">
            <div class="login-wrapper">
                <div class="logo">
                    <img :src="brandLogoURL" alt="">
                </div>
                <h1 class="title" :style="{'color': textDark}">
                    \{{ titleText }}
                </h1>
                <h3 class="subtitle" :style="{'color': textLight}">
                    \{{ subTitleText }}
                </h3>
                <form class="login-form">
                    <div class="form-group">
                        <label for="username" class="control-label" :style="{'color': brandPrimary}">Username</label>
                        <input type="text" class="form-control" v-model="username" id="username"
                            placeholder="john@doe.com">
                    </div>
                    <div class="form-group">
                        <label for="password" class="control-label" :style="{'color': brandPrimary}">Password</label>
                        <input type="password" class="form-control" v-model="password" id="password"
                            placeholder="••••••••">
                    </div>
                    <div class="forgot-password">
                        <a class="brand-primary bold" :style="{'color': brandPrimary}">Forgot Password?</a>
                    </div>
                    <button type="button"  @click="onClickFn(username, password)" :style="{'background-color': brandPrimary}">Login</button>
                    <!--:disabled="isNotProceedable"-->
					<p class="login-info">
                    </p>
                </form>
            </div>
        </div>
        <div class="right" :style="{'background-image': 'url(' + backgroundImage + ')'}">
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoginVariation1',
    props: {
        brandPrimary: {
            type: String,
            default: '#e90000'
        },
        brandLogoURL: {
            type: String,
            default:'https://htmlsigs.s3.amazonaws.com/logos/files/001/087/329/landscape/e9ineLogo.png'
        },
        titleText: {
            type: String, 
            default: 'This is your title. Please try to fit it within two lines.'
        },
        subTitleText: {
            type: String, 
            default: 'This is your sub-title. Please try to fit it within three lines.'
        },
        textDark: {
            type: String,
            default: '#584649'
        },
        textLight: {
            type: String,
            default: '#777'
        },
        backgroundImage: {
            type: String,
            default: 'https://via.placeholder.com/2000x1200?text=Replace+This+Image+Now'
		}, 
		onClickFn: {
			type: Function
		}
	},
	data() {
		return {
			username: '',
			password: ''
		}
	}
};
</script>

<style lang="scss" scoped >
    @import url('https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap');
    $border-color: #e9e9e9;
    .container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		font-family: 'Nunito Sans', sans-serif;
	}
	.left {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 40%;
		display: flex;
		align-items: center;
		justify-content: center;
        .login-wrapper {
            width: 360px;
            position: relative;
            .logo {
                img {
                    height: 64px;
                }
                position: absolute;
                top: -96px;
                left: 0;
            }
            h1 {
                font-size: 24px;
                letter-spacing: 0.4px;
            }
            h3 {
                font-size: 14px;
                font-weight: 400;
            }
        }
		.login-form {
            margin-top: 24px;
            margin-bottom: 80px;
			.form-group {
				border: 1px solid $border-color;
				transition: border 400ms;
				padding: 8px 16px;
				position: relative;
				&:first-child {
					border-bottom: 0;
				}

				&:focus-within {
					&::before {
						content: ' ';
						position: absolute;
						left: 0;
						top: 0;
						height: 100%;
						width: 4px;
						background-color: #eee;
						transition: all 400ms;
					}
				}

				label {
					display: block;
					line-height: 16px;
					font-size: 14px;
				}

				.form-control {
					border: 0;
					height: 32px;
					font-size: 16px;
                    font-family: 'Nunito Sans', sans-serif;
					&:focus {
						outline: 0;
					}
					&:-webkit-autofill,
					&:-webkit-autofill:hover,
					&:-webkit-autofill:focus {
						-webkit-box-shadow: 0 0 0px 1000px white inset;
						box-shadow: 0 0 0px 1000px white inset;
						font-size: 16px;
					}
				}
			}

			.forgot-password {
				margin: 16px 0;
				a {
					font-size: 13px;
				}
			}

			button {
				width: 120px;
				height: 40px;
				border-radius: 4px;
				font-size: 13px;
				font-weight: 600;
				color: #fff;
				border: 0;
				outline: 0 !important;
				cursor: pointer;
			}
		}
	}
	.right {
		position: fixed;
		top: 0;
		left: 40%;
		bottom: 0;
		right: 0;
		background-size: cover;
		background-position: center center;
	}

	@media(max-width: 1024px) {
		.left {
			width: 50%;
			.login-wrapper {
				.logo {
					position: static;
					img {
						height: 48px;
					}
				}
				h1 {
					font-size: 20px;
				}
			}
		}
		.right {
			left: 50%;
		}
	}
    @media(max-width: 768px) {
		.left {
			top: 32%;
			left: 0;
			right: 0;
			bottom: 0;
			width: inherit;
			.login-wrapper {
				width: 320px;
				.logo {
					img {
						height: 48px;
					}
             		top: -48px;
                	left: 0;
            	}

			}
		}

		.right {
			top: 0;
			height: 32%;
			left: 0;
			right: 0;
		}
	}

	@media(max-width: 414px) {
		.left {
			top: 24%;
			.login-wrapper {
				.logo {
					position: static;
					img {
						height: 32px;
					}
             		top: 0px;
                	left: 0;
            	}
				h1 {
					font-size: 18px;
					letter-spacing: 0px;
				}
				h3 {
					font-size: 13px;
					font-weight: 400;
				}
				.login-form {
					margin-top: 16px;
					margin-bottom: 16px;
				}
			}
		}

		.right {
			height: 24%;
		}
	}

	@media(max-width: 320px) {
		.left {
			top: 0;
			.login-wrapper {
				width: 280px;
				.logo {
					img {
						height: 40px;
					}
				}
			}
		}
		.right {
			display: none;
		}
	}
</style>