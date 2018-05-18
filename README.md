## 更多插件
[SpiceUI网站](http://www.spiceui.com/)

## 移动端下拉效果  
实现移动端下拉效果。该插件基于`mobiscroll`拓展，所以`mobiscroll`支持的方法和参数，该插件都支持。  
引用插件前需引入jQuery。

#### 如何使用移动端下拉效果  
使用移动端下拉效果的页面结构随便定义，一个`div`或者`input`就可以。

    <div class="e-spice-mobiscroll"></div>

将插件引入页面，执行以下代码：

    $.spice.MobIScroll('.e-spice-mobiscroll');

之后页面就可以看到相应的下拉效果了，只是还没有数据。

#### 移动端下拉效果参数  
定义下拉效果时，可以通过传递参数来实现多种不同的下拉效果，如

    $.spice.MobIScroll('.e-spice-mobiscroll', {
        //write your options here
    });

Option的参数说明如下：  

* customWheels：数据列表，默认`[{}]`
* joinResult：设置数据拼接的符号，仅在`preset`值为`'list'`、`'linkage'`时生效，默认`'/'`
* formatResult：自定义返回数据格式，d为对应数据的key，w为所有数据，默认`function (d, w) { return d.join(' '); }`
* showLabel：是否显示label，默认`false`
* preset：设置方法名，支持`'list'`、`'linkage'`、`'date'`、`'time'`、`'datetime'`，默认`'list'`
* setText：设置文字，默认`'确定'`
* cancelText：设置文字，默认`'取消'`
* theme：设置弹框样式`class`，默认`'spice-mobiscroll light'`
* mode：操作方式，支持`'scroller'`、`'clickpick'`、`'mixed'`，默认`'scroller'`
* display：显示方式，支持`'modal'`、`'inline'`、`'bubble'`、`'top'`、`'bottom'`，默认`'bottom'`
* ariaDesc：设置默认提示文字，默认`''`
* onSelect：点击确定之后的回调函数，默认`''`
* column：`preset`为`'linkage'`时生效，设置滚动列数，默认`3`
* wheelsStart：`preset`为`'linkage'`时生效，设置数据起始位置，默认`'1'`
* startYear：`preset`为`'date'`、`'time'`、`'datetime'`时生效，设置开始日期，默认`当前日期-100`
* endYear：`preset`为`'date'`、`'time'`、`'datetime'`时生效，设置结束日期，默认`当前日期+1`
* showNow：`preset`为`'date'`、`'time'`、`'datetime'`时生效，是否显示现在按钮，默认`false`
* i18n：`preset`为`'date'`、`'time'`、`'datetime'`时生效，设置语言，可设置'zh'、'en'，默认`zh`  

i18n参数：  

* dateFormat：设置输出格式，格式为字符串，en: mm/dd/yy DD，zh: yy/mm/dd DD
* dateOrder：设置滚轮展示格式，格式为字符串，en: mmddy，zh: yymmdd
* dayNames：设置‘星期’的文字，格式为数组，周一至周日
* dayNamesShort：设置星期缩写，格式为数组，周一至周日
* dayText：设置‘天’的文字，格式为字符串
* hourText：设置‘小时’的文字，格式为字符串
* minuteText：设置‘分钟’的文字，格式为字符串
* monthNames：设置月份的文字，格式为数组，一月至十二月
* monthNamesShort：设置月份文字的缩写，格式为数组，一月至十二月
* monthText：设置‘月份’的文字，格式为字符串
* secText：设置‘秒’的文字，格式为字符串
* timeFormat：设置时间输出格式
* timeWheels：设置滚轮展示格式
* yearText：设置‘年’的文字，格式为字符串
* nowText：设置‘现在’的文字，格式为字符串

#### 移动端下拉下拉数据格式   
数据格式为一个数组，且数组里面只能有一个值（spice2规定），值的格式为 object。

    # 普通下拉选择数据
    [
        {
            '第1个滑动数据': {
                'key': 'value'
            }
            , '第2个滑动数据': {
                'key': 'value'
            }
        }
    ]
    
    # 联动下拉数据
    {
        '第1个滑动数据': {
            'key': 'value'
        }
        , '第2个滑动数据': {
            'key': 'value'
        }
    }

#### 移动端下拉效果方法  
有特殊需求时，可根据常用方法自定义下拉效果

    var mobiscroll = $.spice.MobIScroll('.e-spice-mobiscroll');;
    mobiscroll.fn();

获取方法有两种方式，第一种是根据变量`mobiscroll.fn()`，第二种是通过选择器`$('.e-spice-mobiscroll').data('spice.mobIScroll').fn()`

常用方法如下：

* enable()：启用选择效果
* disable()：禁用选择效果
* show()：显示下拉
* hide()：隐藏下拉
* destroy()：删除下拉效果

#### 默认选中行   
标签上添加`data-spice-default-value`属性，值为需要选中数据的`key`值，多个以`/`分割。

#### 移动端下拉效果使用示例  

##### 性别选择下拉效果，自定义输出数据  

    var mobiscroll = $.spice.MobIScroll('.e-spice-mobiscroll', {
            customWheels: [
                {
                    0: {
                        0: '男'
                        , 1: '女'
                    }
                }
            ]
            , formatResult: function(d, w){
                return w[0][0][d];
            }
        });

##### 省市选择下拉效果，自定义输出数据、数据开始位置、联动列数和省市方法插件

    var mobiscroll = $.spice.MobIScroll('.e-spice-mobiscroll', {
            customWheels: {
                0: {
                    1: '北京'
                    , 2: '上海'
                }
                , 1: {
                    11: '东城区'
                    , 12: '西城区'
                }
                , 2: {
                    21: '黄浦区'
                    , 22: '徐汇区'
                }
            }
            , wheelsStart: '0'
            , column: 2
            , preset: 'linkage'
        });
