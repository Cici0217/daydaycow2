var wWidth = $(window).width();
if(wWidth<=768){
	htmladapt.init({design_w:1080,maxW:1366, minW:320});
}

window.addEventListener('resize', function () {
    if(document.activeElement.tagName === 'INPUT'){
        document.activeElement.scrollIntoView({behavior: "smooth"})
    }
})