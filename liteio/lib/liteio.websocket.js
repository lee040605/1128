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
            console.log("connected"); // 연결이 성공적으로 열렸음을 콘솔에 출력합니다.
            _this.logMessage("Connected to " + _this.url); // 로그에 연결된 URL을 기록합니다.
        };

        // 메시지를 수신했을 때 호출되는 함수입니다.
        this.socket.onmessage = function(msg) 
		{
            if (typeof msg.data === 'string') {
                // 데이터가 텍스트 형식인 경우 로그에 기록합니다.
                _this.logMessage("Received packet: " + msg.data);
            } else {
                // 데이터가 바이너리 형식인 경우 별도의 처리 함수를 호출합니다.
                _this.processBinaryData(msg.data);
            }
        };

        // 연결이 닫혔을 때 호출되는 함수입니다.
        this.socket.onclose = function() 
		{
            clearTimeout(_this.tmr); // 타이머를 초기화합니다.
            _this.tmr = setTimeout(_this.connect.bind(_this), _this.delay); // 일정 시간 후에 다시 연결을 시도합니다.
            _this.logMessage('Connection closed. Reconnecting in ' + _this.delay + 'ms...'); // 로그에 재연결 시도 메시지를 기록합니다.
            console.log('close'); // 연결이 닫혔음을 콘솔에 출력합니다.
        };
    };

    // 메시지를 소켓을 통해 보냅니다.
    this.write = function(msg) {
        this.socket.send(msg);
    };
	
	
	
	
	
	
	
	
	
	
	
    // 로그 메시지를 화면에 표시합니다.
    this.logMessage = function(message) {
        var logDiv = document.getElementById('log'); // 로그를 표시할 div 요소를 가져옵니다.
        if (logDiv) {
            var newMessage = document.createElement('div'); // 새로운 div 요소를 생성합니다.
            newMessage.textContent = message; // 새로운 메시지를 div 요소에 설정합니다.
            logDiv.appendChild(newMessage); // 로그 div에 새로운 메시지를 추가합니다.

            while (logDiv.children.length > 3) {  // 로그 메시지가 너무 많아지지 않도록 제한합니다.
                logDiv.removeChild(logDiv.firstChild); // 오래된 로그 메시지를 삭제합니다.
            }

            logDiv.scrollTop = logDiv.scrollHeight; // 로그 div의 스크롤을 맨 아래로 이동시킵니다.
        } else {
            console.log(message); // 로그 div가 없으면 콘솔에 출력합니다.
        }
    };
	

    // 바이너리 데이터를 처리하는 함수입니다.
    this.processBinaryData = function(data) {
        var reader = new FileReader(); // FileReader 객체를 생성합니다.
        reader.onload = function(event) {
            var arrayBuffer = event.target.result; // 읽어온 데이터를 ArrayBuffer로 가져옵니다.
            var byteArray = new Uint8Array(arrayBuffer); // ArrayBuffer를 Uint8Array로 변환합니다.
			
			
            // 각 칸에 넣을 바이트 수 설정
            var fieldLengths = [4, 1, 1, 2, 2, 1, 1, 1, 1];
            var ids = ['header', 'channel', 'response', 'status', 'cycle_no', 'step', 'type_mode', 'cycle', 'step_loop'];

            var byteOffset = 0; 
            for (var i = 0; i < fieldLengths.length; i++) {
                var length = fieldLengths[i];
                var chunk = byteArray.slice(byteOffset, byteOffset + length);
                var hexString = byteArrayToHexString(chunk);
                document.getElementById(ids[i]).textContent = hexString;
                byteOffset += length;
            }
        };
        reader.readAsArrayBuffer(data); // 바이너리 데이터를 ArrayBuffer로 읽습니다.
    };
	
	
	
	


    // 바이트 배열을 16진수 문자열로 변환하는 함수입니다.
    function byteArrayToHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2); // 각 바이트를 16진수 문자열로 변환합니다.
        }).join(' '); // 변환된 문자열을 공백으로 구분하여 결합합니다.
    }
	
	
	
	 this.updateClientIps = function(ips) {
        var ipList = ips.join("<br>");
        document.getElementById('client_ips').innerHTML = ipList;
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

