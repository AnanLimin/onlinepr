<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!-- 导入shiro标签库 -->
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="container-fluid">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#navbar" aria-expanded="false"
				aria-controls="navbar">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span> <span class="icon-bar"></span> 
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">
				<img src="<%=basePath %>images/dclogo.gif" alt="logo">
			</a>
		</div>
		<div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav navbar-right">
				<li><a href="JavaScript:void(0);">您好,<shiro:user>[<shiro:principal type="java.lang.String"/>]</shiro:user></a>
				<li><a href="<%=basePath %>user/edit_pwd.do" target="_top">更改密码</a></li>
				<li><a href="<%=basePath %>user/logout.do" target="_top">退出</a></li>
			</ul>
		</div>
	</div>
</nav>

