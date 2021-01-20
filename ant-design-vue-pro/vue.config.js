
module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                bypass: function (req, res) {
                    if (req.headers.accept.indexOf("html") !== -1) {
                        console.log("Skipping proxy for browser request.");
                        return "/index.html";
                    }
                    else {
                        const name = req.path
                        .split('/api/')[1]
                        .split('/')
                        .join('_')
                        //require完之后mock模块是缓存掉的，这时改动mock数据是不生效的
                        const mock = require(`./mock/${name}`);
                        const result = mock(req.method);
                        //清理缓存
                        delete require.cache[require.resolve(`./mock/${name}`)];
                        return res.send(result);
                    }
                }
            }
        }



    }
   
}