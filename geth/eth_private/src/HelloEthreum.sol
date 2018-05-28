pragma solidity ^0.4.18;

contract HelloEthereum {
	string public msg1;	
	
	string private msg2; 
	
	address public owner;
	
	uint8 public counter;
	
    // コンストラクタはpublicにする必要がある
	function HelloEthereum(string _msg1) public {
		msg1 = _msg1;
		
		owner = msg.sender;
		
		counter = 0;
	}
	
	function setMsg2(string _msg2) public {
		if(owner != msg.sender) {
            // バージョンアップによりthrowは利用できないようになったため
            // revert()を記述する
			revert();
		} else {
			msg2 = _msg2;
		}
	}
	
	function getMsg2() constant public returns(string) {
		return msg2;
	}
	
	function setCounter() public {
		for(uint8 i = 0; i < 3; i++) {
			counter++;
		}
	}
}