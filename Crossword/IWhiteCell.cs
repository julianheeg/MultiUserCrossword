namespace Puzzle;

internal interface IWhiteCell : ICell
{
    char SolutionCharacter { get; }
    char? GuessedCharacter { get; }
}
