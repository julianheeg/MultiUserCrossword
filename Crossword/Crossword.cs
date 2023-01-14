using Util;

namespace Puzzle;

public class Crossword
{
    public ICell[][] Grid { get; private init; }

    public Crossword(ICell[,] grid)
    {
        Grid = grid.ToJaggedArray();
    }

    public static Crossword GenerateHardCodedExample()
    {
        var grid = new ICell[3, 4];
        grid[0, 0] = new BlackCell();
        grid[0, 1] = new BlackCell() { ClueDown = "ac" };
        grid[0, 2] = new BlackCell() { ClueDown = "bd", ClueAcross = "e"};
        grid[0, 3] = new WhiteCell('e');
        grid[1, 0] = new BlackCell() { ClueAcross = "abf" };
        grid[1, 1] = new WhiteCell('a');
        grid[1, 2] = new WhiteCell('b');
        grid[1, 3] = new WhiteCell('f');
        grid[2, 0] = new BlackCell() { ClueAcross = "cdg" };
        grid[2, 1] = new WhiteCell('c');
        grid[2, 2] = new WhiteCell('d');
        grid[2, 3] = new WhiteCell('g');

        var crossword = new Crossword(grid);
        return crossword;
    }
}
