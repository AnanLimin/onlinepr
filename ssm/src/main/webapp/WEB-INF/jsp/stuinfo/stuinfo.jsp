<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>学员信息档案表</title>
<%-- <link href=" <%=basePath%>css/add_stu.css" rel="stylesheet" type="text/css"> --%>
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">
<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css"
	rel="stylesheet">
<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/stuinfo.js"></script>
</head>
<body>
<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${pages}" id="pagecount" type="hidden">
	<div class="container-fluid">
		<div class="row">
			<jsp:include page="../public/navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div class="container">
					<div class="row">
						<div>
							<a href="<%=basePath%>signed/mysign.do" style="text-decoration:underline;">我的订单</a> | <a
								href="<%=basePath%>signed/Back.do">我的申请</a> | <a
								href="<%=basePath%>signed/allsigninfo.do">全部订单</a> |<a
								href="<%=basePath%>student/stuinfo.do">学员信息管理</a> 
						</div>
					</div>
				</div>
				<div class="container" style="height:20px;"></div>
				<table	class="table table-striped table-hover table-responsive table-bordered" >
					<thead>
						<tr>
							<td colspan="14">
								<div class="btn-group">
								<button id="btn_add" type="button" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#insertinfo">
										<span class="glyphicon glyphicon-plus" aria-hidden="true">新增</span>
								</button>
								&nbsp;
								<a id="btn_add" type="button" class="btn btn-xs btn-warning" href="<%=basePath%>student/Outinfo.do?fileName=学生信息档案表.xlsx">
										<span class="glyphicon glyphicon-arrow-down" aria-hidden="true">导出</span>
								</a>
								</div>
							</td>
						</tr>
						<tr class="active">
							<th>&nbsp;&nbsp;<input type="checkbox" value="all" id="stuinfo"></th>
							<th>序号</th>
							<th>姓名</th>
							<th>性别</th>
							<th>学员分档</th>
							<th>身份证</th>
							<th>手机号码</th>
							<th>紧急联系人</th>
							<th>邮箱</th>
							<th>毕业院校</th>
							<th>学历</th>
							<th>专业</th>
							<th>毕业时间</th>
							<th>英语级别</th>
						</tr>
					</thead>
						<tbody>
						<c:forEach items="${stuinfo}" var="stu">
							<tr>
							<td>&nbsp;&nbsp;<input type="checkbox" value="${stu.stuid}" name="stu_checkbox"></td>
							<td>${stu.stuid}</td>
							<td>${stu.stuname}</td>
							<td>${stu.stusex}</td>
							<td>${stu.stuscure}</td>
							<td>${stu.stucard}</td>
							<td>${stu.stuphone}</td>
							<td>${stu.stuperson}</td>
							<td>${stu.stuemai}</td>
							<td>${stu.stuschool}</td>
							<td>${stu.stugrade}</td>
							<td>${stu.stuspecia}</td>
							<td>${stu.studatetime}</td>
							<td>${stu.strenglev}</td>
							</tr>
						</c:forEach>
					</tbody>	
				</table>
				<!-- 分页按钮  -->
				<div class="container">
					<div class="row">
						<div id="mystuinfo"
							class="tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3">
						</div>
					</div>
				</div>											
		</div>
	</div>
</div>
<div class="modal" id="insertinfo">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">新增学员信息档案</h4>
				</div>
				<form action="insertinfo.do" enctype="multipart/form-data"  method="post" class="form-horizontal" onsubmit="return toinfo()">					
					<div class="modal-body">
						<div class="form-group">
							<label for="" class="col-md-3 control-label">姓名：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="stuname"
									maxlength="8" type="text" required="required">
							</div>
							<label for="" class="col-md-2 control-label">性别：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="stusex" id="stusex"
									maxlength="8" type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-md-3 control-label">学员分档：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="stuscure"
									type="text" required="required">
							</div>
							<label for="" class="col-md-2 control-label">联系人：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="stuperson" placeholder="请填写手机号码！"
									maxlength="11" type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-md-3 control-label">手机号码：</label>
							<div class="col-md-8">
								<input class="input-sm form-control" name="stuphone" id="stuphone"
									type="text" required="required" placeholder="手机号码11位">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-md-3 control-label">身份证：</label>
							<div class="col-md-7">
								<input class="input-sm form-control" name="stucard" id="stucard"
									type="text" maxlength="18"
									required="required" placeholder="身份证18位">
							</div>							
						</div>
						<div class="form-group">
							<label for="" class="col-md-3 control-label">邮箱：</label>
							<div class="col-md-7">
								<input class="input-sm form-control" name="stuemai" id="stuemai"
									maxlength="20" type="text" required="required" placeholder="邮箱格式：a.com">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-md-3 control-label">学历：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="stugrade" 
									type="text" maxlength="5"
									required="required">
							</div>
						</div>
					
						<div class="form-group">
							<label for="" class="col-md-3 control-label">毕业学校：</label>
									<div class="col-md-3">
									<input class="input-sm form-control" name="stuschool" 
									type="text" maxlength="20"								
									required="required">
								</div>
							<label for="" class="col-md-3 control-label">毕业时间：</label>
									<div class="col-md-3">
									<input class="input-sm form-control" name="studatetime"  id="studatetime"
									type="text" maxlength="20"	placeholder="2016-11-29"							
									required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">专业：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="stuspecia" 
									type="text" maxlength="5"
									required="required">
							</div>
							<label for="inputEmail" class="col-md-3 control-label">英语等级：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="strenglev" 
									type="text" maxlength="5"
									required="required">
							</div>
						</div>	
																			
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="submit" class="btn btn-primary">新增</button>
					</div>
				</form>
			</div>
		</div>
	</div>
<%@ include file="../public/footer.jsp"%>
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath%>js/bootstrap.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	<script src="<%=basePath%>js/page.js"></script>
</body>
</html>