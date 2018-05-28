pragma solidity ^0.4.18;


contract CrowdFunding {
	struct Investor {
		address addr;	// 投資家のアドレス
		uint amount;	// 投資額
	}
	
	address public owner;		// コンストラクトオーナー
	uint public numInvestors;	// 投資家の数
	uint public deadline;		// 締め切り(UnixTime)
	string public status;		// キャンペーンステータス
	bool public ended;			// キャンペーンの終了半知恵
	uint public goalAmount;		// 目標額
	uint public totalAmount;	// 投資の総額
	mapping (uint => Investor) public investors;	// 投資家管理用のマップ 
	
	modifier onlyOwner () {
		require(msg.sender == owner);
		_;
	}
	
	function CrowdFunding(uint _duration, uint _goalAmount) public {
		owner = msg.sender;

		// 締め切り時刻を設定
		deadline = now + _duration;

		goalAmount = _goalAmount;
		status = "Funding";
		ended = false;

		numInvestors = 0;
		totalAmount = 0;
	}
	
	// 投資する際に呼び出される
	function fund() payable public {
		// キャンペーン終了であれば処理を中断する
		require(!ended);
		
		Investor storage inv = investors[numInvestors++];
		inv.addr = msg.sender;
		inv.amount = msg.value;
		totalAmount += inv.amount;
	}
	
	// 目標額達成確認
	function checkGoalReached () public onlyOwner {		
		// キャンペーン終了であれば処理を中断する
		require(!ended);
		
		// 締め切り前の場合は処理を中断
		require(now >= deadline);
		
		// 目標額達成
		if(totalAmount >= goalAmount) {
			status = "Campaign Succeeded";
			ended = true;
			// オーナーにコントラクト内のetherを送金
			if(!owner.send(this.balance)) {
				revert();
			}
		} else {
			uint i = 0;
			status = "Campaign Failed";
			ended = true;
			
			// 投資家全てにetherを返金
			while(i <= numInvestors) {
				if(!investors[i].addr.send(investors[i].amount)) {
					revert();
				}
				i++;
			}
		}
	}
	
	// コントラクトの破棄
	function kill() public onlyOwner {
		selfdestruct(owner);
	}
}