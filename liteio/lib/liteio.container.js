//// zwebsocket must be locasted before
/**********************************************************************
<script type="text/javascript" src="/lib/jquery.js"></script>
<script type="text/javascript" src="/zlib/zwebsocket.js"></script>
<script type="text/javascript" src="/zlib/zcontainer.js"></script>
<script type="text/javascript" src="your_new_script.js"></script>
***********************************************************************/


$(document).ready(function($){
	init_container();
});

var liteio_websocket;
var liteio_Container_callback = new Array(); //// callback array
var liteio_Container_init = new Array();     //// init array

function liteio_Container_count()
{
  return liteio_Container_init.length;
}

function liteio_wscallback(b, sz)
{
  var i = 0;
  for ( i=0 ; i<liteio_Container_callback.length ; i++ )
  {
    if ( liteio_Container_callback[i] )
    {
      liteio_Container_callback[i](b, sz);
    }
  }
}

function init_container()
{
  var i = 0;
  var _ip = $('#wss_ip').text();
  var _port = $('#wss_port').text();
	liteio_websocket = new liteio_WebSocket(_ip, _port, 4000, liteio_wscallback);
  
  for ( i=0 ; i<liteio_Container_init.length ; i++ )
  {
    if ( liteio_Container_init[i] )
    {
      liteio_Container_init[i]();
    }
  }
	liteio_websocket.connect();
  //zWebSocket_connect(zwebsocket, 4000);

}

function get_liteio_WebSocket()
{
  return liteio_websocket;
}