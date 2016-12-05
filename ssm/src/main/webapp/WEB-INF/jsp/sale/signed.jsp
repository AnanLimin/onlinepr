<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"
	isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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

<title>ETC-客户管理</title>
<!-- Bootstrap core CSS -->
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
<script type="text/javascript"
	src="<%=basePath%>js/moment-with-locales.min.js"></script>
<script type="text/javascript"
	src="<%=basePath%>js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/financial.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/signed.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/signedinfo.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/BackMoney.js"></script>
<style type="text/css">
*{ margin:0; padding:0}

ul{
 list-style: none;
}
.tab{
 width: 600px;
}
.tab .tab_menu{
 height: 30px;
 width: 600px; 

}
.tab .tab_menu ul li.butclose{
	float: left;
 text-align: center;
 margin-left: 380px;

}
.tab .tab_menu ul li{
 float: left;
 text-align: center;
 margin-left: 25px;

}
.tab .tab_menu ul li:last-child{
 border-right:none;

}
.tab .tab_menu ul li.on{
 background: #999;
}
.tab .tab_box > div{
 display: none; //将三个内容框架全隐藏，通过下面的:first-child属性只将第一个框架内容显示出来
}
.tab .tab_box > div:first-child{
 display: block;
}
</style>
</head>

<body>
	<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${pages }" id="pagecount" type="hidden">
	<div class="container-fluid">
		<div class="row">
			<jsp:include page="../public/navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div class="container">
					<div class="row">
						<div>
							<a href="<%=basePath%>signed/mysign.do" style="text-decoration:underline;">我的订单</a> | <a
								href="<%=basePath%>signed/Back.do">我的申请</a> | <a
								href="<%=basePath%>signed/allsigninfo.do">全部订单</a> |
								<a href="<%=basePath%>student/stuinfo.do">学员信息档案</a> |
						</div>
					</div>
				</div>
				<div class="container" style="height:20px;"></div>
				<table
					class="table table-striped table-hover table-responsive table-bordered" id="customerinfotable">
					<thead>
						<tr>
							<td colspan="13">
								<div class="btn-group">
									<button id="btn_add" type="button" class="btn btn-xs btn-danger"  data-toggle="modal" data-target="#importTemplates">
										<span class="glyphicon glyphicon-arrow-down" aria-hidden="true">导入</span>
									</button>
									<button id="btn_add" type="button" class="btn btn-xs btn-primary" data-toggle="modal" data-target="#addonesign">
										<span class="glyphicon glyphicon-plus" aria-hidden="true">新增</span>
									</button>
									<!-- <button id="btn_edit" type="button" class="btn btn-xs btn-success" onclick="updatacustomerinfo()">
												<span class="glyphicon glyphicon-pencil" aria-hidden="true">修改</span>
											</button> -->
									<button id="btn_delete" type="button"
										class="btn btn-xs btn-warning" onclick="delectsigninfo()">
										<span class="glyphicon glyphicon-remove" aria-hidden="true">删除</span>
									</button>
									<button id="btn_add" type="button"
										class="btn btn-xs btn-danger" onclick="BackModel()">
										<span class="glyphicon glyphicon-arrow-up" aria-hidden="true">返款</span>
									</button>
									<button id="btn_add" type="button"
										class="btn btn-xs  btn-success" onclick="ExitModel()">
										<span class="glyphicon glyphicon-arrow-up" aria-hidden="true">退款</span>
									</button>
								</div>
							</td>
							<td id="notpaymoney" colspan="2">
								
							</td>
						</tr>
						<tr class="active">
							<th>&nbsp;&nbsp;<input type="checkbox" value="all" id="signedinfo"></th>
							<th>编号</th>
							<th>签单时间</th>
							<th>业务类型</th>
							<th>销售</th>
							<th>部门</th>
							<th>客户姓名</th>
							<th>学费</th>
							<th>住宿费</th>
							<th>补贴</th>
							<th>定金</th>
							<th>应缴</th>
							<th>实缴</th>
							<th>区域</th>
							<th>订单状态</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${signedinfo }" var="signed">
							<c:if test="${signed.condition=='已完成'}">
								<tr class="success">
							</c:if>
							<c:if test="${signed.condition=='未收款'}">
								<tr class="warning">
							</c:if>
							<c:if test="${signed.condition=='已收款'}">
								<tr class="info">
							</c:if>
							<c:if test="${signed.condition=='已删除'}">
								<tr class="danger">
							</c:if>
							<td>&nbsp;&nbsp;<input type="checkbox" value="${signed.sid}" name="signed_checkbox"></td>
							<td>${signed.sid}</td>
							<td>${signed.stime}</td>
							<td>${signed.sbusinesstype}</td>
							<td>${signed.sale}</td>
							<td>${signed.dept}</td>
							<td>${signed.scustomername}</td>
							<td><fmt:formatNumber value="${signed.studyfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.spacefee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.backfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.depositfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.studyfee+signed.spacefee+signed.backfee+signed.depositfee}" type="currency" /></td>
							<td><fmt:formatNumber value="${signed.stateid}" type="currency" /></td>
							<td>${signed.sarea}</td>
							<td>${signed.condition}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<!-- 分页按钮  -->
				<div class="container">
					<div class="row">
						<div id="mysign"
							class="tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="modal" id="importTemplates">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">导入签单信息</h4>
				</div>
				<form action="signed/readExcel.do" enctype="multipart/form-data"
					method="post">
					<div class="modal-body">
						<input id="mFile" type="file" class="file" name="mFile">
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="submit" class="btn btn-primary">导入</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="modal" id="addonesign">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">新增签单信息</h4>
				</div>
				<form action="signed/insertonesign.do" enctype="multipart/form-data"
					onsubmit="return addsigned()" method="post" class="form-horizontal">
					<input type="hidden" name="sale" id="sale"> <input
						type="hidden" name="stime" id="stime">
					<div class="modal-body">
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">客户姓名：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="scustomername"
									maxlength="8" type="text" required="required">
							</div>
							<label for="" class="col-md-2 control-label">人数：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="speoplenum"
									maxlength="8" type="text" placeholder="1"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">学校：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="scustomerschool"
									type="text" required="required">
							</div>
							<label for="inputEmail" class="col-md-2 control-label">年级：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="scustomergrade"
									maxlength="8" type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">院系：</label>
							<div class="col-md-8">
								<input class="input-sm form-control" name="scustomercollege"
									type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">专业：</label>
							<div class="col-md-8">
								<input class="input-sm form-control" name="scustomermajor"
									type="text" required="required">
							</div>
						</div>

						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">身份证：</label>
							<div class="col-md-7">
								<input class="input-sm form-control" name="scustomercardid"
									type="text" maxlength="18" id="addcardid"
									required="required">
							</div>
							<span id="ipmessage"></span>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">银行卡：</label>
							<div class="col-md-7">
								<input class="input-sm form-control" name="scustomerbankcardid"
									maxlength="20"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')"
									type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">开户行：</label>
							<div class="col-md-7">
								<input class="input-sm form-control" name="bank"
									maxlength="40" type="text" required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">学费：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="studyfee"
									value="13800" maxlength="8" type="text"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
							<label for="inputEmail" class="col-md-2 control-label">住宿费：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="spacefee" value="800"
									type="text" maxlength="5"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">补贴：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="backfee" value="0"
									type="text" maxlength="5"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
							<label for="inputEmail" class="col-md-2 control-label">定金：</label>
							<div class="col-md-3">
								<input class="input-sm form-control" name="depositfee" value="0"
									type="text" maxlength="4"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
									onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">业务类型：</label>
							<div class="col-md-3">
								<select class="input-sm form-control" name="sbusinesstype">
									<option value="渠道培训">渠道培训</option>
									<option value="实习实训">实习实训</option>
									<option value="深度合作">深度合作</option>
									<option value="社招培训">社招培训</option>
									<option value="其他">其他</option>
								</select>
							</div>
							<label for="inputEmail" class="col-md-2 control-label">区域：</label>
							<div class="col-md-3">
								<select class="input-sm form-control" name="sarea">
									<option value="湖南">湖南</option>
									<option value="湖北">湖北</option>
									<option value="广东">广东</option>
									<option value="广西">广西</option>
									<option value="云南">云南</option>
									<option value="其他">其他</option>
								</select>
							</div>
						</div>
						<div class="form-group">
							<label for="inputEmail" class="col-md-3 control-label">备注：</label>
							<div class="col-md-8">
								<textarea class="input-sm form-control" name="sremark"
									placeholder="" style="width: 100%; height: 73px;resize: none;"></textarea>
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
	<!-- 退款-->
	<div class="modal" id="info" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">
						<b>退款申请单</b>
					</h4>
				</div>
				<form id="incomeform" class="form-horizontal" action="signed/UpdateByBack.do" method="post" onsubmit="return submitbyexit()">
					<input type="hidden" name="sid" value="">
					<input type="hidden" name="stateid" value="" id="stateid">
					<div class="modal-body">
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">日期：</span> 
							<div class="col-md-3">
								<input type="text" class="form-control input-sm" name="time" disabled="disabled">
							</div>
							<span class="col-md-2">经手人:</span>
							<div class="col-md-3">
							 	<input name="handler" type="text" class="form-control input-sm" disabled="disabled">
							</div>
						</div>
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">客户姓名：</span> 
							<div class="col-md-3">
								<input type="text" class="form-control input-sm" name="customername" disabled="disabled">
							</div>
							<span class="col-md-2">销售：</span> 
							<div class="col-md-3">
								<input type="text" class="form-control input-sm" name="sale" disabled="disabled">
							</div>
						</div>
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">身份证号：</span>
							<div class="col-md-3">
									 <input type="text" class="form-control input-sm"
										name="scustomercardid" maxlength="18" id="refundcardid"
										required="required">
							</div>
							<span class="col-md-2">银行卡号：</span> 
							<div class="col-md-3">
								<input type="text" class="form-control input-sm"
									name="scustomerbankcardid" id="scustomerbankcardid"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
								onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
						</div>
						<div class="form-group">
		      				<span class="col-md-2 col-md-offset-1">开户行：</span>	
		      				<div class="col-md-3">
    							<input type="text" class="form-control input-sm" name="bank">
 							</div>	
							<span class="col-md-2">退款金额：</span>
							<div class="col-md-3">
								<input type="text" class="form-control input-sm"
								name="backfee" required="required">
							</div>
						</div>
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">退款备注（原因）：</span>
							<div class="col-md-8">
								<textarea class="form-control" name="remark"
									style="width: 466px; height: 73px;resize: none;"
									placeholder="备注：请填写退款原因、类型等。"></textarea>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">取消</button>
							<button type="submit" class="btn btn-primary">提交</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<!-- 返款 申请-->
	<div class="modal" id="infoback" tabindex="-1" role="dialog"
		aria-labelledby="myModal" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">
						<b>返款申请单</b>
					</h4>
				</div>
				<form id="incomeform2" class="form-horizontal" action="signed/UpdateByBack.do" method="post" onsubmit="return submitbyback()">
					<input type="hidden" name="sid" value=""> <input type="hidden" name="stateid" value="">
					<div class="modal-body">
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">日期：</span>
							<div class="col-md-3">
								 <input type="text" class="form-control input-sm" name="time" disabled="disabled">
							</div>
							<span class="col-md-2">经手人：</span>
							<div class="col-md-3"> 
								<input type="text" name="handler" class="form-control input-sm" value="" disabled="disabled">
							</div>
						</div>
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">客户姓名：</span>
							<div class="col-md-3">
								 <input type="text" class="form-control input-sm" name="customername" disabled="disabled">
							</div>
							<span class="col-md-2">销售：</span>
							<div class="col-md-3">
								 <input type="text" class="form-control input-sm" name="sale" disabled="disabled">
							</div>
						</div>

						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">身份证号：</span> 
							<div class="col-md-3">
								<input type="text" class="form-control input-sm "
									name="scustomercardid" maxlength="18" id="backcardid"
									required="required">
							</div>
							<span class="col-md-2">银行卡号：</span> 
							<div class="col-md-3">
								<input type="text" class="form-control input-sm"
									name="scustomerbankcardid" id="scustomerbankcardid"
									onkeyup="this.value=this.value.replace(/\D/g,'')"
								onafterpaste="this.value=this.value.replace(/\D/g,'')"
									required="required">
							</div>
						</div>
						<div class="form-group">
		      				<span class="col-md-2 col-md-offset-1">开户行：</span>	
		      				<div class="col-md-3">
   								<input type="text" class="form-control input-sm" name="bank">
						 	</div>	
							<span class="col-md-2">应返金额：</span>
							<div class="col-md-3"> 
								<input type="text" class="form-control input-sm" name="backfee" id="backfee" required="required">
							</div>
						</div>
						<div class="form-group">
							<span class="col-md-2 col-md-offset-1">返款备注（原因）：</span>
							<div class="col-md-3">
								<textarea class="form-control" name="remark"
								style="width: 466px; height: 73px;resize: none;"
								placeholder="请填写原因等"></textarea>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">取消</button>
							<button type="submit" class="btn btn-primary">确定</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

<!-- 查看详细信息  -->
<div class="modal" id="SigneDetailsInfo" tabindex="-1" role="dialog" 
 aria-labelledby="myModalLabel" aria-hidden="true" >
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<div class="tab">
						<div class="tab_menu">
							<ul>
								<li class="on">基本信息</li>
								<li>其他信息</li>
							</ul>
							<ul>
								<li class="butclose">
									<button type="button" class="close" data-dismiss="modal"
										aria-hidden="true">&times;</button>
								</li>
							</ul>
						</div>
						<div>
							<div class="tab_box">
								<div class="modal-body">
									<div class="table-responsive">
										<table class="table table-bordered" id="baseInfomation" style="width:95%">
											<tbody>
												<tr>
													<td>签单编号：</td>
													<td><input name="sid" value="" readonly="readonly"></td>
													<td>签单时间：</td>
													<td> <input name="stime" value="" readonly="readonly">
													</td>
												</tr>
												<tr>
													<td>客户姓名：</td>
													<td><input
														name="scustomername" value="" readonly="readonly">

													</td>
													<td>客户人数：</td>
													<td><input 
														name="speoplenum" value="" readonly="readonly">
													</td>
												</tr>

												<tr>

													<td>客户学校：</td>
													<td><input 
														name="scustomerschool" value="" readonly="readonly">

													</td>
													<td>客户年级：</td>
													<td><input 
														name="scustomergrade" value="" readonly="readonly">

													</td>
												</tr>
												<tr>
													<td>客户院系：</td>
													<td><input 
														name="scustomercollege" value="" readonly="readonly">

													</td>
													<td>客户专业：</td>
													<td> <input 
														name="scustomermajor" value="" readonly="readonly">
													</td>
												</tr>
												<tr>
													<td>身份证：</td>
													<td><input 
														name="scustomercardid" value="" readonly="readonly">

													</td>
													<td>银行卡：</td>
													<td><input 
														name="scustomerbankcardid" value="" readonly="readonly">
													</td>
												</tr>
												<tr>
													<td>开户行：</td>
													<td colspan="3"><input 
														name="bank" value="" readonly="readonly">
													</td>
												</tr>
												<tr>
													<td>业务类型：</td>
													<td> <input name="sbusinesstype" value="" readonly="readonly">
													</td>
													<td>区域：</td>
													<td><input name="sarea"
														value="" readonly="readonly"></td>
												</tr>
												<tr>
													<td>备注：</td>
													<td colspan="4"><textarea name="sremark" style="resize: none;" readonly="readonly"></textarea></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="modal-body">
									<div class="table-responsive">
										<table class="table table-bordered" id="baseInfomation"  style="width:95%">
											<tr>
												<td>学费：</td>
												<td><input  
													name="studyfee" value="" readonly="readonly"></td>
												<td>住宿费：</td>
												<td><input  
													name="spacefee" value="" readonly="readonly"></td>
											</tr>
											<tr>
												<td>返款：</td>
												<td><input name="backfee"
													value="" readonly="readonly"></td>
												<td>定金：</td>
												<td><input  
													name="depositfee" value="" readonly="readonly"></td>
											</tr>
											<tr>
												<td>备注：</td>
												<td colspan="4">
												<textarea name="sremark" style="resize: none;" readonly="readonly"></textarea>
											</tr>
										</table>
									</div>
								</div>
							</div>
							<p align="center">
								<button type="button" class="btn btn-success" data-dismiss="modal" onclick="updatasigninfo()">修改</button>
								<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>



	<!-- 修改信息 -->
	<div class="modal" id="updataSigneInfo" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<ul>
						<li>基本信息修改</li>
					</ul>
					<ul>
						<li class="butclose">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</li>
					</ul>
				</div>
				<div>
					<div class="tab_box">
						<div class="modal-body">
							<div class="container-fluid">
								<form action="signed/UpdateByPrimaryKey.do" method="post" class="form-horizontal">
									<div class="form-group">
								      <label class="col-md-3 control-label">签单编号：</label>
								      <div class="col-md-3">
										<input class="input-sm form-control" name="sid" value="" readonly="readonly">
								      </div>
								      <label for="" class="col-md-2 control-label">签单时间：</label>
								      <div class="col-md-3">
										<input class="input-sm form-control" name="stime" value="" readonly="readonly">
								      </div>
								   </div>
									<div class="form-group">
								      <label class="col-md-3 control-label">客户姓名：</label>
								      <div class="col-md-3">
										<input class="input-sm form-control" name="scustomername" value="" readonly="readonly">
								      </div>
								      <label for="" class="col-md-2 control-label">客户人数：</label>
								      <div class="col-md-3">
										<input class="input-sm form-control" name="speoplenum" value="" readonly="readonly">
								      </div>
								   </div>
								   <div class="form-group">
								      <label class="col-md-3 control-label">身份证：</label>
								      <div class="col-md-3">
										<input class="input-sm form-control" name="scustomercardid">
								      </div>
								      <label for="" class="col-md-2 control-label">银行卡：</label>
								      <div class="col-md-3">
										<input class="input-sm form-control" name="scustomerbankcardid">
								      </div>
								   </div>
								   <div class="form-group">
								      <label class="col-md-3 control-label">开户行：</label>
								      <div class="col-xs-8">
										<input class="input-sm form-control" name="bank" value="">
								      </div>
								   </div>
								   <div class="form-group">
								      <label class="col-md-3 control-label">部门：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="dept" value="" readonly="readonly">
								      </div>
								      <label for="" class="col-md-2 control-label">销售：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="sale" value="" readonly="readonly">
								      </div>
								   </div>
								   <div class="form-group">
								      <label class="col-md-3 control-label">业务类型：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="sbusinesstype" value="" readonly="readonly">
								      </div>
								      <label for="" class="col-md-2 control-label">区域：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="sarea" value="" readonly="readonly">
								      </div>
								   </div>
								   <div class="form-group">
								      <label class="col-md-3 control-label">学费：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="studyfee" value="">
								      </div>
								      <label for="" class="col-md-2 control-label">住宿费：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="spacefee" value="">
								      </div>
								   </div>
								   <div class="form-group">
								      <label class="col-md-3 control-label">返款：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="backfee">
								      </div>
								      <label for="" class="col-md-2 control-label">定金：</label>
								      <div class="col-md-3">
								      	<input class="input-sm form-control" name="depositfee" >
								      </div>
								   </div>
								   
								   <div class="form-group">
								      <label class="col-md-3 control-label">说明：</label>
								      <div class="col-xs-8">
								      	<textarea class="input-sm form-control" name="sremark" style="resize: none;"></textarea>
								      </div>
								   </div>
									
									<div class="modal-footer">
										<button type="submit" class="btn btn-primary">提交</button>
										<button type="button" class="btn btn-default"
											data-dismiss="modal">关闭</button>
									</div>
								</form>
							</div>
						</div>
					</div>
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
</body>
</html>
