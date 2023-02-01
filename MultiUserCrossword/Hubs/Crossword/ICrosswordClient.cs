namespace MultiUserCrossword.Hubs.Crossword;

public interface ICrosswordClient
{
    Task ReceiveCrossword(Puzzle.Crossword crossword);
}
