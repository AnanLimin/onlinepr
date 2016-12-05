<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <base href="<%=basePath%>">
    
    <title>ETC-更改密码</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="icon" href="http://v3.bootcss.com/favicon.ico">
	<link href="<%=basePath%>css/public.css" rel="stylesheet" type="text/css">
	<!-- Bootstrap core CSS -->
	<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
	<!-- Custom styles for this template -->
	<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
	<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
	<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
	<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>
	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<script type="text/javascript" src="<%=basePath %>/js/jquery.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>myjs/editInfo.js"></script>
  </head>
	
  <body>
  <jsp:include page="navheader.jsp"></jsp:include>
  <div class="container-fluid">
		<div class="row">
		<jsp:include page="navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<h1 class="page-header">更改登录密码</h1>
				<form role="form" action="user/update.do" method="post" onsubmit="return checkPwd(${tempuser.eid})" target="_parent">
				   <input type="hidden" name="eid" value="${tempuser.eid}"/>
				   <div class="form-group">
				      <label for="oldPwd">请输入原密码</label>
				      <input class="form-control" id="oldPwd" name="oldPwd" type="password" required>
   				   </div>
				   <div class="form-group">
				      <label for="newPwd">请输入新的密码</label>
				      <input class="form-control" id="newPwd" name="password" type="password" required>
   				   </div>
				   <div class="form-group">
				      <label for="rnewPwd">请确认新的密码</label>
				      <input class="form-control" id="rnewPwd" name="rnewpwd" type="password" required>
   				   </div>
   				   <div class="form-group">
				       <button type="submit" class="btn btn-success btn-block">确定</button>
				   </div>
				</form>   			
			</div>
		</div>
	</div>
	<%@ include file="footer.jsp"%>
  </body>
</html>
