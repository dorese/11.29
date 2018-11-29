;
(function($, win) {
    var zoompic = {
        init: function(el, options) {
            this.el = el;
            this.options = options;
            this.createImage(options.picurl);
        },
        createImage: function(src) {
            var that = this;
            var img = new Image();
            img.onload = function() {
                that.setStyle(this.width, this.height);
                $(that.el).find('.smallbox img').attr('src', this.src);
            }
            img.src = src;
        },
        setStyle: function(w, h) {
            var ops = this.options;
            var parent = $(this.el);
            var smallbox = parent.find('.smallbox');
            var bigbox = parent.find('.bigbox');
            //滑块
            var activebtn = parent.find('.activebtn');
            //小盒子的宽高
            var smallboxW = w / ops.zoomindex,
                smallboxH = h / ops.zoomindex,
                activeW = smallboxW / ops.zoomindex,
                activeH = smallboxH / ops.zoomindex;
            var styleobj = {
                width: smallboxW,
                height: smallboxH,
                border: ops.border + 'px solid ' + ops.color
            };
            smallbox.css(styleobj);
            bigbox.css(styleobj).css('left', smallboxW + ops.border * 2);
            activebtn.css({
                width: activeW,
                height: activeH,
                boxSizing: 'border-box'
            });
            var offsetleft = smallbox.offset().left + activeH / 2,
                offsettop = smallbox.offset().top + activeH / 2;
            var maxx = smallboxW - activeH - ops.border * 2,
                maxy = smallboxH - activeH - ops.border * 2;
            smallbox.hover(function() {
                activebtn.show();
                bigbox.css({
                    'background-image': 'url(' + ops.picurl + ')',
                    'background-position': '0 0',
                    'background-repeat': 'no-repeat',
                    'background-size': w + 'px ' + h + 'px'
                }).show();
            }, function() {
                activebtn.hide();
                bigbox.hide();
            }).on('mousemove', function(e) {
                var x = e.pageX - offsetleft,
                    y = e.pageY - offsettop;
                if (y > maxy) {
                    y = maxy;
                } else if (y < 0) {
                    y = 0
                };
                if (x > maxx) {
                    x = maxx;
                } else if (x < 0) {
                    x = 0
                };
                activebtn.css({
                    left: x,
                    top: y
                });

                bigbox.css({
                    'background-position': -x * ops.zoomindex - activeH / 2 + 'px ' + (-y * ops.zoomindex - activeH / 2) + 'px'
                })
            });
        }
    }
    $.fn.zoom = function(ops) {
        var defaluts = {
            border: 1,
            color: '#999',
            activewidth: 100,
            activehight: 100
        };
        var options = $.extend({}, defaluts, ops);
        return this.each(function() {
            zoompic.init(this, options);
        });
    }
})(jQuery, window);