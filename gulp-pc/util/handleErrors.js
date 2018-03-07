/*报错处理*/
const notify = require('gulp-notify');

module.exports = ()=>{
    let args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>' 
    }).apply(this,args);//替换为当前对象
    this.emit();
}   
