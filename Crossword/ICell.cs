using Puzzle.JsonConverter;
using System.Text.Json.Serialization;

namespace Puzzle;

[JsonConverter(typeof(CellJsonConverter))]
public interface ICell
{
    bool IsWhiteCell { get; }
}
