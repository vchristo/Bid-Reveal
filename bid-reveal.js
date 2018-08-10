var address = "0x6090a6e47849629b7245dfa1ca21d94cd15878ef";
var blkCount=0;
if (!Date.now) {
    	Date.now = function() { return new Date().getTime(); }
	}
var timeNow=Math.floor(Date.now() / 1000);
//block = eth.getBlock('latest');
var currentBlock=eth.blockNumber;
//*********** the program starts here ********************************************** 
function runMe(firstBlock, lastBlock){
	if(firstBlock==null)
		firstBlock=eth.blockNumber;
	bToGo=lastBlock;
	currentBlock=firstBlock;
	for (var i= currentBlock; i >= bToGo ; i--){
		if(i%500 ==0){
			console.log(" ************************************************************\n",
						"* Corrent Block: ", i,new Date(block.timestamp * 1000), "\n",
						"************************************************************");
		}
	 	currentBlock=i;
	 	block=eth.getBlock(i);
	 	getHash(block);
	}
	console.log("\n","Total Block as Bid Reveal: ",blkCount);
}

//*************** get the hash from each block ***********************

function getHash(block) {   
        var s = block.transactions;
		var sl=s.length;
        for(var i = 0; i < sl; i++){
		//	console.log(eth.getTransactionReceipt(s[i]));
            getFromHash(s[i]);	        
        }
}


//************** get From hash the transaction countainer and find a pattern ******************************************* 

function getFromHash(h){		
var staus='';
var data='';
var type='';
var    vRec = eth.getTransactionReceipt(h);
var    bHash = eth.getTransaction(h);
//var receipt = web3.eth.getTransactionReceipt(h);
	if(bHash.to == address || bHash.from == address){
		if(vRec.logs[0]!= null && vRec.logs[0].data !=null ) 
			data= vRec.logs[0].data; 
		else data='';
// the data lenght is 64 +2 ("0x") Or 128 + 2 = 130 or 2, just 0x found, the window is just in case ...
// if remove "bHash.value == 0" from line below it sshow all transaction to log file
			if((bHash.value == 0 && data) && (data.length >= 120 && data.length <= 150 || data.length == 2)){
				blkCount++;
				type="Bid Reavel";
			//	if(data.length >= 60 && data.length <= 80)type="Finalized";
				console.log("=============================================================================================\n");
				var vLog=vRec.transactionIndex;
				if(vLog.status == '0x0'){
				console.log("***********************************************************","\n",
						"* Warning! Error encountered during contract execution    *","\n",
						"* Block Number:              ",bHash.blockNumber,"\n",
						"***********************************************************" );
					status=false;
				}else
					status= 'True';
			console.log("---------------------------------------------------------------------------------------------");
			console.log("",new Date(block.timestamp * 1000),"\n", 
				"transaction to:          ",bHash.to , "\n",
				"Block number:            ", bHash.blockNumber, "\n",
				"Value:                   ",(bHash.value)/1000000000000000000,"ETH", "\n",
				"blockHash:               ",vRec.blockHash,"\n" ,
				"transactionHash:         ",vRec.transactionHash,"\n",
				"Status:                  ",status,"\n",
				"Transaction Index        ",vLog,"\n",
		        "gasUsed:                 ",vRec.gasUsed,"\n",	
				"Type:                    ",type);
		}
  }	
}
// Run it;
// eth.blockNumber give's the latest block, 6700 blocks it is more or less 2 days 
runMe(eth.blockNumber,eth.blockNumber-200)
//***********************************************************
    


