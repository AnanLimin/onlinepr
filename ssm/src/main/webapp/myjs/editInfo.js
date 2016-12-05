function focusdata(data){
	data.select();
}

function check_editPerInfo(){
	//alert("执行了检查");
	var email = "^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*[0-9a-zA-Z]+))@([a-zA-Z0-9-]+[.])+([a-zA-Z]{2}|net|NET|com|COM|gov|GOV|mil|MIL|org|ORG|edu|EDU|int|INT)$"
	var re_email = new RegExp(email);
	if(!/^1\d{10}$/g.test($('#pTel').val())){
		alert("电话号码格式错误");
		$('#pTel').focus();
		$('#pTel').select();
		return false;
	}else if(!re_email.test($('#pPos').val())){
		alert ("请输入有效合法的E-mail地址 ！");
		$('#pPos').focus();
		$('#pPos').select();
		return false;
	}else if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#pCardid').val())){
		alert("身份证号码有误");
		$('#pCardid').focus();
		$('#pCardid').select();
		return false;
	}else{
		alert("修改成功");
		return true;
	}
}

function checkPwd(eid){
	var flag = 0 ;
	var oldPwd = $("#oldPwd").val();
	//alert(oldPwd);
	if($("#newPwd").val()!=$("#rnewPwd").val()){
		alert("两次输入的确认密码不一致");
		return false;
	}
	var url = "user/edit.do";
	$.ajax({
		type : 'POST',
		url : url,
		dataType :'text',
		async:false,//你用post请求传值到另一个页面后台，但是页面一加载你的ajax就已经执行过了，传值接收是在后台才完成的，这时候就请求不到数据，所以可以考虑把ajax请求改为同步试试。(为true时为异步)
		data : {"oldPwd":oldPwd ,"eid":eid},
		success : function(data) {
			if(data=="yes"){
				flag=1;
			}else{
				alert(data);
				$("#oldPwd").select();
				$("#oldPwd").focus();
			}
			
		}
	});
	if(flag==1){
		if(confirm("确定要更改密码吗？改后需重新登录")){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
	
}