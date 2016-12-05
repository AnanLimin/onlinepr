$(document).ready(function() {
	
	
	$("#workexperienceform").hide();
	$("#basicform").hide();
	$("#socialform").hide();
	$("div[id*='updatework']").hide();
	$("div[id*='updatesocial']").hide();
	$("#acquaintance").hide();
	// 更改籍贯
	$("#mycdhometown button").click(function() {
		$("#cdhometown").val($("#mycdhometown select").val());
	});

	// 更改民族
	$("#mycdnation button").click(function() {
		$("#cdnation").val($("#mycdnation select").val());
	});

	// 更改学历
	$("#mycdeducation button").click(function() {
		$("#cdeducation").val($("#mycdeducation select").val());
	});
	// 更改政治面貌
	$("#mycdlandscape button").click(function() {
		$("#cdlandscape").val($("#mycdlandscape select").val());
	});
	// 更改子女状况
	$("#mycdchildren button").click(function() {
		$("#cdchildren").val($("#mycdchildren select").val());
	});
	// 更改应聘职位
	$("#mycdwork button").click(function() {
		$("#cdwork").val($("#mycdwork select").val());
	});
	// 更改期望薪资
	$("#mycdsalary button").click(function() {
		$("#cdsalary").val($("#mycdsalary select").val());
	});

	// 新增工作经历
	$("#showworkexperience").click(function() {
		$("#workexperienceform").show();
		$("#workinfo").hide();
	});

	// 编辑基本信息
	$("#editbasicinfo").click(function() {
		$("#basicform").show();
		$("#editbasicinfo").hide();
	});

	// 新增社会关系
	$("#showsocialrelations").click(function() {
		$("#socialform").show();
		$("#socialinfo").hide();
	});

	// 是否有熟人
	$("input[name=acquaintanceradio]").click(function() {
		if ($("#yes").is(":checked")) {
			$("#acquaintance").show();
		}
		else {
			$("#acquaintance").hide();
		}
	});

});

function showedit(status) {
	$("#oneworkinfo" + status).addClass('panel panel-info panel-body');
	$("#" + status).show();
}

function showsocialedit(status) {
	$("#onesocialinfo" + status).addClass('panel panel-info panel-body');
	$("#social" + status).show();
}

function hideedit(status) {
	$("#oneworkinfo" + status).removeClass('panel panel-info panel-body');
	$("#" + status).hide();
}

function hidesocialedit(status) {
	$("#onesocialinfo" + status).removeClass('panel panel-info panel-body');
	$("#social" + status).hide();

}
function deletework() {
	if (confirm("确定要删除吗")) {
		return true;
	} else {
		return false;
	}
}

function cancelsocial() {
	$("#socialform").hide();
	$("#socialinfo").show();
}

function cancelwork() {
	$("#workexperienceform").hide();
	$("#workinfo").show();
}
function updatework(status) {
	$("#updatework" + status).show();
	$("#oneworkinfo" + status).hide();
}

function updatesocial(status) {
	$("#updatesocial" + status).show();
	$("#onesocialinfo" + status).hide();
}
function addexperience() {
	$("#workexperienceform").hide();
}