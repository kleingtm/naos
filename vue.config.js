const path = require(`path`);
const winston = require(`winston-color`);

const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const WebpackSynchronizableShellPlugin = require(`webpack-synchronizable-shell-plugin`);
const NativeScriptVueExternals = require(`nativescript-vue-externals`);
const WebpackNodeExternals = require(`webpack-node-externals`);
const NativeScriptVueTarget = require(`nativescript-vue-target`);

const isProd = process.env.BUILD_ENV === `production`;
const isDev = process.env.BUILD_ENV === `development`;
const platform = `${process.env.PLATFORM ? '.' + process.env.PLATFORM : ''}`;

module.exports = {
    outputDir: path.resolve(__dirname, `./dist/app`),

    css: {
        extract: true
    },

    productionSourceMap: !isProd,

    chainWebpack: config => {

        winston.info(`Bundling application for ${platform}...`);

        config.watch(isDev);
        config.devtool(isProd ? false : `inline-source-map`);
        // if (isProd || isDev) {
        // 	config.resolve.alias.set(`vue$`, `nativescript-vue`);
        // }
        config.output.filename(`app${platform}.js`);
        config.plugin('extract-css').tap(() => {
            return [
                {
                    filename: `app${platform}.css`,
                    chunkFilename: `app${platform}.[contenthash:8].css`
                }
            ];
        });

        config.module.rule('images')
        .use('url-loader')
        .tap(() => {
            return {
                limit:4096,
                fallback:{
                    loader:"file-loader",
                    options: {
                        "name": "images/[name].[ext]"
                    }
                }
            };
        });

        config.module.rule('svg')
        .use('file-loader')
        .tap(() => {
            return {
                name: "images/[name].[ext]"
            };
        });

        config.plugin('copy')
        .tap(options => {
            try {
                const ignore = options[0][0].ignore;
                return [
                    [
                        {
                            from: path.join(__dirname, `public`),
                            to: path.join(__dirname, `dist`),
                            ignore: ignore
                        },
                        {
                            from: path.join(__dirname, `hooks`),
                            to: path.join(__dirname, `dist/hooks`),
                            ignore: ignore
                        }
                    ]
                ];
            }
            catch { console.log(`copy options error`)}
        });

        // config.module
        // .rule(`vue`)
        // .use(`vue-loader`)
        // .loader(`vue-loader`)
        // .tap(options => {
        //     // modify the options...
        //     return options
        // })
    }
    // options...
};
