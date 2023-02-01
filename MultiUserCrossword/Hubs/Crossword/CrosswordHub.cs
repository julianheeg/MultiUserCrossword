using Microsoft.AspNetCore.SignalR;

namespace MultiUserCrossword.Hubs.Crossword;

public class CrosswordHub : Hub<ICrosswordClient>
{
	public CrosswordHub()
	{ 
	}

	public async Task RequestCrossword()
	{
		var crossword = Puzzle.Crossword.GenerateHardCodedExample();
		await Clients.Caller.ReceiveCrossword(crossword);
	}
}
