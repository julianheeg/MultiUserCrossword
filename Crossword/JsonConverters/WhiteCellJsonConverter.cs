using System.Text.Json;
using System.Text.Json.Serialization;

namespace Puzzle.JsonConverters;

internal class WhiteCellJsonConverter : JsonConverter<WhiteCell>
{
    public override WhiteCell? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, WhiteCell value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        writer.WriteBoolean("isWhiteCell", true);
        writer.WriteString("solutionCharacter", value.SolutionCharacter.ToString());
        if (value.GuessedCharacter is not null)
            writer.WriteString("guessedCharacter", value.GuessedCharacter.ToString());
        writer.WriteEndObject();
    }
}
