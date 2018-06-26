webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Map__);




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/',
    name: 'Map',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Map___default.a
  }]
}));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(9)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(15),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_AMap__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_AMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_AMap__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            lngX: '',
            latY: '',
            city: '',
            aqi: '',
            marker: null,
            mapObj: null
        };
    },
    methods: {
        getAqi() {
            var that = this;
            var token = "f7ea107c74bc8acaa9e851bd30f1ceb5f13c76fb";
            var clickEventListener = __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.event.addListener(this.mapObj, 'click', function (e) {
                //get x, y coordinate
                var x = e.lnglat.getLng();
                var y = e.lnglat.getLat();
                that.lngX = x;
                that.latY = y;
                __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.service('AMap.Geocoder', function () {
                    var geocoder = new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Geocoder({
                        city: ""
                    });
                    var lnglatXY = [x, y];
                    geocoder.getAddress(lnglatXY, function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            //get city
                            var cityName = result.regeocode.addressComponent.province;
                            that.city = cityName;
                            ajax('https://api.waqi.info/feed/shanghai/', 'get', {
                                city: cityName,
                                token: token
                            }, true).then(function (response) {
                                //get aqi
                                that.aqi = response.data.iaqi.pm25.v;
                            }, function (error) {
                                alert("Failed!", error);
                            });
                        } else {
                            alert("Failed, cannot get city");
                        }
                    });
                });
            });

            function ajax(url, type, param, async, header) {
                return new Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.onload = function () {
                        if (req.status == 200 || req.status == 304) {
                            resolve(JSON.parse(req.response));
                        } else {
                            reject(Error(req.statusText));
                        }
                    };
                    req.onerror = function () {
                        reject(Error("Network Error"));
                    };
                    type == null || type.toUpperCase() == 'GET' ? type = 'get' : type = 'post';
                    param = formatParams(param);
                    param == null || param == '' ? url : url = url + '?' + param;
                    async == null || async == true ? async = true : async = false;
                    req.open(type, url, async);
                    req.send();
                });

                function formatParams(data) {
                    var _fpArr = [];
                    for (var _fpName in data) {
                        _fpArr.push(_fpName + "=" + data[_fpName]);
                    }
                    return _fpArr.join("&");
                };
            }
        },
        addMarker() {
            if (!this.marker) {
                this.marker = new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Marker({
                    icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    position: [120.075642, 30.269521],
                    title: "我是西溪湿地"
                });
                // let this.mapObj.getAllOverlays('marker');
                this.marker.setMap(this.mapObj);
                this.marker.setLabel({ //label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Pixel(20, 20), //修改label相对于maker的位置
                    content: "我是marker的label标签显示西溪湿地"
                });
            }

            //自适应
            // this.mapObj.setFitView(marker);
        },
        delMarker() {
            if (this.marker) {
                this.mapObj.remove(this.marker);
                this.marker = null;
            }
        },
        ytToYx() {
            var path = [new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.LngLat("120.050579", "30.247132"), new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.LngLat("120.107056", "30.299169")];

            // 创建折线实例
            var polyline = new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Polyline({
                path: path,
                borderWeight: 2, // 线条宽度，默认为 1
                strokeColor: 'red', // 线条颜色
                lineJoin: 'round' // 折线拐点连接处样式
            });

            // 将折线添加至地图实例
            this.mapObj.add(polyline);
        },
        xhwl() {
            var polygonOptions = {
                map: this.mapObj,
                strokeColor: '#97EC71',
                strokeWeight: 2,
                fillColor: '#D1B3E3',
                fillOpacity: 0.7
            };

            var pointers = {
                outer: [[120.048004, 30.277527], [120.059334, 30.279306], [120.086971, 30.280195], [120.089203, 30.274117], [120.091606, 30.263443], [120.077015, 30.260477], [120.044914, 30.246391]]
            };
            var pathArray = [pointers.outer];
            var polygon = new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Polygon(polygonOptions);
            polygon.setPath(pathArray);
            console.log(polygon.getArea());
        },
        hy2kl() {
            var circle = new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Circle({
                center: new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.LngLat(120.097314, 30.268845), // 圆心位置
                radius: 500, // 圆半径
                fillColor: 'red', // 圆形填充颜色
                strokeColor: '#000', // 描边颜色
                strokeWeight: 2, // 描边宽度,
                strokeOpacity: 0.3, //轮廓透明度
                strokeStyle: 'dashed',
                fillOpacity: 0.3 //填充透明度
            });

            this.mapObj.add(circle);
        }
    },
    created() {
        this.mapObj = new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Map("mapContainer", {
            resizeEnable: true,
            view: new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.View2D({
                resizeEnable: true,
                zoom: 13
            }),
            keyboardEnable: false
        });
        this.mapObj.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function () {
            this.mapObj.addControl(new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.ToolBar());
            this.mapObj.addControl(new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.Scale());
            this.mapObj.addControl(new __WEBPACK_IMPORTED_MODULE_0_AMap___default.a.OverView({ isOpen: true }));
        });
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(3);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

let createMap = () => {
    const promise = new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://webapi.amap.com/maps?v=1.4.2&key=5e845b660cdf9f6120d7fa0231d8ecc8'; // 高德地图
        document.body.appendChild(script);
        if (script.nodeName === 'SCRIPT') {
            resolve();
        } else {
            reject(new Error('Could not script image at ' + script.src));
        }
    });
    return promise;
};
createMap().then(function () {
    console.log('读取高德地图成功');
    // 加載當前的ip定位
}).catch(function (error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
});

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#app',
    router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
    template: '<App/>',
    components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(8)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(14),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    attrs: {
      "id": "mapContainer"
    },
    on: {
      "click": function($event) {
        _vm.getAqi()
      }
    }
  }), _vm._v(" "), _c('div', {
    attrs: {
      "id": "pos"
    }
  }, [_c('div', [_c('label', [_vm._v("城市：")]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.city),
      expression: "city"
    }],
    attrs: {
      "type": "text",
      "id": "city"
    },
    domProps: {
      "value": (_vm.city)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.city = $event.target.value
      }
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("污染指数：")]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.aqi),
      expression: "aqi"
    }],
    attrs: {
      "type": "text",
      "id": "aqicn"
    },
    domProps: {
      "value": (_vm.aqi)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.aqi = $event.target.value
      }
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("经度:")]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.lngX),
      expression: "lngX"
    }],
    attrs: {
      "type": "text",
      "id": "lngX",
      "name": "lngX"
    },
    domProps: {
      "value": (_vm.lngX)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.lngX = $event.target.value
      }
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("纬度:")]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.latY),
      expression: "latY"
    }],
    attrs: {
      "type": "text",
      "id": "latY",
      "name": "latY"
    },
    domProps: {
      "value": (_vm.latY)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.latY = $event.target.value
      }
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("添加Mark:")]), _c('input', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "value": "添加点标记覆盖物",
      "id": "addMarker"
    },
    on: {
      "click": _vm.addMarker
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("添加Mark:")]), _c('input', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "value": "删除点标记覆盖物",
      "id": "deleteMarker"
    },
    on: {
      "click": _vm.delMarker
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("添加Mark:")]), _c('input', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "value": "银泰到印象城"
    },
    on: {
      "click": _vm.ytToYx
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("添加Mark:")]), _c('input', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "value": "西溪围栏"
    },
    on: {
      "click": _vm.xhwl
    }
  }), _c('br'), _vm._v(" "), _c('label', [_vm._v("添加Mark:")]), _c('input', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "value": "浩韵方圆2公里"
    },
    on: {
      "click": _vm.hy2kl
    }
  })])])])
},staticRenderFns: []}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

module.exports = AMap;

/***/ })
],[7]);
//# sourceMappingURL=app.433cab05a88acc240a7e.js.map