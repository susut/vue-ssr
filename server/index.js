// nodejs服务器
const express = require("express");
const fs = require("fs");

// 创建express实例和vue实例
const app = express();

// 创建渲染器
const { createBundleRenderer } = require("vue-server-renderer");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json");
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");
// 这儿引入的文件是不同于index.html的问题，具体文件下面会讲到
const template = fs.readFileSync("./index.html", "utf-8"); // 宿主模板文件
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest,
});

// 中间件处理静态文件请求
app.use(express.static("../dist/client", { index: false })); // 为false是不让它渲染成dist/client/index.html
// app.use(express.static('../dist/client'))

// 前端请求什么我都不关心，所有的路由处理交给vue
app.get("*", async (req, res) => {
    try {
        const context = {
            url: req.url,
            title: "ssr test",
        };
        // nodejs流数据，文件太大，用renderToString会卡
        const stream = renderer.renderToStream(context);
        let buffer = [];
        stream.on("data", (chunk) => {
            buffer.push(chunk);
        });
        stream.on("end", () => {
            res.end(Buffer.concat(buffer));
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("服务器内部错误");
    }
});

app.listen(3000, () => {
    console.log("渲染服务器启动成功");
});