<template>
    <div class="container">
        <div id="mapContainer"></div>
        <div id="pos">
            <div>
                <label>城市：</label><input type="text" id="city" v-model="city"/><br>
                <label>天气：</label><input type="text" id="aqicn" v-model="aqi"/><br>
                <label>经度:</label><input type="text" id="lngX" name="lngX" v-model="lngX"/><br>
                <label>纬度:</label><input type="text" id="latY" name="latY" v-model="latY"/><br>
                <label>添加Mark:</label><input type="button" class="button" value="添加点标记覆盖物" id="addMarker"
                                             @click="addMarker"/><br>
                <label>添加Mark:</label><input type="button" class="button" value="删除点标记覆盖物" id="deleteMarker"
                                             @click="delMarker"/><br>
                <label>添加Mark:</label><input type="button" class="button" value="银泰到印象城"
                                             @click="ytToYx"/><br>
                <label>添加Mark:</label><input type="button" class="button" value="西溪围栏"
                                             @click="xhwl"/><br>
                <label>添加Mark:</label><input type="button" class="button" value="浩韵方圆2公里"
                                             @click="hy2kl"/>

            </div>
        </div>
    </div>
</template>
<script>
    import AMap from 'AMap';

    var mapObj;
    export default {
        data() {
            return {
                lngX: '',
                latY: '',
                city: '',
                aqi: '',
                marker: null,
                mapObj: null,
                geolocation: null,
                myMark: null,
                marks: []
            }
        },
        methods: {
            addMarker() {
                if (!this.marker) {
                    this.marker = new AMap.Marker({
                        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                        position: [120.075642, 30.269521],
                        title: "我是西溪湿地"
                    });
                    // let mapObj.getAllOverlays('marker');
                    this.marker.setMap(mapObj);
                    this.marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                        offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                        content: "我是marker的label标签显示西溪湿地"
                    });
                }

                //自适应
                // mapObj.setFitView(marker);
            },
            delMarker() {
                if (this.marker) {
                    mapObj.remove(this.marker);
                    this.marker = null;
                }
            },
            ytToYx() {
                var path = [
                    new AMap.LngLat("120.050579", "30.247132"),
                    new AMap.LngLat("120.107056", "30.299169"),
                ];

                // 创建折线实例
                var polyline = new AMap.Polyline({
                    path: path,
                    borderWeight: 2, // 线条宽度，默认为 1
                    strokeColor: 'red', // 线条颜色
                    lineJoin: 'round' // 折线拐点连接处样式
                });

// 将折线添加至地图实例
                mapObj.add(polyline);
            },
            xhwl() {
                var polygonOptions = {
                    map: mapObj,
                    strokeColor: '#97EC71',
                    strokeWeight: 2,
                    fillColor: '#D1B3E3',
                    fillOpacity: 0.7
                };

                var pointers = {
                    outer: [
                        [120.048004, 30.277527],
                        [120.059334, 30.279306],
                        [120.086971, 30.280195],
                        [120.089203, 30.274117],
                        [120.091606, 30.263443],
                        [120.077015, 30.260477],
                        [120.044914, 30.246391],
                    ]
                };
                var pathArray = [
                    pointers.outer
                ];
                var polygon = new AMap.Polygon(polygonOptions);
                polygon.setPath(pathArray);
            },
            hy2kl() {
                var circle = new AMap.Circle({
                    center: new AMap.LngLat(120.097314, 30.268845),  // 圆心位置
                    radius: 500, // 圆半径
                    fillColor: 'red',   // 圆形填充颜色
                    strokeColor: '#000', // 描边颜色
                    strokeWeight: 2, // 描边宽度,
                    strokeOpacity: 0.3,//轮廓透明度
                    strokeStyle: 'dashed',
                    fillOpacity: 0.3//填充透明度
                });

                mapObj.add(circle);
            },
            //解析定位结果
            onComplete(data) {
                let Lng = data.position.getLng();
                let Lat = data.position.getLat();
                this.myMark = new AMap.Marker({
                    map: mapObj,
                    position: [Lng, Lat]
                });
                console.log(this.myMark);
            },
            //解析定位错误信息
            onError(data) {
            }
        },
        created(){

        },
        mounted() {

            let _self = this;
            mapObj = new AMap.Map("mapContainer", {
                resizeEnable: true,
                view: new AMap.View2D({
                    resizeEnable: true,
                    zoom: 16
                }),
                keyboardEnable: false
            });
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.OverView'], function () {
                mapObj.addControl(new AMap.ToolBar());
                mapObj.addControl(new AMap.Scale());
                mapObj.addControl(new AMap.OverView({isOpen: true}));
            });

            //定位当前位置
            mapObj.plugin('AMap.Geolocation', function () {
                _self.geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                mapObj.addControl(_self.geolocation);
                _self.geolocation.getCurrentPosition();
                AMap.event.addListener(_self.geolocation, 'complete', _self.onComplete);//返回定位信息
                AMap.event.addListener(_self.geolocation, 'error', _self.onError);      //返回定位出错信息
            });


            AMap.event.addListener(mapObj, 'click', function (e) {
                //get x, y coordinate
                var x = e.lnglat.getLng();
                var y = e.lnglat.getLat();
                mapObj.remove(_self.marks);

                console.log(_self.myMark);
                let dis = _self.myMark.getPosition().distance([x, y]);
                let temMark = new AMap.Marker({
                    icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    position: [x, y],
                });
                temMark.setMap(mapObj);
                temMark.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                    content: "距我" + AMap.Util.format(dis, 2) + "米"
                });
                _self.marks.push(temMark);


                _self.lngX = x;
                _self.latY = y;
                AMap.service('AMap.Geocoder', function () {
                    var geocoder = new AMap.Geocoder({
                        city: ""
                    });
                    var lnglatXY = [x, y];
                    new Promise((resolve, reject) => {
                        geocoder.getAddress(lnglatXY, function (status, result) {
                            if (status === 'complete' && result.info === 'OK') {
                                //get city
                                var cityName = result.regeocode.addressComponent.city;
                                _self.city = cityName;
                                resolve()
                            } else {
                                reject();
                            }
                        });
                    }).then(response => {
                        return new Promise((resolve, reject) => {
                            AMap.service('AMap.Weather', function () {
                                let weather = new AMap.Weather();
                                mapObj.addControl(weather);
                                weather.getLive(_self.city, function (ErrorStatus, WeatherLiveResult) {
                                    if (null == ErrorStatus) {
                                        resolve(WeatherLiveResult);
                                    } else {
                                        reject();
                                    }
                                })
                            })
                        })
                    }, error => {

                    }).then(WeatherLiveResult => {
                        console.log(WeatherLiveResult);
                        _self.aqi = WeatherLiveResult.weather + "|" +  WeatherLiveResult.temperature + "℃";
                    });

                })
            });
        }
    }
</script>
<style type="text/css">
    body {
        margin: 0;
        height: 100%;
        width: 100%;
        position: absolute;
        font-size: 12px;
    }

    #mapContainer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    #pos {
        background-color: #fff;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        font-size: 12px;
        left: 10px;
        top: 30px;
        border-radius: 3px;
        line-height: 30px;
        border: 1px solid #ccc;
    }

    #pos input {
        border: 1px solid #ddd;
        height: 23px;
        border-radius: 3px;
        outline: none;
    }

    #pos label {
        min-width: 100px;
        display: inline-block;
        text-align: left;
    }

    #result1 {
        max-height: 300px;
    }
</style>
