require('./mobIScroll.scss')

var ms = $.spiceMobIScroll
    , defaults = {
        column: 3
        , wheelsStart: '1'
    }
    , preset = function(inst) {
        var orig = $.extend({}, inst.settings)
            , s = $.extend(inst.settings, defaults, orig)
            , $elem = $(this)
            , timer = {}
            , customWheels = s.customWheels
            , changeSz = []
            , getCustomWheels = function(siteList){
                var prevWheels
                    , wheels = [{}]
                    , siteList = siteList || [s.wheelsStart]
                    , key

                changeSz = []
                for(var i = 0; i< s.column; i++){
                    var o = {}
                    changeSz.push(i)
                    key = siteList[i] ? siteList[i] : Object.keys(prevWheels)[0]
                    wheels[0][i] = prevWheels = customWheels[key] || {}
                }
                return wheels
            }
        return {
            wheels: getCustomWheels()
            , onBeforeShow: function(dw){
                $('input').blur();
                var value = $elem.attr('data-spice-default-value')
                    , siteList = [s.wheelsStart]

                if( value ){
                    var temp = value.split('/');
                    for (var n = 0; n < s.column - 1; n++) {
                        siteList.push( temp[n] );
                    }
                    s.wheels = getCustomWheels( siteList );
                    $elem.spiceMobIScroll('setValue', temp);
                }
            }
            , onSelect: function(v, inst){

            }
            , onChange: function(v, inst){

            }
            , validate: function(dw, i, time){
                var temp = inst.temp
                    , siteList = [s.wheelsStart];

                if( i != undefined ){
                    
                    if( i < s.column - 1 ){
                        for (var n = 0; n <= i; n++) {
                            siteList.push( temp[n] );
                        }

                        inst.settings.wheels = getCustomWheels( siteList );
                        inst.changeWheel(changeSz);
                        clearTimeout(timer[i]);
                        timer[i] = setTimeout(function () {
                            // inst.changeWheel(changeSz);
                        }, time * 1000);

                    }
                    
                }
                
            }
            , onClose: function(){
                setTimeout(function(){
                    $elem.blur()
                }, 0)
            }
            , onShow: function(dw){
                $('.dwwl', dw).on('mousedown touchstart', function () {
                    clearTimeout(timer[$('.dwwl', dw).index(this)])
                })
            }
        }
    }

$.each(['linkage'], function(i, v) {
    ms.presets[v] = preset
    ms.presetShort(v)
})