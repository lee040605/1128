//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////                              ////////////////////
////////////////////                              ////////////////////
////////////////////         DO NOT MODIFY        ////////////////////
////////////////////                              ////////////////////
////////////////////                              ////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function liteio_WebSocket(ip, port, delay, callback) 
{
    // 콜백 함수와 웹소켓 연결을 위한 URL, 지연 시간 및 소켓 객체를 초기화합니다.
    this.callback = callback;  
    this.url = "ws://" + ip + ":" + port;
    this.tmr;
    this.delay = delay;
    this.socket;
    var _this = this; // 현재 객체의 참조를 변수에 저장하여 내부 함수에서 접근할 수 있도록 합니다.

    // connect 메서드는 웹소켓 연결을 설정합니다.
    this.connect = function() 
    {
        this.socket = new WebSocket(this.url); // 주어진 URL로 웹소켓 연결을 생성합니다.

        // 연결이 열렸을 때 호출되는 함수입니다.
        this.socket.onopen = function() 
        {
            console.log("connected to " + _this.url); // 연결이 성공적으로 열렸음을 콘솔에 출력합니다.
        };

        // 메시지를 수신했을 때 호출되는 함수입니다.
        this.socket.onmessage = function(msg) 
        {
            if (typeof msg.data === 'string') {
                // 데이터가 텍스트 형식인 경우 로그에 기록합니다.
                console.log("Received packet: " + msg.data);
            } else {
                // 데이터가 바이너리 형식인 경우 별도의 처리 함수를 호출합니다.
                _this.callback(msg.data, msg.data.size);
            }
        };

        // 연결이 닫혔을 때 호출되는 함수입니다.
        this.socket.onclose = function() 
        {
            clearTimeout(_this.tmr); // 타이머를 초기화합니다.
            _this.tmr = setTimeout(_this.connect.bind(_this), _this.delay); // 일정 시간 후에 다시 연결을 시도합니다.
            console.log('Connection closed. Reconnecting in ' + _this.delay + 'ms...'); // 로그에 재연결 시도 메시지를 기록합니다.
        };

        // 연결 오류가 발생했을 때 호출되는 함수입니다.
        this.socket.onerror = function(error) 
        {
            console.error('WebSocket error: ', error);
        };
    };

    // 메시지를 소켓을 통해 보냅니다.
    this.write = function(msg) 
    {
        this.socket.send(msg);
    };

	

    // 바이트 배열을 16진수 문자열로 변환하는 함수입니다.
    function byteArrayToHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2); // 각 바이트를 16진수 문자열로 변환합니다.
        }).join(' '); // 변환된 문자열을 공백으로 구분하여 결합합니다.
    }

}





/***
function zWebSocket_init(zws)
{
	//zWebSocket_setup(zws,ip, port);
	zWebSocket_connect(zws, zws.delay);
}


function zWebSocket_connect(zws, delay)
{
  try
  {
    //������� �ٽÿ�
		zws.socket=new WebSocket(zws.url);
    zws.socket.onopen=function()
    {
      console.log('connect');
    }
    zws.socket.onmessage=function(msg)
    {
		  //console.log("1");//üũ��
      zWebSocket_onread(zws,msg);
    }
    zws.socket.onclose=function()
    {
			//console.log("disconnected. It will reconnect websocket, after 4seconds");
			clearTimeout(zws.tmr);
      zws.tmr=setTimeout(zWebSocket_connect,delay,zws);			
      console.log('close');
		}
  }
  catch(exception){}
  return zws;
}

function zWebSocket_onread(zws,msg)
{
  var rdr = new FileReader();
  rdr.readAsArrayBuffer(msg.data);
  rdr.onloadend = function()
  {
    zws.callback(rdr.result, msg.data.size);
  }
}


/***
  connect = function()
  {
    this.socket = new WebSocket(this.url);
    console.log('connect');
  }

  this.socket.onopen=function()
  {
  }
  this.socket.onmessage=function(msg)
  {
    read(msg);
  }
  this.socket.onclose=function()
  {
    clearTimeout(this.tmr);
    this.tmr=setTimeout(this.connect,4000,this);			
    console.log('close');
  }
  read = function(msg)
  {
    //callback(msg.data, msg.data.size);
  }
  this.write = function(msg)
  {
    this.socket.send(msg);
  }
***/


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

