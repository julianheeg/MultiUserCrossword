using System.Text.Json;
using System.Text.Json.Serialization;

namespace Puzzle.JsonConverter;

internal class CellJsonConverter : JsonConverter<ICell>
{
    public override ICell? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, ICell value, JsonSerializerOptions options)
    {
        var type = value.GetType();
        JsonSerializer.Serialize(writer, value, type, options);
    }
}
