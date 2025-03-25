/**
 * @type {import('@builder.io/mitosis').MitosisConfig}
 */
module.exports = {
    files: 'src/**',
    targets: ['react', 'vue'],
    dest: '..',
    commonOptions: {
        typescript: true,
        prettier: true,
    },
    options: {
        react: {},
        vue: {
            api: 'composition',
        },
    },
};
