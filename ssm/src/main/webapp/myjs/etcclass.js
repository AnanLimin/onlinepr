$(document).ready(function () {
	$('.datetimepicker').datetimepicker({  
        format: 'YYYY-MM-DD',  
        locale: moment.locale('zh-cn')  
    });
	$(".btn-danger").click(function (e) {
		var actualnum = $(e.target).parent().prev().children().eq(6).html();//获得当前点击元素的父元素的上一个兄弟元素的第6+1个元素的文本内容
		if(actualnum!=0){
			alert("班级人数不为0，不能删除");
			return false;
		}
		if (!confirm("确定要删除这个班级吗？不可恢复")) {
			return false;
		}
	});
	
	
	$(".btn-warning").click(function (e) {
		$("#updateclass input:first").val($(e.target).parent().parent().find('div').html());
		$("#updateclass input:last").val($(e.target).parent().parent().find('span').eq(0).html());
		$("#updateclass input:eq(1)").val($(e.target).parent().parent().find('span').eq(2).html());
		$("#updateclass input:eq(2)").val($(e.target).parent().parent().find('span').eq(4).html());
		$("#updateclass input:eq(3)").val($(e.target).parent().parent().find('span').eq(5).html());
		$("#updateclass option").each(function(i,p){
			var name = $(e.target).parent().parent().find('span').eq(1).html();
			if($(p).html()==name){
				$(p).attr('selected','selected')
			}
		});
	});
	
	$("a[name='kaohe']").click(function(e){
		var etcname = $(e.target).parent().parent().find('div').html();
		var etcid = $(e.target).parent().parent().find('span').eq(0).html();
		window.location.href="student/appraise.do?etcname="+etcname+"&etcid="+etcid;
	});
	
	
	$(".panel-body").click(function (e) {
		var etcid =$(e.target).parent().parent().find('span').eq(0).html();//获得被点击班级的编号
		window.location.href="student/classstudent.do?etcid="+etcid;
	});
	$(".panel-body").mousemove(function (e) {
		$(e.target).parent().addClass('panel-info');
	});
	$(".panel-body").mouseout(function (e) {
		$(e.target).parent().removeClass('panel-info');
	});
}) ;

function addclass(){
	$("#addclass form").submit();
}