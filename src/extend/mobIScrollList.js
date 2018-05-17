require('./mobIScroll.scss')

var ms = $.spiceMobIScroll
    , defaults = {
        
    }
    , preset = function(inst) {
        var orig = $.extend({}, inst.settings)
            , s = $.extend(inst.settings, defaults, orig)
            , $elem = $(this)
            , timer = {}
        return {
            wheels: s.customWheels
            , onBeforeShow: function(dw){
                // $('input').blur();
                $elem.spiceMobIScroll('setValue', [$elem.attr('data-spice-default-value')]);
            }
            , onSelect: function(v, inst){

            }
            , onChange: function(v, inst){

            }
            , validate: function(dw, i, time){
                timer[i] = setTimeout(function () {
                    
                }, time * 1000)
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

$.each(['list'], function(i, v) {
    ms.presets[v] = preset
    ms.presetShort(v)
})