<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>权限不够！</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<style type="text/css">
		body {margin: 0px; padding:0px; font-family:"微软雅黑", Arial, "Trebuchet MS", Verdana, Georgia,Baskerville,Palatino,Times; font-size:16px;}
		div{margin-left:auto; margin-right:auto;}
		a {text-decoration: none; color: #1064A0;}
		a:hover {color: #0078D2;}
		img { border:none; }
		h1,h2,h3,h4 {
		/*	display:block;*/
			margin:0;
			font-weight:normal; 
			font-family: "微软雅黑", Arial, "Trebuchet MS", Helvetica, Verdana ; 
		}
		h1{font-size:44px; color:#0188DE; padding:20px 0px 10px 0px;}
		h2{color:#0188DE; font-size:16px; padding:10px 0px 40px 0px;}
		
		#page{width:910px; padding:20px 20px 40px 20px; margin-top:80px;}
		.button{width:180px; height:28px; margin-left:0px; margin-top:10px; background:#009CFF; border-bottom:4px solid #0188DE; text-align:center;}
		.button a{width:180px; height:28px; display:block; font-size:14px; color:#fff; }
		.button a:hover{ background:#5BBFFF;}
	</style>
    
	
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
   
	<div id="page" style="border-style:dashed;border-color:#e4e4e4;line-height:30px;background:url(sorry.png) no-repeat right;">
		<h1>抱歉，您的权限不够进行这项操作~</h1>
		<h2>Sorry, you do not have enough permissions to carry out this operation。 </h2>
		<font color="#666666">请返回上一页或者重新登录，再操作，谢谢！</font><br /><br />
		<!-- <div class="button">
			<a href="empinfo/checklogin.do" title="进入首页" target="_parent">进入首页</a>
		</div> -->
	</div>
   
  </body>
</html>
