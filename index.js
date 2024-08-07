var index_periodic_proc_id;
var gidx = liteio_Container_count();

liteio_Container_init[gidx] = index_init;
liteio_Container_callback[gidx] = index_callback;

function currTime()
{
  now = new Date();
  year = now.getFullYear();
  month = now.getMonth()+1;
  date = now.getDate();
  hour = now.getHours();
  min = now.getMinutes();
  var set;
  if(hour <= 12)
  {
    set="AM"
  }
  else
  {
    set="PM"
    hour = hour - 12;
  }
  if(hour == 00)
  {
    hour = 12
  }
  
  return year + " - " + PAD(month,2) + " - " + PAD(date,2) + " " + set + " " + PAD(hour,2) + ":" + PAD(min, 2);
}



function index_periodic_proc(obj)
{
  console.log('index_periodic_proc');

  //////////////////////////
  //                      //
  //      modifying       //
  //                      //
  //////////////////////////
  $("#clock").text(currTime());   ///<<<<<<<<<<<< modifying....



  clearTimeout(index_periodic_proc_id)
  index_periodic_proc_id = setTimeout(index_periodic_proc, 100, obj);
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function index_init()
{
  self.resizeTo(1920,1080);
  console.log('index_init');

  //////////////////////////
  //                      //
  //      modifying       //
  //                      //
  //////////////////////////
  fxGraphZ1Draw('graph_1');   ///<<<<<<<<<<<< modifying....
  fxGraphZ2Draw('graph_2');   ///<<<<<<<<<<<< modifying....


  console.log('set timeout');
  index_periodic_proc_id = setTimeout(index_periodic_proc, 1000, 0);
  

}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function init_status()
{
  var id = 0;
  var i=0;
  var ii=0;
  var limit = 3;

  for ( i = 0 ; i<1012 ; i++ )
  {
    if ( i == 8 ) i=1000;
    if ( i==6 ) limit = 3;
    else limit = 1;

    for ( ii=0 ; ii<limit ; ii++ )
    {
      id = '#statebox' + PAD(i, 4) + "_" + PAD(ii, 4) + '_00';
      $(id).css('background-color', '#BDBDBD');
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function DebugConsole(b, sz)
{
  var dbg = '';
  var i;
  var v = new Uint8Array(b);

  for ( i=0 ; i<sz ; i++ )
  {
    dbg += PAD(v[i].toString(16), 2) + ',';
  }
  //console.log(dbg);

  console.log('to debug');
  $('#debug').text(dbg);

}


function index_proc_value(b, sz)
{
  var i;
  var v = new Uint8Array(b);

  DebugConsole(b, sz);

  ____GraphZ1.value.v = v[4];

  console.log(i + ' ---> ' + g_rfid_chk);

  console.log(v[1].toString(16) + ', ' + v[12] + ' -> ' + i + ', ' + ii + ' ---> ' + g_rfid_chk);
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
/////////////////////////////////////                  ////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

function debug_log(dat, sz)
{
  var dbg = ' ';
  var v = new Uint8Array(dat);

  for ( i=0 ; i<sz ; i++ )
  {
    dbg += PAD(v[i].toString(16), 2) + ' ';
  }
  console.log(dbg);
}

function index_callback(dat, sz)
{
  // 02 01 01 02 03 02 01 01 02 03 02 01 01 02 03
  var v = new Uint8Array(dat);
  var i = 0;
  var ii = 0;


  index_proc_value(v, sz);
  return;

}



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
/////////////////////////////////////                  ////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
/////////////////////////////////////                  ////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

var ____GraphZ1 = new liteioChart();

function fxGraphZ1Draw(id)
{
  ____GraphZ1.fxInitChart(id, "RADIAL");
  ____GraphZ1.PeriodicDrawChart(id,____GraphZ1.attr.tmr.period);
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
____GraphZ1.fxInitChart = function(id, type)
{
  var _v;
  this.attr.scale = 1;
  this.attr.type = type;
  this.attr.id = id + "Canvas";  /// do not modify
  this.attr.position[0] = 0;  /// do not modify
  this.attr.position[1] = 0;  /// do not modify

  _v = $('#'+id).css('width').split('px');
  this.attr.width = _v[0];
  _v = $('#'+id).css('height').split('px');
  this.attr.height = _v[0];
  this.attr.dim = '2d';

  this.attr.border.color = 'transparent'
  this.attr.border.type = 'solid';
  this.attr.border.thick=0;
  this.attr.background.color = 'transparent';

  this.attr.tmr.period = 1;

  this.axis.thick =10;
  this.axis.color = '#0182FF';
  this.axis.radial.center[0] = this.attr.width/2;
  this.axis.radial.center[1] = this.attr.height/2-10;
  this.axis.radial.radius[0] = this.attr.height/2;
  this.axis.radial.radius[1] = this.attr.height/2;
  this.axis.radial.mradius[0] = ((this.axis.radial.radius[0]<=this.axis.radial.radius[1])?this.axis.radial.radius[0]:this.axis.radial.radius[1]);
  this.axis.radial.mradius[1] = ((this.axis.radial.radius[0]>this.axis.radial.radius[1])?this.axis.radial.radius[0]:this.axis.radial.radius[1]);

  this.axis.radial.ccw[0] = (3/4)*Math.PI;
  this.axis.radial.ccw[1] = (1/4)*Math.PI;
  this.axis.radial.gradient.callback = this.fxDrawGradient;

  this.face.thick = 1;
  this.face.color = '#ffffff';
  this.face.background.color = '#FFFFFF';

  this.value.ratio = 2.7;
  this.value.max = 100;

  this.value.delta[0] = this.value.delta[1] = 0;
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
____GraphZ1.fxDrawValue = function()
{
  var r = DEGREE( (this.value.v*this.value.ratio));   //// DEGREE TO RADIAN
  if ( this.value.curr < this.value.v*this.value.ratio )
  {
    this.value.curr+=this.value.delta[0];
  }
  else
  {
    this.value.curr-=this.value.delta[1];
  }
  if ( this.value.curr <= 0 ) this.value.curr = 0;
  else if ( this.value.curr >= 180 ) this.value.curr = 180;
  r = DEGREE(this.value.curr);

  if ( (this.value.delta[0]==0) || (this.value.delta[1]==0) )
  {
    this.value.curr = this.value.v*this.value.ratio;
  }

  this.context.beginPath();
  this.context.arc(this.x(0), this.y(0), 5, 0, Math.PI*2);
  this.context.strokeStyle = this.face.color;
  this.context.fillStyle = this.face.background.color;
  this.context.lineWidth = this.face.thick;
  this.context.fill();
  this.context.stroke();

  this.context.beginPath();
  this.context.moveTo(this.x( 3*Math.cos(r+DEGREE(90))), this.y( 3*Math.sin(r-DEGREE(90))));
  this.context.lineTo(this.x( 3*Math.cos(r-DEGREE(90))), this.y( 3*Math.sin(r+DEGREE(90))));
  this.context.lineTo(this.x((this.axis.radial.mradius[0]) * Math.cos( DEGREE(224)-r ) ), this.y((this.axis.radial.mradius[0]) * Math.sin(DEGREE(224)-r)));
  this.context.closePath();
  this.context.lineWidth = this.face.thick;
  this.context.strokeStyle = this.face.color;
  this.context.fillStyle = this.face.background.color;
  this.context.fill();
  this.context.stroke();
}


///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
____GraphZ1.fxDrawGradient = function(obj)
{
  var spectrum_offset = 50;
  var grd = obj.context.createLinearGradient(obj.X(obj.axis.radial.center[0])-obj.axis.radial.radius[0]-spectrum_offset, 0, obj.X(obj.axis.radial.center[0])+obj.axis.radial.radius[0]+spectrum_offset, 0);
  grd.addColorStop(1, "#FF0000");
  grd.addColorStop(0.5, "#FFFF00");
  grd.addColorStop(0, "#70FF00");
  obj.context.strokeStyle = grd;

  obj.SetText( obj.x( (obj.axis.radial.radius[0]-5)*Math.cos(DEGREE(225))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(225))), 20, 0,   '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-5)*Math.cos(DEGREE(198))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(198))), 20, 10,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-7)*Math.cos(DEGREE(171))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(171))), 20, 20,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-5)*Math.cos(DEGREE(144))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(144))), 20, 30,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-5)*Math.cos(DEGREE(117))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(117))), 20, 40,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-5)*Math.cos(DEGREE(90))),  obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(90))),  20, 50,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-20)*Math.cos(DEGREE(63))),  obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(63))),  20, 60,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-20)*Math.cos(DEGREE(36))),  obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(36))),  20, 70,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-18)*Math.cos(DEGREE(9))),   obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(9))),   20, 80,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-20)*Math.cos(DEGREE(342))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(342))), 20, 90,  '#FFFFFF', "bold 12px Arial");
  obj.SetText( obj.x( (obj.axis.radial.radius[0]-30)*Math.cos(DEGREE(315))), obj.y( (obj.axis.radial.radius[0]-20)*Math.sin(DEGREE(315))), 20, 100, '#FFFFFF', "bold 12px Arial");
}




///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////                  ////////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
/////////////////////////////////////                  ////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
var ____GraphZ2 = new liteioChart();

function fxGraphZ2Draw(id)
{
  ____GraphZ2.fxInitChart(id, "QUADRANT");
  ____GraphZ2.PeriodicDrawChart(id,____GraphZ2.attr.tmr.period);
}

____GraphZ2.fxInitChart = function(id, type)
{
  var _v;
  this.attr.scale = 1;
  this.attr.type = type;
  this.attr.id = id + "Canvas";  /// do not modify
  this.attr.position[0] = 0;  /// do not modify
  this.attr.position[1] = 0;  /// do not modify

  //// calculate the size of div
  _v = $('#'+id).css('width').split('px');
  this.attr.width = _v[0];
  _v = $('#'+id).css('height').split('px');
  this.attr.height = _v[0];
  this.attr.dim = '2d';

  this.attr.border.color = 'transparent';
  this.attr.border.type = 'dotted';
  this.attr.border.thick=0;
  this.attr.background.color = 'transparent';

  this.attr.update.period = 10; //1800000;
  this.attr.tmr.period = 1;
  this.attr.drawing.continuous = true;

  this.axis.thick =1;
  this.axis.color = '#FFFFFF';

  
  this.axis.quadrant.bgn[0] = 20;
  this.axis.quadrant.bgn[1] = 20;
  this.axis.quadrant.end[0] = 290;
  this.axis.quadrant.end[1] = 320;

  this.axis.quadrant.x.color = '#FFFF00';
  this.axis.quadrant.x.bounds = 100;
  this.axis.quadrant.x.bias.use = 1;
  this.axis.quadrant.y.color = '#FFFF00';
  this.axis.quadrant.y.bias.use = 1;

  this.axis.quadrant.x.unit.ratio = 10;
  this.axis.quadrant.y.unit.ratio = 10;
  this.axis.quadrant.x.unit.marking_offset = 10;
  this.axis.quadrant.y.unit.marking_offset = 1;

  this.axis.quadrant.x.strong.bounds = (this.axis.quadrant.x.unit.marking_offset);

  this.axis.quadrant.x.elapsed = 10;

  this.face.thick = 1;
  this.face.color = '#FFFFFF';
  this.face.background.color = 'transparent';
  this.face.font.family = 'Courier New';
  this.face.font.size  = 18;
  this.face.font.color = '#FFFFFF';


  this.value.v = new Array();
  this.value.ratio = 1.0;
  this.value.max = 100;
  this.value.delta[0] = this.value.delta[1] = 0;


  this.value.coord.xy = new Array();
  this.value.coord.index = null;

  this.callback = this.Callback;
}

____GraphZ2.Callback = function(obj, ecode)
{
  if ( ecode == 0xE000105B )
  {

  }
  if ( ecode == 0xE000101B )
  {
  }

  if ( ecode == 0xE000101A )
  {
    this.UpdateXYBias('T',1000);
  }

  if ( ecode == 0xE00010DB )
  {
  }
}

____GraphZ2.fxDrawValue = function(obj)
{
  if ( this.UpdatePeriodicValue(this.attr.update.period) == true )
  {
    var inc_dec = 0;
    if ( this.value.coord.index == null )
    {
      this.value.coord.index = this.axis.quadrant.x.max;
      for ( i=this.axis.quadrant.x.max; i>=0 ; i-- )
      {
        this.value.coord.xy[i] = new Array();
        this.value.coord.xy[i][0] = null;
        this.value.coord.xy[i][1] = null;
      }
    }
    else
    {
      inc_dec = -1;
    }

    for ( i=0; i<this.axis.quadrant.x.max; i++ )
    {
      this.value.coord.xy[i][0] = i;
      this.value.coord.xy[i][1] = this.value.coord.xy[i+1][1];
    }
    this.value.coord.index = valueRotate(this.value.coord.index, this.axis.quadrant.x.max, inc_dec);

    this.value.coord.xy[this.axis.quadrant.x.max][0] = this.axis.quadrant.x.max;
    this.value.coord.xy[this.axis.quadrant.x.max][1] = this.value.v;
  }
  if ( this.value.coord.index != null )
  {
    for ( i=0 ; i< this.axis.quadrant.x.max  ; i++ )
    {
      if ( this.value.coord.xy[i][0]!=null )
      {
        if ( i+1 <= this.axis.quadrant.x.max )
        {
          this.DrawVLine(
            [this.value.coord.xy[i  ][0]*this.axis.quadrant.x.unit.ratio,this.value.coord.xy[i  ][1]],
            [this.value.coord.xy[i+1][0]*this.axis.quadrant.x.unit.ratio,this.value.coord.xy[i+1][1]],
            2,   '#FFFFFF', 'transparent', 1.0,
            0.5, '#FFFFFF', '#FF0000', 0.5 );
        }
      }
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// /////////////////////////////////////////////////
///////////////////////////////////////////     ///////////////////////////////////////////////
/////////////////////////////////////////          ////////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
/////////////////////////////////////                  ////////////////////////////////////////
///////////////////////////////////                      //////////////////////////////////////
//////////////////////////////////                         ////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////              //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////







