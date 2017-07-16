import {Component, AfterViewInit, Input} from '@angular/core';

declare var Snap:any;
declare var mina:any;
@Component({
  templateUrl: 'svg.html',
  selector: 'elementsvg',
})
export class SVGElement implements AfterViewInit {

  @Input() value: string;
  @Input() text: string;

  ngAfterViewInit() {
      this.startSvg();
  }
  startSvg() {
    var s = Snap.select("#svg");
  //  var sky = s.select("#sky");
    var sky = s.rect(0, 0, 375, 400).attr({
        fill: "#59ABE3"
    });
    var cloud1 = s.path("M0,61.639c4.418,0,8-3.582,8-7.998c0-4.417-3.582-8-8-8c-1.601,0-3.082,0.481-4.334,1.291c-1.23-5.316-5.973-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.999c0,6.626,5.372,11.998,11.998,11.998C47.562,61.639,56.924,61.639,59.943,61.639z")
    .attr({
      fill: "#fff",
      stroke: "none",
      opacity: "1"
    });
    var cloud2 = s.path("M80,81.639c4.418,0,8-3.582,8-7.998c0-4.417-3.582-8-8-8c-1.601,0-3.082,0.481-4.334,1.291c-1.23-5.316-5.973-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.999c0,6.626,5.372,11.998,11.998,11.998C47.562,61.639,56.924,61.639,59.943,81.639z")
    .attr({
      fill: "#fff",
      stroke: "none",
      opacity: "1"
    });
    // var sea = s.path("m326.5,219.5c-123,-59 -368,94 -364,22c4,-72 -36,141 -36.5,140.5c0.5,0.5 501.5,-11.5 501,-12c0.5,0.5 22.5,-91.5 -100.5,-150.5z")
    // .attr({
    //   fill: "#2f437d",
    //   stroke: "none",
    //   opacity: ".8"
    // });

    //var sea = s.path("m326.5,219.5c-213.512518,84.948223 -213.620974,-7.884725 -410.264705,3.664949c-196.643731,11.549673 -332.141554,211.937696 -251.849345,203.599579c80.29221,-8.338116 681.052236,-33.464869 696.914192,-12.93827c15.861954,20.526598 178.712376,-279.274482 -34.800142,-194.326258z")

    //var sea = s.path("m638.892,231.091728c0,0 -32.658,43.700227 -74.615,-4.308583c-12.58,-14.395643 -45.339,70.671643 -56.963,69.606163c-15.671,-1.438787 -37.806,-54.751663 -55.943,-30.058974c-19.16,26.084812 -33.363,-32.695453 -46.985,-27.624703c-13.846,5.1563 -27.061,73.922523 -40.47,69.092866c-12.392,-4.471904 -33.561,-76.62122 -53.538,-83.426291c-17.827,-6.074013 -27.345,64.138774 -46.842,54.19948c-20.123,-10.265937 -22.572,-28.7524 -41.932,5.179632c-13.608,23.852749 -37.921,-56.058237 -37.921,-56.058237s-26.376,98.140801 -33.562,101.158364c-27.736,11.60362 -31.233,4.884097 -58.309,-70.500544c-17.772,-49.478705 -36.101,9.869298 -57.272,14.40342c-21.556,4.604117 -37.54,-41.662594 -37.54,-41.662594l0,198.319235l641.892,0l0,-198.319235z")
    //var sea = s.path("m873.891999,260.663429c0,0 -92.705463,25.895159 -211.80777,-2.553109c-35.710537,-8.530332 -128.702707,41.877435 -161.69947,41.24607c-44.484883,-0.852573 -107.318964,-32.443836 -158.804021,-17.81185c-54.389021,15.456907 -94.706729,-19.374131 -133.375166,-16.36939c-39.304301,3.055435 -76.817397,43.803787 -114.881196,40.941909c-35.176866,-2.649887 -95.268787,-45.402937 -151.977006,-49.435373c-50.605068,-3.599238 -77.623581,38.006295 -132.969236,32.116632c-57.122666,-6.083219 -64.074582,-17.037622 -119.03134,3.069261c-38.628696,14.134268 -107.645413,-33.218064 -107.645413,-33.218064s-74.872904,58.154655 -95.271626,59.942752c-78.733502,6.875881 -88.660351,2.894138 -165.520327,-41.776048c-50.44894,-29.319274 -102.479023,5.848186 -162.576621,8.534941c-61.190487,2.728232 -106.563876,-24.687732 -106.563876,-24.687732l0,117.516736l1822.123067,0l0,-117.516736l0,0.000001z")
    //var sea = s.path("m873.891999,240.344688c0,0 -92.705463,23.931364 -211.80777,-2.35949c-35.710537,-7.883423 -128.702707,38.701602 -161.69947,38.118118c-44.484883,-0.787917 -107.318964,-29.983413 -158.804021,-16.461064c-54.389021,14.284711 -94.706729,-17.904868 -133.375166,-15.127995c-39.304301,2.823722 -76.817397,40.481868 -114.881196,37.837024c-35.176866,-2.448929 -95.268787,-41.959743 -151.977006,-45.686374c-50.605068,-3.326285 -77.623581,35.124036 -132.969236,29.681024c-57.122666,-5.62189 -64.074582,-15.745551 -119.03134,2.836499c-38.628696,13.062376 -107.645413,-30.698927 -107.645413,-30.698927s-74.872904,53.744417 -95.271626,55.396912c-78.733502,6.35444 -88.660351,2.674657 -165.520327,-38.607904c-50.44894,-27.095807 -102.479023,5.40468 -162.576621,7.887682c-61.190487,2.521332 -106.563876,-22.815504 -106.563876,-22.815504l0,108.604694l1822.123067,0l0,-108.604694l0,0.000001z")
    var sea1 = s.path("m773.89196,234.770703c0,0 -92.705463,26.549756 -211.80777,-2.617648c-35.710537,-8.745968 -128.702707,42.936043 -161.69947,42.288719c-44.484883,-0.874125 -107.318964,-33.263975 -158.804021,-18.262111c-54.389021,15.847638 -94.706729,-19.863885 -133.375166,-16.783188c-39.304301,3.132673 -76.817397,44.911092 -114.881196,41.976869c-35.176866,-2.716873 -95.268787,-46.550666 -151.977006,-50.685037c-50.605068,-3.690222 -77.623581,38.967046 -132.969236,32.9285c-57.122666,-6.236995 -64.074582,-17.468312 -119.03134,3.146848c-38.628696,14.491564 -107.645413,-34.057775 -107.645413,-34.057775s-74.872904,59.624731 -95.271626,61.458029c-78.733502,7.049695 -88.660351,2.967298 -165.520327,-42.832094c-50.44894,-30.060428 -102.479023,5.99602 -162.576621,8.750693c-61.190487,2.797198 -106.563876,-25.311806 -106.563876,-25.311806l0,120.487411l1822.123067,0l0,-120.487411l0,0.000001z")
    var sea2 = s.path("m756.968876,308.616887c0,0 -92.705463,26.549756 -211.807769,-2.617648c-35.710537,-8.745968 -128.702707,42.936044 -161.69947,42.288719c-44.484884,-0.874125 -107.318964,-33.263975 -158.804021,-18.262111c-54.389022,15.847638 -94.706729,-19.863885 -133.375167,-16.783188c-39.3043,3.132673 -76.817396,44.911092 -114.881195,41.976869c-35.176867,-2.716873 -95.268788,-46.550666 -151.977007,-50.685037c-50.605068,-3.690223 -77.623581,38.967046 -132.969236,32.9285c-57.122666,-6.236995 -64.074582,-17.468312 -119.03134,3.146848c-38.628695,14.491564 -107.645412,-34.057775 -107.645412,-34.057775s-74.872904,59.624731 -95.271626,61.45803c-78.733502,7.049695 -88.66035,2.967297 -165.520327,-42.832094c-50.44894,-30.060428 -102.479023,5.99602 -162.576621,8.750693c-61.190487,2.797198 -106.563876,-25.311806 -106.563876,-25.311806l0,120.487411l1822.123067,0l0,-120.487411l0,0z");

    var sea = s.group(sea1, sea2);
    sea.attr({
      fill: "#2f437d",
      stroke: "none",
      opacity: ".8"
    });
    var cloudGroup = s.group(cloud1, cloud2);

    function cloudAnimate(el) {
      el.transform('t 0,0');
      el.animate({transform: 't 350,0'}, 13000, mina.linear, cloudAnimate.bind(null, el));
    }

    var g = s.group(sky, cloudGroup, sea);//, sea

    var cir = s.circle(200,200,155).attr({ stroke: 'silver', 'strokeWidth': 40, fill: 'silver' });
    g.attr({ mask: cir });

    var circleOuter = s.circle(200,200,195).attr({
        stroke: "#cfcfcf",
        strokeDasharray: "2 4",
        fill: 'none',
        strokeWidth: 30
    });


   var text = s.text(200, 200, (this.value + this.text) );
   text.attr({
        fill: "#FFF",
       'font-size': '120px',
        "text-anchor":"middle",
   });


   wave_forward(sea);
   function wave_forward(el) {
     el.animate({ transform: 't 40,0' }, 4000, mina.linear, wave_reverse.bind(null, el));
   }
   function wave_reverse(el) {
     el.animate({ transform: 't -40,0' }, 4000, mina.linear, wave_forward.bind(null, el));
   }
   function anim() {
     circleOuter.transform('r0,200,200')
     circleOuter.animate({ transform: "r360,200,200" }, 80000, mina.linear, anim);
   };

  cloudAnimate(cloudGroup);
  anim();


  }

}
