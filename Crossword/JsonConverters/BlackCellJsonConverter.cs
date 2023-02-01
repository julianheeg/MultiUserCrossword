using System.Text.Json;
using System.Text.Json.Serialization;

namespace Puzzle.JsonConverters;

internal class BlackCellJsonConverter : JsonConverter<BlackCell>
{
    public override BlackCell? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, BlackCell value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteBoolean("isWhiteCell", value.IsWhiteCell);
        if (value.ClueAcross is not null)
            writer.WriteString("clueAcross", value.ClueAcross);
        if (value.ClueDown is not null)
            writer.WriteString("clueDown", value.ClueDown);
        writer.WriteEndObject();
    }
}
