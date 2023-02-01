using Puzzle.JsonConverters;
using System.Text.Json.Serialization;

namespace Puzzle;

[JsonConverter(typeof(BlackCellJsonConverter))]
internal class BlackCell : IBlackCell
{
    public bool IsWhiteCell => false;

    public string? ClueAcross { get; init; }

    public string? ClueDown { get; init; }
}
