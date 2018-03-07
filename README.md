windows环境中
    package.json中运行命令：set NODE_ENV=dev && gulp;
    其余运行命令同理
Linux环境中
    package.json中运行命令：export NODE_ENV=dev && gulp
    其余运行命令同理
开发：npm run dev   (代码不压缩)
测试：npm run test  (代码不压缩)
生产：npm run pro   (代码压缩)





以下是为js css 文件添加版本号操作

在没有node_moudels的情况下，npm install后则需要对一下三个node模块的index文件进行修改

从根目录依次打开 node_modules--->gulp-rev--->index.js 找到第144行 manifest[originalFile] = revisionedFile; 修改为 manifest[originalFile] = originalFile + '?v=' + file.revHash;

从根目录依次打开 node_modules--->gulp-rev-collectot--->index.js 找到40行 let cleanReplacement = path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ); 修改为 let cleanReplacement = path.basename(json[key]).split('?')[0];

从根目录依次打开 nodemodules\gulp-rev\nodemodules\rev-path\index.js 10行 return filename + '-' + hash + ext; 修改为 return filename + ext;