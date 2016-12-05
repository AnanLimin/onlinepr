$(document).ready(function () {
	$(".btn-warning").click(function (e) {
		var stuid = $(e.target).parent().parent().find('span').eq(0).html();
		window.location.href="student/editstudent.do?sid="+stuid;//跳转后台的页面 
	});
	
});