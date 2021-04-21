var myChart_1 = echarts.init(document.getElementById('body4_left'));
         myChart_1.setOption({
                title: {
                    text: '饼状图',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: "数据",
                        type: 'pie',
                        data:  []
                      
                        
                    }
                ]
        });

         myChart_1.showLoading();    //数据加载完之前先显示一段简单的loading动画
         
         var names_1=[];    //数组（实际用来盛放X轴坐标值）
         var nums_1=[];    //数组（实际用来盛放Y坐标值）
         
         $.ajax({
         type : "get",
         async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
         url : "https://edu.telking.com/api/?type=week",    
         data : {},
         dataType : "text",       
         success : function(result) {
             //请求成功时执行该函数内容，result即为服务器返回的json对象
             if (result) {
                result = JSON.parse(result)  // 将返回的json数据转换为字典（在js里叫object对象）
                 var date_result = result.data["xAxis"]
                 var series_result = result.data["series"]

                    for(var i=0;i<date_result.length;i++){      
                       names_1.push(date_result[i]);   
                     }
                    for(var i=0;i<series_result.length;i++){       
                        nums_1.push(series_result[i]);    
                      }
                    myChart_1.hideLoading();    //隐藏加载动画
                    myChart_1.setOption({        //加载数据图表                     
                        series: [{
                            // 根据名字对应到相应的系列\
                            name : names_1,
                            data: nums_1
                        }]
                    });
                    
             }
         
        },       error : function(errorMsg) {
            //请求失败时执行该函数
        alert("图表请求数据失败!");
        myChart_1.hideLoading();
        }
   })