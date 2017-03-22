/*
添加日期时间
*/
var cir_rgba = ['rgba(190,66,66,0.8)', 'rgba(74,172,84,0.8)', 'rgba(51,162,185,0.8)'];
var cir_colors = ['#CB6767', '#6EBC76', '#5BB4C7']
var block_colors = ['#7CC4E3', '#76BE8D', '#C5D08B', '#8B99CB', '#C1DBF2', '#D0D767', '#EE9499']
var colors = ['#9fe8e6', '#62c462', '#f99e1e', '#d44943']

// var initGlobal
var initGlobal

var itemStyle = {
    normal: {
        color: "rgba(96,182,48,0.6)"
    }
}


var windfarmId, wtid
windfarmId = localStorage.getItem('windfarmId')
wtid = localStorage.getItem('wtid')

// if (!windfarmId) {
//     // 设置风场项目ID
//     localStorage.setItem('windfarmId', '14062620160815')
//         // localStorage.setItem('windfarmId', '42108120160825')
//     windfarmId = localStorage.getItem('windfarmId')

// }
// if (!wtid) {
//     //设置风场ID
//     // localStorage.setItem('wtid', '421081022')
//     localStorage.setItem('wtid', '421081006')
//     wtid = localStorage.getItem('wtid')
// }



// alert(initGlobal)

var linkArray = ['../index/index.html', '../project/project.html', '../windTower/tongji.html', '../windPower/NTF_calculate.html', '../PBA/PBA.html', '../modelVerify/modelVerify.html', '../report/report.html']



$(document).ready(function() {
    addLink()
})


function addLink() {
    var initGlobal = localStorage.getItem('initGlobal')
    if (initGlobal == 1) {
        for (var i = 0; i < linkArray.length; i++) {
            $('#dock li').eq(i).find('a').attr('href', linkArray[i])
                // console.log($('#dock li').eq(i).find('a').attr('href'))
        }
    } else {
        $('#dock li a').unbind('click').on('click', function() {
            if ($(this).text() != '首页' && $(this).text() != '项目') {
                alert('请按照正常流程 "项目 > 新建项目 > 提交按钮" 来进行')
                return
            }
        })

    }
}



/*bootstrap time 插件*/
function bootstrap_time(obj, formatter) {
    if (formatter) {
        $(obj).datetimepicker({
            format: formatter,
            autoclose: true,
            // minuteStep: 60     //时间间隔显示
        });
        return
    }
    $(obj).datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        // minuteStep: 60     //时间间隔显示
    }).on('changeDate', function(evt) {
        var stamp = new Date(evt.date.valueOf())
        var formatTime = stamp.Format('yyyy-MM-dd HH:mm')
            /*$('#hidden_start').val(formatTime)*/
        $(obj).val(formatTime)
    })
}

/*
判断节点的值是否为 value，真的时候，就添加classname
*/
function height_table(obj, value, classname) {
    $(obj).each(function() {
        // console.log(this.innerText)
        if (this.innerText == value) {
            $(this).addClass(classname)
        }
    })
}



/*封装ajax的设置*/
function ajax(fn) {
    /*
        //调用示范
        ajax({
            url: '//54.222.191.200:8000/poc?',
            data: { wfid: 10000, stime: '2015-05-01', etime: '2016-08-10' },
            dataType: 'jsonp',//此返回数据类型为跨域，其他均为不跨域。
            success: function(d){ console.log(d); }
        });
    */
    var option = arguments[0] || {};
    var fn = arguments[1] || null;
    if ($.isEmptyObject(option)) {
        console.log('ajax请求参数无效!');
        return;
    }
    option['dataType'] = option['dataType'] || 'text';
    $.ajax({
            url: option['url'],
            async: option['async'] || true,
            type: option['type'] || 'get',
            timeout: option['timeout'] ? parseInt(option['timeout']) : 1000 * 30,
            data: option['data'] || '',
            dataType: option['dataType'],
            beforeSend: option['beforeSend'] || null
        })
        .done(option['success'] ? option['success'] : function(data, textStatus) {
            console.log('ajax请求成功返回!');
            if (fn) {
                fn(data);
            }
        })
        .fail(option['error'] ? option['error'] : function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('ajax请求执行出错!');
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        })
        .always(option['complete'] ? option['complete'] : function(XMLHttpRequest, textStatus) {

        });
}

/*
 深复制
 */
var cloneObj = function(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj), // 系列化对象
            newobj = JSON.parse(str); // 还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ?
                cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};


/*全局变量设置*/
var setting = function() {
    var config = {}
        // config.routeRoot = 'http://54.222.213.202:8080'
        // config.routeRoot = 'http://54.222.212.120:8080'
    config.routeRoot = 'http://' + window.location.host + '/test';

    function route(url) {
        if (url) {
            config.routeRoot = url
            return config
        }
    }


    // var config = {
    //     routeRoot:'192.168.1.1:8080',
    // }

    // TODO Other setting function

    // 重置了 外部(setting) 属性的所有值
    return {
        routeRoot: function(url) {
            return route(url)
        },
        config: config,

    }
}()

var urlRoot = setting.config.routeRoot
    // console.log(setting.config.routeRoot)
    // console.log(url_root)


/*
 * urlParamas is except of IP:PORT/ */
function ajax_request(allPath, fn, a,b,c) {
    var defer = $.Deferred();

    var urlParams = {}
    var path, params
    if (typeof(allPath) != 'object') {
        var splitPath = allPath.split('?')
        path = splitPath[0]
        params = splitPath[1].split('&')


        for (var i in params) {
            var keyVal = params[i].split('=')
            urlParams[keyVal[0]] = keyVal[1]
        }

    }
    if (typeof(allPath) == 'object') {
        if (allPath.hasOwnProperty('action')) {
            path = allPath.action
            delete allPath.action
        }
        urlParams = allPath
    }
    // console.log(allPath, urlParams)

    ajax({
        url: 'http://' + window.location.host + path,
        // dataType:'jsonp',
        type: 'get',
        data: urlParams,
        success: function(data) {
            var data
            if (typeof(data) == 'string') {
                data = JSON.parse(data)
            }
            if (fn) {
                // data = JSON.parse(data)
                // 异步方式
                fn(data,a,b,c)
            } else {
                // 同步方式
                // 如果没有回调函数，就直接用同步 defer 的promise 出去
                // data = JSON.parse(data)
                defer.resolve(data)
            }
            // console.log('data:',data);
        },
        error: function(err) {
            defer.reject(err)
        }
    })
    return defer
}


function post_request(allPath, fn) {
    var defer = $.Deferred();
    var urlParams = {}
    var path, params
    if (typeof(allPath) != 'object') {
        var splitPath = allPath.split('?')
        path = splitPath[0]
        params = splitPath[1].split('&')
        for (var i in params) {
            var keyVal = params[i].split('=')
            urlParams[keyVal[0]] = keyVal[1]
        }
    }

    if (typeof(allPath) == 'object') {
        if (allPath.hasOwnProperty('action')) {
            path = allPath.action
            delete allPath.action
        }
        urlParams = allPath
    }
    console.log(urlParams)
    console.log(path)
    ajax({
        url: 'http://' + window.location.host + path,
        // dataType:'jsonp',
        type: 'post',
        data: urlParams,
        // data: {
        //     "module": 'programlist',
        //     "data": '{"progname": "11","owner": "11","progaddr": "11","wttype": "11","powcap": "11","gradtime": "11","proleader": "11","createtime": "11","wfid": "11","progid": "13"}'
        // },
        success: function(data) {
            console.log(this.data)
            var data
            console.log('---------->')
            console.log(data, typeof(data))
            console.log('---------->')
            if (typeof(data) == 'string') {
                data = JSON.parse(data)
            }
            if (fn) {
                // data = JSON.parse(data)
                fn(data)
                console.log('post data:', data);
            } else {
                defer.resolve(data)
            }
            // console.log('data:',data);
        }
    })
    return defer
}



/*获取字典所有key值*/
// Object.keys(obj)

/*判断为空或者undefined后 return*/
function isEmpty(data) {
    return data == [] && data == undefined
}



Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    return fmt;
}

Date.prototype.add = function(part, value) {
    value *= 1;
    if (isNaN(value)) {
        value = 0;
    }
    switch (part) {
        case "y":
            this.setFullYear(this.getFullYear() + value);
            break;
        case "m":
            this.setMonth(this.getMonth() + value);
            break;
        case "d":
            this.setDate(this.getDate() + value);
            break;
        case "h":
            this.setHours(this.getHours() + value);
            break;
        case "n":
            this.setMinutes(this.getMinutes() + value);
            break;
        case "s":
            this.setSeconds(this.getSeconds() + value);
            break;
        default:
    }
}


function parse2F(data, n, percent) {
    var n = n || 2
    if (percent == undefined) {
        return (parseFloat(data)).toFixed(n)
    }
    return (parseFloat(data)).toFixed(n)

}

/*创建 thead tr.class ='success' 的一个表格*/
function creat_table(obj, data) {
    /*obj is table's ID*/
    // console.log(data)
    if (!data) return
    $(obj).html('')
        /*创建行*/
    for (var i = 0; i < data.length; i++) {

        if (i == 0) {
            $(obj).append('<thead></thead>')
            var tr = '<tr class="success"></tr>'
            $(obj).find('thead').append(tr)
        } else {
            // console.log($('#wspdInfo tbody'))
            if ($(obj).find('tbody').length <= 0) {
                $(obj).append('<tbody></tbody>')
            }
            var tr = '<tr></tr>'
            $(obj).find('tbody').append(tr)
        }
        /*创建列*/
        for (var j = 0; j < data[i].length; j++) {
            var td = '<td>' + data[i][j] + '</td>'
            if (i == 0) {
                $(obj).find('thead tr').append(td)
            } else {
                var len = $(obj).find('tbody>tr').length
                $(obj).find('tbody tr').eq(len - 1).append(td)
            }
        }
    }
}
// 新的数据生成的表
// function creat_table(obj,data){
//     console.log('table data:',data);
//     console.log(Object.keys(data))
//     var keys = Object.keys(data)
//     if (keys.length == 0){return}
//     var length = data[keys[0]].length
// // 添加 theader 和 tbody
//     $(obj).append('<thead></thead>')
//     var td = ''
//     keys.forEach(function(k){
//         td += ('<td>'+ k+'<td>')
//     })
//     var tr = '<tr class="success">'+td+'</tr>'
//     $(obj).find('thead').append(tr)
//     $(obj).append('<tbody></tbody>')
//     // 对数据进行遍历 放入 tbody 节点里
//     for(var i=0;i<length;i++){
//         var td = ''
//         keys.forEach(function(k){
//             td += ('<td>'+ data[k][i]+'<td>')
//         })
//         var tr = "<tr>"+td+"</tr>"
//         $(obj).find('tbody').append(tr)
//     }
// }

/*生成 [[],[xx,xx,xx]], 的数组*/
function null3Ddata(data) {
    var newData = []
    data.forEach(function(d) {
        var data2D = [
            [], d
        ]
        newData.push(data2D)
    })
    console.log(newData)
    return newData
}

/*给按钮添加背景灰色 class*/
function btnBackColor(model) {
    // $('.diff_height span:first').not().addClass('unselected')
    /*
     * modle is  mult or single
     * */
    model == undefined ? modle = 'mult' : model = 'single'

    $('.diff_height span').click(function() {
        var isHas = $(this).hasClass('unselected')
        if (model == 'single') {
            $(this).removeClass('unselected').siblings().addClass('unselected')
        } else {
            if (!isHas) {
                $(this).addClass('unselected')
            } else {
                $(this).removeClass('unselected')
            }
        }

    })
}
btnBackColor()


// alert(windID2Fxxx(234242))
//  dataArray = ['1312','234234','234234']
// dataArray.map(windIDFxxx)

function windID2Fxxx(windId, int) {
    var int = int || 3
    for (var i = 0; i < windId.length; i++) {
        windId[i] = 'F' + String(windId[i]).substr(-(int))
    }
    // console.log('windID2Fxxx:',windId);
    return windId
}


// 水波纹滑动条
function waterRipple(event) {
    var event = event || 'mouseover'
    var indexOn = $('.tabMenu ul li.on').index();
    var width = $('.tabMenu li').width();
    $(".breathe-btn").css({
        // left: indexOn * width + "px"
        left: indexOn * width + "px"
    });

    $(".tabMenu ul li").on('mouseover', function(e) {

        if ($(this).hasClass('breathe-btn')) {
            return;
        }
        // TODO 鼠标滑入时，变成有背景色的
        if ($('.breathe-btn').height() == 40) {
            $('.breathe-btn').css({
                'height': '40px',
                'top': '0',
                'transition': 'height 0.5s,top 0.5s,',
            })
        }


        var whatTab = $(this).index();

        // var howFar = 120 * whatTab;
        var howFar = width * whatTab;

        $(".breathe-btn").css({
            left: howFar + "px"
        });


        $(this).unbind('click').click(function(e) {
            $(".ripple").remove();
            $(this).addClass('on').siblings('li').removeClass('on');
            indexOn = $(this).index()

            // alert($(this)[0].tagName)
            var posX = $(this).offset().left,
                posY = $(this).offset().top,
                buttonWidth = $(this).width(),
                buttonHeight = $(this).height();

            $(this).prepend("<span class='ripple'></span>");

            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            var x = e.pageX - posX - buttonWidth / 2;
            var y = e.pageY - posY - buttonHeight / 2;
            $(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        })
    });
    // 鼠标移出 效果
    $('.tabMenu ul').mouseout(function(e) {
            $(".breathe-btn").css({
                left: indexOn * width + "px"
            });
        })
        // 点击效果
    $('.tabMenu ul li').click(function(e) {
        $(".breathe-btn").css({
            left: indexOn * width + "px"
        });
    })
}
if ($('.tabMenu')) {
    waterRipple()
}




function getAllWindIds(farms, fn) {

    ajax_request('/pba/dev/meta?wfid=' + farms, function(data) {
        console.log('all wfids data:', data);
        // var allWfid = windID2Fxxx(data)
        var allWfid = data
        if (fn) {
            fn(allWfid)
        }
    })

}