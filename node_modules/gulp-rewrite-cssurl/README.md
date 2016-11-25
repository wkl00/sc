gulp-rewrite-cssurl


====================

rewrite css url

用于对css中使用的url进行重写,如用到CDN的时候重新构造新的域名和路径

## install

```
npm install -g gulp-rewrite-cssurl

```

## Usage

```
var cssRewriter = require("gulp-rewrite-cssurl");
var gulp = require("gulp");

gulp.task("default",function(){
  gulp.src("./public/**/*.css")
        .pipe(cssRewriter({
            prefix:"//example.com/",
            params:{
                bar:1,
                foo:2
            }
        }))
        .pipe(gulp.dest("./dist"));
})

```

## API

**options.prefix**

Type: `String`

Default: ``

prefix指定一个完整限定的基准路径

如某个css文件的某个样式引用的图片地址为为`background:url(../../a.jpg)`

设置base为`//example.com` 最后的

最后的结果为=>`background:url(//example.com/a.jpg)`

**options.params**

Type: `plainObject`

Default: undefined

params指定新url中的查询字符串部分

如某个css文件的某个样式引用的图片地址为为`background:url(../../a.jpg)`

设置base=>`{foo:1,bar:2}`

最后的结果为=>`background:url(a.jpg?foo=1&bar=2)` 不是 `background:url(../../a.jpg?foo=1&bar=2)`

MIT

