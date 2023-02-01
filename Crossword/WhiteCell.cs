using Puzzle.JsonConverters;
using System.Diagnostics;
using System.Text.Json.Serialization;

namespace Puzzle;

[DebuggerDisplay("solution: {SolutionCharacter}, guessed: {GuessedCharacter}")]
[JsonConverter(typeof(WhiteCellJsonConverter))]
internal class WhiteCell : IWhiteCell
{
    public bool IsWhiteCell => true;
    public required char SolutionCharacter { get; init; }
    public char? GuessedCharacter { get; set; }
}
