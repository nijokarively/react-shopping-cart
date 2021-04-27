const config = require('../config');

const GLOBAL_STYLUS_REG = /(\.global|^globals)\.styl$/;

const mjs = {
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
};

const stylusConfig = {
    loader: 'stylus-loader',
    options: {
        import: [
            config.rootPath('src/variables.global.styl'),
            config.rootPath('src/mixins.global.styl'),
        ],
    },
};

const js = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            loose: true,
                            targets: [ // make reading sources easing in dev mode
                                'last 2 Chrome versions',
                            ],
                        }
                    ],
                ],
                plugins: [
                    // 'transform-decorators-legacy',
                    [ '@babel/plugin-proposal-class-properties', { loose: true } ],
                    '@babel/plugin-transform-react-jsx',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-syntax-import-meta',
                    '@babel/plugin-proposal-json-strings',
                    [ 'component-resolver', { 'root': [ './src' ] } ],
                    '@babel/plugin-proposal-optional-chaining',
                    [ '@babel/plugin-transform-runtime', {
                        regenerator: true,
                    } ],
                    'react-hot-loader/babel',
                ],
            },
        },
    ],
};

const css = {
    test: /\.css$/,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                modules: true,
                localIdentName: '[local]__[hash:base64:5]',
            },
        },
    ],
};

const stylusGlobal = {
    test: GLOBAL_STYLUS_REG,
    use: [
        'style-loader',
        'css-loader',
        stylusConfig,
    ],
};

const stylusModule = {
    test: /\.styl$/,
    exclude: GLOBAL_STYLUS_REG,
    use: [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                modules: true,
                localIdentName: '[local]__[hash:base64:5]',
            },
        },
        stylusConfig,
    ],
};

const raw = {
    test: /\.(jpe?g|png|gif|svg|woff2|woff|ttf)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: 'assets/[name].[hash].[ext]',
            },
        },
    ],
};

module.exports = {
    js,
    css,
    stylusGlobal,
    stylusModule,
    raw,
    mjs,
};
