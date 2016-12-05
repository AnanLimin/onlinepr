<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">

<title>ETC-财务管理-收支记录</title>
<!-- Bootstrap core CSS -->
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css" rel="stylesheet">


<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
<!-- <script type="text/javascript" src="<%=basePath%>js/moment-with-locales.min.js"></script> -->
<!-- <script type="text/javascript" src="<%=basePath%>js/bootstrap-datetimepicker.min.js"></script> -->
<script type="text/javascript" src="<%=basePath%>myjs/iaer.js"></script>
</head>

<body>
	<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${pages }" id="pagecount" type="hidden">
	<div class="container-fluid">
		<div class="row">
		<jsp:include page="../public/navleft.jsp"></jsp:include>
			<%-- <div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li><a href="<%=basePath%>user/adminindex.do">首页<span class="sr-only">(current)</span></a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">销售管理</a></li>
					<li class="active"><a href="<%=basePath %>signed/firstincomepay.do">财务管理</a></li>
					<li><a href="<%=basePath %>signed/ourmanagment.do">待办工作</a></li>
				</ul>
			</div> --%>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				
				<div class="container">
						<div class="row">
							<div>
								<a href="<%=basePath %>signed/firstincomepay.do">收款</a> | 
								<a href="<%=basePath %>signed/backmoney.do">返款</a> | 
								<a href="<%=basePath %>signed/refund.do">退款</a> | 
								<a href="<%=basePath %>signed/iaer.do" style="text-decoration:underline;">收支记录</a> | 
								<a href="<%=basePath %>signed/tobeprint.do">检索</a> | 
							</div>
						</div> 
				</div>
				
				<div class="container" style="height:20px;"></div>
					<table class="table table-striped table-hover table-responsive table-bordered" id="iaerinfotable">
						<thead>
							<tr>
								<td colspan="14">
								<form id="iaerbycondition" enctype="multipart/form-data" >
									<input type="hidden" name="stime"><input type="hidden" name="sremark">
									<input type="hidden" value="1" name="pagenum">
								</form>
								<div id="money">
									<c:forEach items="${alliaeramount}" var="type">
										<c:if test="${type.type=='收入' }">
											<label>所有收入总计： </label><span style="color:fuchsia;"><fmt:formatNumber value="${type.amount }" type="currency" /></span>
										</c:if>
										<c:if test="${type.type=='支出' }">
											<label style=" margin-left: 8px;">所有支出总计： </label><span style="color:teal;"><fmt:formatNumber value="${type.amount }" type="currency" /></span>
										</c:if>
									</c:forEach>
									<label style=" margin-left: 8px;">当前页收入总计：</label><span id="inamount" style="color:fuchsia;"><fmt:formatNumber type="currency" value="${i }"/></span>
									<label style=" margin-left: 8px;">当前页支出总计：</label><span id="outamount" style="color:teal;"><fmt:formatNumber type="currency" value="${o }"/></span>
								</div>
								</td>
							</tr>
							<tr class="warning">
							  <th>日期  <a data-toggle="modal" data-target="#qwe">▼</a></th>
							  <th>客户姓名<a data-toggle="modal" data-target="#cname">▼</a></th>
							  <th>说明</th>
							  <th>收入</th>
							  <th>支出</th>
							  <th>部门</th>
							  <th>销售</th>
							  <th>经手人</th>
							 <!--  <th>更多</th> -->
							</tr>
						  </thead>
						  <tbody>
						 	<c:forEach items="${iaers }" var="iaer">
						 	<c:if test="${iaer.type=='收入'}">
						 	<tr class="success">
							  <td>${iaer.time}</td>
							  <td>${iaer.scustomername}</td>
							  <td>${iaer.remark}</td>
							  <td><fmt:formatNumber value="${iaer.amount}" type="currency"/></td>
							  <td></td>
							  <td>${iaer.scustomerschool}</td>
							  <td>${iaer.sale}</td>
							  <td>${iaer.handler}</td>
							  
							 <%--  <td>${iaer.sid}</td> --%>
							</tr>
						 	</c:if>
						 	<c:if test="${iaer.type=='支出'}">
						 	<tr class="danger">
							  <td>${iaer.time}</td>
							   <td>${iaer.scustomername}</td>
							  <td>${iaer.remark}</td>
							  <td></td>
							  <td><fmt:formatNumber value="${iaer.amount}" type="currency"/></td>
							  <td>${iaer.scustomerschool}</td>
							  <td>${iaer.sale}</td>
							  <td>${iaer.handler}</td>
							 <%--  <td>${iaer.sid}</td> --%>
							</tr>
						 	</c:if>
						 	</c:forEach>
						</tbody>
					</table>
					
					<div class="container">
						<div class="row" id="iaerpagegroup">
							
						</div>
					</div>

				</div>
		</div>
	</div>

	<div class="modal" id="qwe">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title">选择日期</h4>
	      </div>
	      <div class="modal-body">
	        <p>
	        	<select id="iaeryear"></select>年  
	        	<select id="iaermonth">
	        		<option value="1">1</option>
	        		<option value="2">2</option>
	        		<option value="3">3</option>
	        		<option value="4">4</option>
	        		<option value="5">5</option>
	        		<option value="6">6</option>
	        		<option value="7">7</option>
	        		<option value="8">8</option>
	        		<option value="9">9</option>
	        		<option value="10">10</option>
	        		<option value="11">11</option>
	        		<option value="12">12</option>
	        	</select>月 
	        	<select id="iaerday"></select>日   
	        	<input type="checkbox" id="onlymonth" checked="checked"><label for="onlymonth">只看到月份</label>
	        </p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="submit" class="btn btn-primary"data-dismiss="modal" onclick="checkiaerbycondition()">确定</button>
	      </div>
	    </div>
	  </div>
	</div>
	<div class="modal" id="cname">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title">查询收支记录</h4>
	      </div>
	      <div class="modal-body">
	        <p>
	        	<input type="text" id="customername" placeholder="客户姓名" size="8">
	        	<input type="text" id="sale" placeholder="销售姓名" size="8">
	        </p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="submit" class="btn btn-primary"data-dismiss="modal" onclick="findiaer()">确定</button>
	      </div>
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
	<%-- <script type="text/javascript" src="<%=basePath%>myjs/customer.js"></script> --%>
	<script src="<%=basePath%>js/page.js"></script>
	<script src="<%=basePath%>js/move-model.js"></script>

</body>
</html>
						