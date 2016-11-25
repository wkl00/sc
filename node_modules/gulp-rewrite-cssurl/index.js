var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var through = require("through2");
var CSSURLRewriter = require("cssurl").URLRewriter;
var pluginName = "gulp-rewrite-cssurl";
var urlUtils = require("url");
var path = require("path");
var querystring = require("querystring");

module.exports = function (options) {

    options = options || {
        prefix: ""
    };


    var stream = through.obj(function (file, enc, cb) {

        if (!file) {

            thie.emit("error", new PluginError(pluginName, "files can not be empty"));

            return cb();
        }

        if (file.isNull()) {

            thie.emit("error", new PluginError(pluginName, "file contents can not be null"));

            return cb();
        }

        if (file.isStream()) {

            this.emit("error", new PluginError(pluginName, "streaming not supported"));

            return cb();
        }

        if (file.isBuffer()) {

            var rewriter = new CSSURLRewriter(function (url) {


                var filename = path.basename(url);
                var urlParams = "";
                if (options.params) {
                    urlParams = "?" + querystring.stringify(options.params);
                }

                //给文件名前加上path路径分隔符,防止resolve的时候少掉中间路径
                return (options.prefix + (options.prefix && "/") + filename + urlParams);

            });

            var result = rewriter.rewrite(file.contents.toString());

            file.contents = new Buffer(result);

            this.push(file);

            return cb();
        }

    })

    return stream;
}