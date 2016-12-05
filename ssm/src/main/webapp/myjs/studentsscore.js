$(document).ready(function(){
	$("table a").click(function (e){
		$("#updatescore form div:first input").val($(e.target).parent().parent().find('td').eq(3).html());
		$("#updatescore form div:eq(1) input").val($(e.target).parent().parent().find('td').eq(4).html());
		$("#updatescore form div:eq(2) input").val($(e.target).parent().parent().find('td').eq(2).html());
		$("#updatescore form p input").val($(e.target).parent().parent().find('td').eq(0).html());
	});
	SpanGrid(stuscoretable,0);
	SpanGrid(stuscoretable,1);
	SpanGrid(stuscoretable,2);
});


//将列内容相同的进行行合并
function SpanGrid(tabObj,colIndex)
{
 if(tabObj != null)
 {
  var i,j;
  var intSpan;
  var strTemp;
  for(i = 0; i < tabObj.rows.length; i++)
  {
   intSpan = 1;
   strTemp = tabObj.rows[i].cells[colIndex].innerText;
   for(j = i + 1; j < tabObj.rows.length; j++)
   {
    if(strTemp == tabObj.rows[j].cells[colIndex].innerText)
    {
     intSpan++;
     tabObj.rows[i].cells[colIndex].rowSpan  = intSpan;
     tabObj.rows[j].cells[colIndex].style.display = "none";
    }
    else
    {
     break;
    }
   }
   i = j - 1;
  }
 }
}
 