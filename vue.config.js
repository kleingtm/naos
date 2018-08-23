const path = require(`path`);
const winston = require(`winston-color`);

const webpack = require('webpack');
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NativeScriptVueExternals = require(`nativescript-vue-externals`);
const WebpackNodeExternals = require(`webpack-node-externals`);
const NativeScriptVueTarget = require(`nativescript-vue-target`);

const isProd = process.env.NODE_ENV === `production`;
const isDev = process.env.NODE_ENV === `development`;
const isTest = process.env.NODE_ENV === `test`;

winston.info(`NODE_ENV: ${process.env.NODE_ENV}`);
winston.info(`TNS_CMD: ${process.env.TNS_CMD}`);
winston.info(`PLATFORM: ${process.env.PLATFORM}`);

const platform = `${process.env.PLATFORM ? '.' + process.env.PLATFORM : ''}`;

module.exports = {
    outputDir: path.resolve(__dirname, `./dist/app`),

    css: {
        extract: true
    },

    productionSourceMap: !isProd,

    configureWebpack: { // basic setup for adding config -- not editing
        plugins: [
            // Execute post-build scripts with specific arguments
            new WebpackSynchronizableShellPlugin({
                onBuildEnd: isDev ? {
                    // only runs once
                    scripts: [`node ${path.resolve('utils/tns-install.js')}`],
                    blocking: true,
                    parallel: false
                } : {},
                onBuildExit: isDev ? {
                    // runs after each rebuild
                    scripts: [`node ${path.resolve('utils/launch.js')}`],
                    blocking: false,
                    parallel: false
                } : {}
            }),

            new webpack.LoaderOptionsPlugin({
                options: {}
            }),

            // Optimize CSS output
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {removeAll: true},
                    normalizeUrl: false
                },
                canPrint: false,
            })
        ]
    },

    chainWebpack: config => {

        winston.info(`Bundling webpack application for ${platform}...`);

        config.watch(isDev);

        if (!process.env.IS_NOT_NS) {

            // NativeScript settings that break the original vue-cli build:
            config.resolve.alias.set(`vue$`, `nativescript-vue`);
            //config.target(NativeScriptVueTarget);

            // let cssLoader;
            // //config.module.rule('css').oneOf('vue').resourceQuery(/inline/)
            // // .use('url')
            // //       .tap(options => {
            // //          cssLoader = options;
            // //       });

            config.plugins.delete('vue-loader');

            config.module.rule('vue')
            .use('vue-loader')
            .loader('ns-vue-loader');
            // .tap()


            config.module.rule('ts').use('ts-loader')
            .tap(object => {
                return Object.assign(object, {appendTsSuffixTo: [/\.vue$/]});
            });
            config.module.rule('tsx').use('ts-loader')
            .tap(object => {
                return Object.assign(object, {appendTsxSuffixTo: [/\.vue$/]});
            });

            // config.plugin('vue-loader').clear();
            // .tap(options => {
            //     console.log(options);
            //     scssLoader = options;
            // });

            // let scssLoader;
            // config.module.rule('scss').oneOf('vue').resourceQuery(/\?vue/).use('css-loader')
            // .tap(options => {
            //     console.log(options);
            //     scssLoader = options;
            // });

            // console.log(`cssLoader: ${JSON.stringify(cssLoader)}`);
            // console.log(`scssLoader: ${JSON.stringify(scssLoader)}`);

            // config.module.rule('vue')
            // .use('ns-vue-loader')
            // .tap(() => {
            //     return {
            //         loaders: {
            //             css: cssLoader,
            //             scss: scssLoader,
            //         },
            //     };
            // });

            config.output.filename(`app${platform}.js`);
            config.plugin('extract-css').tap(() => {
                return [
                    {
                        filename: `app${platform}.css`,
                        chunkFilename: `app${platform}.[contenthash:8].css`
                    }
                ];
            });


            /* configuration for debug vs not */
            config.devtool(process.env.TNS_CMD === 'debug' ? `inline-source-map` : false);
            if (!(process.env.TNS_CMD === 'debug')) {
                config.mode(`production`);
            }

            config.module.rule('images')
            .use('url-loader')
            .tap(() => {
                return {
                    limit: 4096,
                    fallback: {
                        loader: "file-loader",
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
                            }
                        ]
                    ];
                }
                catch (e) {
                    console.log(`copy options error`)
                }
            });

            config.externals([
                WebpackNodeExternals({
                    // whitelist everything that does not have tns-core-modules in its name
                    whitelist: [((moduleName) => (moduleName.indexOf('tns-core-modules') === -1))]
                }),
                NativeScriptVueExternals
            ])
        }
    } // end chainWebpack

};
