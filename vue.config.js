module.exports = {
    chainWebpack: config => {
    config.plugin("copy").tap(([pathConfigs]) => {
        pathConfigs.unshift({
            from: "cfg",
            to: "cfg"
        });
        return [pathConfigs]})
    },
    transpileDependencies: ["vuetify"]
};