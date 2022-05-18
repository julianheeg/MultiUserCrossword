namespace Puzzle;

public class Crossword
{
    private readonly ICell[,] grid;

    public Crossword(ICell[,] grid)
    {
        this.grid = grid;
    }

    public static Crossword GenerateHardCodedExample()
    {
        var grid = new ICell[3, 3];
        grid[0, 0] = new BlackCell();
        grid[0, 1] = new BlackCell() { ClueDown = "ac" };
        grid[0, 2] = new BlackCell() { ClueDown = "bd" };
        grid[1, 0] = new BlackCell() { ClueAcross = "ab" };
        grid[1, 1] = new WhiteCell('a');
        grid[1, 2] = new WhiteCell('b');
        grid[2, 0] = new BlackCell() { ClueAcross = "cd" };
        grid[2, 1] = new WhiteCell('c');
        grid[2, 2] = new WhiteCell('d');

        var crossword = new Crossword(grid);
        return crossword;
    }
}
