function StockMarket () {
	var price = 10.00;
	var numSharesHeld = 0;
	var totalMoney = 100;
	var changeFromYesterday = 0;
	var positive = true;
	var priceArray = [];
	var signArray = [];
	var posMultiplier = [];
	var negMultiplier = [];
	this.generatePrices = function()
	{
		for (var i = 1; i <= 50; i++)
		{
			priceArray.push(Math.floor(Math.random()*6));
		}
		for (var j = 1; j <= 75; j++)
		{
			priceArray.push(Math.floor(Math.random()*16));
		}
		for (var k = 1; k <= 40; k++)
		{
			priceArray.push(Math.floor(Math.random()*21));
		}
		for (var l = 1; l <= 20; l++)
		{
			priceArray.push(Math.floor(Math.random()*51));
		}
        for (var n = 1; n <= 10; n++)
        {
            priceArray.push(Math.floor(Math.random()*101));
        }
		for (var m = 1; m <= 5; m++)
		{
			priceArray.push(Math.floor(Math.random()*201));
		}
	};
	this.generateSigns = function ()
	{
		for (var i = 1; i <= 200; i++)
		{
			signArray.push(Math.floor(Math.random()*2+1));
		}
		for (var j = 1; j <= 10; j++)
		{
			signArray.push(2);
		}
	};
	this.generateMultipliers = function ()
	{
		for (var i = 1; i <= 20; i++)
		{
			posMultiplier.push(Math.random().toFixed(2));
		}
		for (var j = 1; j <= 20; j++)
		{
			negMultiplier.push(Math.random().toFixed(2) + 1);
		}
	};
	this.buyShares = function (numShares)
	{
		if (!(numShares > 0 && numShares < 999999999))
		{
			console.log("You can't do that... \n\n");
		}
		else
		{
			var shares = parseInt(numShares, 10);
			if ((shares * price) > totalMoney)
			{
				console.log("You can't do that... \n\n");
			}
			else
			{
				totalMoney -= (shares*price);
				numSharesHeld += shares;
				console.log("You bought " + shares + " shares for $" + (shares*price) + ". \n");
				console.log("Your current balance is $" + totalMoney + " and you have " + numSharesHeld + " shares. \n\n");
			}
		}
	};
	this.sellShares = function (numShares)
	{
		if (!(numShares > 0 && numShares < 999999999))
		{
			console.log("You can't do that... \n\n");
		}
		else
		{
			var shares2 =  parseInt(numShares, 10);
			if (shares2 > numSharesHeld)
			{
				console.log("You can't do that... \n\n");
			}
			else
			{
				totalMoney += (shares2 * price);
				numSharesHeld -= shares2;
				console.log("You sold " + shares2 + " shares for $" + (shares2*price) + ". \n");
				console.log("Your current balance is $" + totalMoney + " and you have " + numSharesHeld + " shares. \n\n");
			}
		}
	};
	this.fluctuate = function ()
	{
		var fluctuation = priceArray[Math.floor(Math.random()*priceArray.length)];
		var way = signArray[Math.floor(Math.random()*signArray.length)];
		var newFluctuation;
		if (way === 1)
		{
			fluctuation = (negMultiplier[Math.floor(Math.random()*negMultiplier.length)]*fluctuation);
			newFluctuation = fluctuation.toFixed(2);
		}
		else if (way === 2)
		{
			fluctuation = (posMultiplier[Math.floor(Math.random()*posMultiplier.length)]*fluctuation);
			newFluctuation = fluctuation.toFixed(2);
		}
		if (way === 1 && price - newFluctuation > 0 && newFluctuation !== 0)
		{
			price = price - newFluctuation;
			changeFromYesterday = newFluctuation;
			positive = false;
		}
		else if (way === 2 && newFluctuation !== 0)
		{
			price = price + newFluctuation;
			changeFromYesterday = newFluctuation;
			positive = true;
		}
		else
		{
			newFluctuation = 0;
			way = null;
			positive = null;
		}
	};
	this.dispFluctuation = function ()
	{
		console.log("Yesterday, the stock market ");
		if (positive === true)
		{
			console.log("rose by $" + changeFromYesterday + ". \n");
			console.log("The price per share is currently at $" + price + ". \n");
			console.log("Your current assets are worth $" + (totalMoney + (numSharesHeld * price)) + ". \n");
		}
		else if (positive === false)
		{
			console.log("fell by $" + changeFromYesterday + ". \n");
			console.log("The price per share is currently at $" + price + ". \n");
			console.log("Your current assets are worth $" + (totalMoney + (numSharesHeld * price)) + ". \n");
		}
		else
		{
			console.log("did not change. \n");
			console.log("The price per share is currently at $" + price + ". \n");
			console.log("Your current assets are worth $" + (totalMoney + (numSharesHeld * price)) + ". \n");
		}
	};
	this.displayFinalResults = function()
	{
		console.log("At the end of 90 days, the stock price is at $" + price + " and you own $" + (totalMoney + (numSharesHeld*price)) + " in assets. \n");
	};
	this.getBalance = function()
	{
		return totalMoney;
	};
	this.getStock = function()
	{
		return numSharesHeld;
	};
	this.getPrice = function ()
	{
		return price;
	};
}
var again = true;
do
{
	var stockGame = new StockMarket ();
	stockGame.generatePrices();
	stockGame.generateSigns();
	stockGame.generateMultipliers();
	for (var i = 1; i <= 90; i++)
	{
		console.log("Today is day " + i + " of 90. \n");
		stockGame.fluctuate();
		stockGame.dispFluctuation();
		var answer1 = prompt("Would you like to buy or sell today? (B/S/N)");
		if (answer1.toLowerCase() === "b")
		{
			console.log("You have $" + stockGame.getBalance() + ". \n");
			console.log("You can buy at most " + Math.floor(stockGame.getBalance()/stockGame.getPrice()) + " shares. \n");
			var number = prompt("How many shares? (A number, please)");
			var response = confirm("You are buying " + number + " shares for $" + (stockGame.getPrice()*number) + ". Correct?");
			if (response === true)
			{
				stockGame.buyShares(number);
			}
			else
            {
                console.log("Transaction cancelled. \n\n");
            }
		}
		else if (answer1.toLowerCase() === "s")
		{
			console.log("You have " + stockGame.getStock() + " shares. \n");
			var number = prompt("How many shares? (A number, please)");
			var response = confirm("You are selling " + number + " shares for $" + (stockGame.getPrice()*number) + ". Correct?");
			if (response === true)
			{
				stockGame.sellShares(number);
			}
			else
            {
                console.log("Transaction cancelled. \n\n");
            }
		}
		else if (answer1.toLowerCase() === "n")
		{
			console.log("Okay. No buying or selling today. \n\n");
		}
		else
		{
			console.log("Not a valid response. No selling or buying today. \n\n");
		}
	}
	stockGame.displayFinalResults();
	var finalAnswer = prompt("Want to play again? (Y/N)");
	if (finalAnswer.toLowerCase() === "y")
	{
		console.log("Okay, rebooting!");
		again = true;
	}
	else if (finalAnswer.toLowerCase() === "n")
	{
		console.log("Okay. Thanks for playing!");
		again = false;
	}
	else
	{
		console.log("Not a valid response. Quitting out...");
		again = false;
	}
} while (again);