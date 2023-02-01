using System.Text.Json;
using System.Text.Json.Serialization;

namespace Puzzle.JsonSerializers;

public class CrosswordJsonConverter : JsonConverter<Crossword>
{
    public override Crossword? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, Crossword value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();
        WriteGrid(writer, value.Grid, options);
        writer.WriteEndObject();
    }

    private static void WriteGrid(Utf8JsonWriter writer, ICell[,] grid, JsonSerializerOptions options)
    {
        writer.WriteStartArray("grid");
        for (int i = 0; i < grid.GetLength(0); i++)
        {
            writer.WriteStartArray();
            for (int j = 0; j < grid.GetLength(1); j++)
            {
                JsonSerializer.Serialize(writer, grid[i, j], options);
            }
            writer.WriteEndArray();
        }
        writer.WriteEndArray();
    }
}
