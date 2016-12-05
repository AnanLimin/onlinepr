<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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

<title>ETC-财务管理-收款</title>
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
<script type="text/javascript" src="<%=basePath%>myjs/financial.js"></script>
</head>

<body>
	<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${pages}" id="pagecount" type="hidden">
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
								<a href="<%=basePath %>signed/firstincomepay.do" style="text-decoration:underline;">收款</a> | 
								<a href="<%=basePath %>signed/backmoney.do">返款</a> | 
								<a href="<%=basePath %>signed/refund.do">退款</a> | 
								<a href="<%=basePath %>signed/iaer.do">收支记录</a> | 
								<a href="<%=basePath %>signed/tobeprint.do">检索</a> | 
							</div>
						</div>
				</div>
				
				<!-- 4:3 aspect ratio -->
				<!-- <div class="embed-responsive embed-responsive-4by3">
				  <iframe class="embed-responsive-item" src="login.jsp"></iframe>
				</div> -->
				<div class="container" style="height:20px;"></div>
					<table class="table table-striped table-hover table-responsive table-bordered" id="signstautusinfotable">
						<thead>
							
							<!-- <tr >
								<td colspan="14">
									<div class="btn-group">
										<button id="btn_edit" type="button" class="btn btn-xs btn-success" onclick="showModel()">
											<span class="glyphicon glyphicon-arrow-down" aria-hidden="true">收款</span>
										</button>
									</div>
								</td>
							</tr> -->
							<tr>
							  <th>编号</th>
							  <th>客户姓名<a data-toggle="modal" data-target="#customername">▼</a></th>
							  <th>学费</th>
							  <th>住宿费</th>
							  <th>补贴</th>
							  <th>定金</th>
							  <th>小计</th>
							  <th>实缴费用</th>
							  <th>欠费</th>
							  <th>销售</th>
							  <th>签单时间</th>
							  <th>操作</th>
							</tr>
						  </thead>
						  <tbody>
						 	<c:forEach items="${financial }" var="signed">
						 	<c:if test="${!empty signed.condition }">
								<tr style="background-color: #ffa042;">			 	
						 	</c:if>
						 	<c:if test="${empty signed.condition }">
								<tr>			 	
						 	</c:if>
							  <td>${signed.sid}</td>
							  <td>${signed.scustomername}</td>
							  <td><fmt:formatNumber value="${signed.studyfee}" type="currency" /></td>
							  <td><fmt:formatNumber value="${signed.spacefee}" type="currency" /></td>
							  <td><fmt:formatNumber value="${signed.backfee}" type="currency" /></td>
							  <td><fmt:formatNumber value="${signed.depositfee}" type="currency" /></td>
							  <td><fmt:formatNumber value="${signed.studyfee+signed.spacefee+signed.backfee+signed.depositfee}" type="currency" /></td>
							  <td><fmt:formatNumber type="currency">${signed.condition}<c:if test="${empty signed.condition }">0</c:if></fmt:formatNumber></td>
							  <td><fmt:formatNumber type="currency">${signed.studyfee+signed.spacefee+signed.backfee+signed.depositfee-signed.condition}</fmt:formatNumber></td>
							  <td>${signed.sale}</td>
							  <td>${signed.stime}</td>
							  <td><a style="cursor:pointer" onclick="showModel(${signed.sid})">收款</a></td>
							</tr>
						 	</c:forEach>
						</tbody>
					</table>
					<table class="table table-bordered">
						<tr>
							<td>
								<div id="shoukuan" class='tcdPageCode col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'></div>
							</td>
						</tr>
					</table>
					
				</div>
		</div>
	</div>

<div class="modal" id="incomeinfo" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true" >
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><b>收款</b></h4>
      </div>
      <form id="incomeform" action="signed/addoneiaer.do" method="post" onsubmit="return checkdata()" >
      	<input type="hidden" name="sid" value="">
      	<input type="hidden" name="type" value="收入">
      	<input type="hidden" name="stateid" value="1">
	      <div class="modal-body">
		      <div class="panel panel-default">
				  <div class="panel-heading">
				   <div class="container">
			      		<div class="row">
			      			<div class="col-sm-3">
			      				<span>日期：</span><input name="time" type="text" style="border-style:none; background:rgba(0,0,0,0)" readonly="readonly">
			      			</div>
			      			<div class="col-sm-4">
			      				<span>收款人：</span><input name="handler" type="text" style="border-style:none; background:rgba(0,0,0,0)" readonly="readonly">
			      			</div>
		      		 	</div>
	      		 	</div>
	      		  </div>
				  <div class="panel-body">
				    <div class="container">
			      		<div class="row">
			      			<div class="col-md-2">订单编号：<span></span></div>
			      			<div class="col-md-8">客户姓名：<span></span></div>
			      		</div>
			      		<div class="row">
			      			<div class="col-md-2">销售：<span></span></div>
			      			<div class="col-md-8">应收金额：<label></label><span></span></div>
			      		</div>
			      		<div class="row">
			      			<div class="col-md-2">已交金额：<span></span></div>
							<div class="col-md-8">应返金额：<span></span></div>		      			
			      		</div>
			      	</div>
			      	<div class="container">
			      		<div class="row">
			      			<div class="col-md-2">本次收款金额：</div>
			      		</div>
			      		<div class="row">
			      			<div class="col-md-1">学费：</div>
			      			<div class="col-md-1">住宿费：</div>
			      			<div class="col-md-1">补贴：</div>
			      			<div class="col-md-1">定金：</div>
			      		</div>
			      		<div class="row">
			      			<div class="col-md-1">
			      			<input class="col-md-12" name="studyfee" type="text" value="0" onkeyup="this.value=this.value.replace(/\D/gi,'')" />
			      			</div>
			      			<div class="col-md-1">
			      			<input class="col-md-12" name="spacefee" type="text" value="0" onkeyup="this.value=this.value.replace(/\D/gi,'')"  />
			      			</div>
			      			<div class="col-md-1">
			      			<input class="col-md-12" name="backfee" type="text" value="0" onkeyup="this.value=this.value.replace(/\D/gi,'')"  />
			      			</div>
			      			<div class="col-md-1">
			      			<input class="col-md-12" name="depositfee" type="text" value="0" onkeyup="this.value=this.value.replace(/\D/gi,'')"  />
			      			</div>
			      		</div>
				  </div>
			  </div>
	      	</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="submit" class="btn btn-primary">确定</button>
	      </div>
      </form>
    </div>
  </div>
</div>

<div class="modal" id="customername">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title">选择客户</h4>
	      </div>
	      <div class="modal-body">
	        <p>
	        	请输入客户姓名：<input type="text" id="cusname" >
	        </p>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="submit" class="btn btn-primary"data-dismiss="modal" onclick="selectcustomerbyname()">确定</button>
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
	<script src="<%=basePath%>js/page.js"></script>
	<script src="<%=basePath%>js/move-model.js"></script>

</body>
</html>
						