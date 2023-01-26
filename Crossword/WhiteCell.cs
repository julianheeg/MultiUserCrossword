using System.Diagnostics;

namespace Puzzle;

[DebuggerDisplay("solution: {SolutionCharacter}, guessed: {GuessedCharacter}")]
internal class WhiteCell : IWhiteCell
{
    public bool IsWhiteCell => true;
    public char SolutionCharacter { get; private init; }
    public char? GuessedCharacter { get; private init; }

    public WhiteCell(char solutionCharacter)
    {
        SolutionCharacter = solutionCharacter;
    }
}
