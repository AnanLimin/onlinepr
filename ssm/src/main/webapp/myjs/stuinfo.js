/**
	 * @author chen
	 * 学生信息档案的所有信息
	 * @param stuinfo.jsp
	 * @return 
	 */
$(document).ready(function(){
	//生成分页按钮，并且能够查看分页后信息
	$("#mystuinfo").createPage({
			pageCount:$("#pagecount").val(),
		    current:1,
		    backFn:function(p){
		    	$.ajax({
		    		type : 'POST',
		    		url : 'student/stu.do',
		    		dataType :'json',
		    		async:false, //这是重要的一步，防止重复提交的
		    		data : { "pagenum" : p},
		    		success : function(list) {
		    			if(list!=null || list.length>0){
		    				var htmlcontext = "";
		    				for(var obj in list){	    			
		    					htmlcontext +="<tr><td>"+list[obj].stuid+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuname+"</td>";
		    					htmlcontext +="<td>"+list[obj].stusex+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuscure+"</td>";
		    					htmlcontext +="<td>"+list[obj].stucard+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuphone+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuperson+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuemai+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuschool+"</td>";
		    					htmlcontext +="<td>"+list[obj].stugrade+"</td>";
		    					htmlcontext +="<td>"+list[obj].stuspecia+"</td>";
		    					htmlcontext +="<td>"+list[obj].studatetime+"</td>";
		    					htmlcontext +="<td>"+list[obj].strenglev+"</td></tr>";
		
		    				}
						}
		    			$("#stuinfo").find("tbody").html(htmlcontext);
		    		}
		    	});
		    }
	})	
	
})
function toinfo(){
	var stusex=document.getElementById("stusex").value;
	var stuphone=document.getElementById("stuphone").value;
	var stucard=document.getElementById("stucard").value;
	var stuemai=document.getElementById("stuemai").value;
	var studatetime=document.getElementById("studatetime").value;	
	var date =/^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1}$/;
	var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	
	 if (!reg.test(stuemai)){
	    alert("您输入的邮箱有误,请重新核对后再输入!");
		return false;
	 }else if(!(/^1[34578]\d{9}$/.test(stuphone))){ 
	        alert("手机号码有误，请重填");  
	        return false; 
	 }else if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(stucard))){
		 	alert("身份证号码有误，请重填");  
	        return false;  		 
	 }else if(!date.test(studatetime)){
		 	alert("毕业时间格式有误，正确格式应为'2012-01-01'");  
	        return false; 		 
	 }else{
		 return true;
	 }
	 
}