//交易
function formatBuySell(data,fn){
    fn = fn || function(){};
    fn(data);
   
    var tmpVolume = [];
    data.buy.forEach(element => {
        tmpVolume.push(parseInt(element[0]));
    });
    data.sell.forEach(element => {
        tmpVolume.push(parseInt(element[0]));
    });
    var max = Math.max(...tmpVolume);

    for (let index = 0; index < data.buy.length; index++) {
        let element = data.buy[index];
        $('.wd_buy_'+(index+1)+' .price').text(parseFloat(element[1])>0? element[1] : '-').css('color',getStockColor(parseFloat(element[1]),parseFloat(data.close)));
        $('.wd_buy_'+(index+1)+' .volume').text(parseFloat(element[0])>0? element[0] : '-');
        $('.wd_buy_'+(index+1)+' .lb .process').css('width',parseFloat(element[0])>0? parseInt(element[0]/max*100)+'%' : '0');
    }
    for (let index = 0; index < data.sell.length; index++) {
        let element = data.sell[index];
        $('.wd_sell_'+(index+1)+' .price').text(parseFloat(element[1])>0? element[1] : '-').css('color',getStockColor(parseFloat(element[1]),parseFloat(data.close)));
        $('.wd_sell_'+(index+1)+' .volume').text(parseFloat(element[0])>0? element[0] : '-');
        $('.wd_sell_'+(index+1)+' .lb .process').css('width',parseFloat(element[0])>0? parseInt(element[0]/max*100)+'%' : '0');
    }

    $('.now_stock_info .price').text((parseFloat(data.price)>0? data.price : '-')).css('color',getStockColor(data.price,data.close));
    $('.now_stock_info .hig_max').text((parseFloat(data.close)*1.1).toFixed(2)).css('color',getStockColor(1));
    $('.now_stock_info .low_max').text((parseFloat(data.close)*0.9).toFixed(2)).css('color',getStockColor(-1));
    $('.now_stock_info .zdf').text(data.changeP+'%').css('color',getStockColor(data.price,data.close));
    $('#stock_hq_time').text((data.time+'').slice(-8));
}
function initBuySell(){
    for (let index = 0; index < 5; index++) {
       
        $('.wd_buy_'+(index+1)+' .price').text('-').css('color','#333333');
        $('.wd_buy_'+(index+1)+' .volume').text('-');
        $('.wd_buy_'+(index+1)+' .lb .process').css('width',0);
   
        
        $('.wd_sell_'+(index+1)+' .price').text('-').css('color','#333333');
        $('.wd_sell_'+(index+1)+' .volume').text('-');
        $('.wd_sell_'+(index+1)+' .lb .process').css('width','0');
    }

    $('.now_stock_info .price').text('-').css('color','#333333');
    $('.now_stock_info .hig_max').text('-').css('color','#333333');
    $('.now_stock_info .low_max').text('-').css('color','#333333');
    $('.now_stock_info .zdf').text('-').css('color','#333333');
    $('#stock_hq_time').text('');

    $('#now_price').val('');
    $('#stock_code').val('');
    $('.now_stock_name').text('');
    $('#stock_code').attr('fullcode','');
    $('#canSell').val('');
    
    //清除临时股票数据
    if(tmp_task.length>0){
        delete stock_data[tmp_task[0]];
        tmp_task=[];
    }
}
//点击五档 设置价格
$(function(){
    $('body').on('click','.setPrice',function(){
        if(isNaN(parseFloat($(this).text()))){
                return false;
        }
        var price = parseFloat($(this).text()).toFixed(2);
        $('#now_price').val(price);
        if(typeof excCanNum==='function'){
            excCanNum();
        }
    });
})

//点击量 
$(function(){
    $('body').on('input','#volume',function(){
        $(this).val($(this).val().replace(/[^\d]/g,''));
        console.log($('input:radio[name="cw"]').length);
        $('input:radio[name="cw"]').each(function(index,element){
            console.log($(this).attr("checked"));
            $(this).prop("checked",false);
        });
    });
})


//获取持仓列表
function getPostionOrder(){
    getOrderList({
      type:1,
      //sectionType:loans.nowType
    },function(res){  

        formatTable(table,res,[
          {field: 'code', title: '证券代码', width: 80},
          {field: 'name', title: '证券名称', width: 80},
          {field: 'volume', title: '股票数量',align:'right', width: 80},
          {field: 'usableVolume', title: '可卖数量',align:'right', width:80,templet: function(d){
            return '<span class="stock_'+(d.fullCode+'').toLocaleLowerCase()+' canSell" >'+(d.usableVolume)+'</span>'
          }},
          {field: 'price', title: '成本价',align:'right', width: 100},
          { title: '当前价', width: 100,align:'right',templet: function(d){
            return '<span class="stock_'+(d.fullCode+'').toLocaleLowerCase()+' gpxj" >----</span>'
          }},
          {title: '浮动盈亏', width: 100,align:'right',templet: function(d){
            return '<span class="stock_'+(d.fullCode+'').toLocaleLowerCase()+' fdyk" data-volume="'+d.volume+'" data-price="'+d.price+'" >----</span>'
          }},
          {title: '盈亏比例(%)', width: 100,align:'right',templet: function(d){
            return '<span class="stock_'+(d.fullCode+'').toLocaleLowerCase()+' ykbl"  data-volume="'+d.volume+'" data-price="'+d.price+'" >----</span>'
          }},
          {title: '市值', width: 100,align:'right',templet: function(d){
            return '<span class="stock_'+(d.fullCode+'').toLocaleLowerCase()+' ccsz"  data-volume="'+d.volume+'" data-price="'+d.price+'" >----</span>'
          }}
        ],{
          done: function(res, curr, count){
             
              if(res.data.length>0){
                for (let index = 0; index < res.data.length; index++) {
                  stock_task.push((res.data[index].fullCode+'').toLocaleLowerCase());
                }
                startTask(()=>{

                  formatStockData(formatBuySell);

                });
              }
          }
        });

    });
 }

 //当日成交
 function getDayCOrder(){
    let loans = getCache('loans');
    getList('/api/trade/coin_trade_detail_list',{
        pageNumber:1,
        pageSize:1000,
        day:1,
        tradeStatus:1,
        sectionType:loans.nowType
      },function(res){  
          console.log(res);
          formatTable(table,res,[
            {field: 'createDate', title: '成交时间', width: 80,templet:function(d){
              return remote.app.untils.formatTime("hh:mm:ss",d.createDate);
            }},
            {field: 'code', title: '证券代码', width: 80},
            {field: 'name', title: '证券名称', width: 80},
            {field: 'tradeType', title: '操作', width: 80,templet: function(d){
              return d.tradeType == 2? '买入':'卖出';
            }},
            {field: 'volume', title: '成交数量',align:'right', width: 80},
            {field: 'price', title: '成交均价',align:'right', width: 80,templet: function(d){
              return parseFloat(d.price).toFixed(2);
            }},
            {field: 'turnover', title: '成交金额',align:'right', width: 100,templet: function(d){
              return parseFloat(d.turnover).toFixed(2);
            }},
            {field: 'tradeNo', title: '成交编号',align:'right', width: 120},
           
           
          ],{
            done: function(res, curr, count){
               
              if(res.data.length>0){
                  for (let index = 0; index < res.data.length; index++) {
                    var color = '#0000FA';
                    if(res.data[index].tradeType==2){
                      color = '#FC0000';
                    }
                    $('tr[data-index="'+index+'"]').css('color',color);
                  }
                }

            }
          });

      });
   }


//当日委托（可撤单）
 function getDayEOrder(){
    let loans = getCache('loans');
      getEntrustList({
        type:2,
        sectionType:loans.nowType
      },function(res){  
          console.log('getEntrustList',res);
          formatTable(table,res,[
            {field: 'createDate', title: '委托时间', width: 80,templet:function(d){
              return remote.app.untils.formatTime("hh:mm:ss",d.createDate);
            }},
            {field: 'code', title: '证券代码', width: 80},
            {field: 'name', title: '证券名称', width: 80},
            {field: 'tradeType', title: '操作', width: 80,templet: function(d){
              return d.tradeType == 2? '买入':'卖出';
            }},
            { title: '备注', width: 100,templet: function(d){
              return d.usableVolume == 0? '未成交':'部分成交';
            }},
            {field: 'volume', title: '委托数量',align:'right', width: 80},
            {field: 'usableVolume', title: '成交数量',align:'right', width: 80},
            {field: 'price', title: '委托价格',align:'right', width: 80},
            {field: 'price', title: '成交均价',align:'right', width: 80,templet: function(d){
              return d.usableVolume == 0? '0.00':d.price;
            }},
          
            {title: '撤单', width: 100,align:'right',templet: function(d){
              //return '<a class="c_blue" lay-event="cancle" href="javascript:void(0);" onclick="cancleOrder('+d.id+')">撤单</a>'
              return '<a class="c_blue" lay-event="cancle" href="javascript:void(0);">撤单</a>'
            }}
          ],{
            done: function(res, curr, count){
              if(res.data.length>0){
                  for (let index = 0; index < res.data.length; index++) {
                    var color = '#0000FA';
                    if(res.data[index].tradeType==2){
                      color = '#FC0000';
                    }
                    $('tr[data-index="'+index+'"]').css('color',color);
                  }
                }
            }
          });

      });
   }

    //操作撤单
    function cancleOrder(id){

    remote.app.sys.post('/api/trade/coin_cancel_etrade',{entrustId:id},function(res){
        if(res.status ==200 ){
            getOrder();
            //cb && cb(JSON.parse(JSON.stringify(res.data)));
        }
        remote.app.untils.alert(res.msg,'委托提醒','warning');
    })  
    
}
     
      //监听工具条 
table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
  var data = obj.data; //获得当前行数据
  var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
  var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
 
  if(layEvent === 'cancle'){ //查看
    //do somehing
    var res = remote.app.untils.dialogsync('操作类别：撤单\n买卖方向：'+(data.tradeType == 2? '买入':'卖出')+'\n股票代码:'+data.code+' '+data.name,'提示','question',{buttons:['确认','取消'],defaultId :0,cancelId :1,noLink:true});
        if(res==0){
          cancleOrder(data.id);
        }
        return;
  } 
});
      
$(function(){
    $('body').on('click','.table-header .page_title',function(){
        if($(this).hasClass('on')){
            return ;
        }

        var fn = $(this).attr('data-fn');
        $(this).addClass('on').siblings('.page_title').removeClass('on');
        window['getOrder'] = window[fn];
        window['getOrder'].call();

    });
})