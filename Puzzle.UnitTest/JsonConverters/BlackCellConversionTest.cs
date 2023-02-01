using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text.Json;

namespace Puzzle.UnitTest.JsonConverters;

[TestClass]
public class BlackCellConversionTest
{
    [TestMethod]
    public void Write_ShouldOmitClues_WhenCellHasNoClues()
    {
        var blackCell = new BlackCell();

        var actual = JsonSerializer.Serialize(blackCell);

        var expected = """
            {
                "isWhiteCell": false
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }

    [TestMethod]
    public void Write_ShouldWriteAcrossClueOnly_WhenCellHasAcrossClueOnly()
    {
        var blackCell = new BlackCell() { ClueAcross = "across clue test" };

        var actual = JsonSerializer.Serialize(blackCell);

        var expected = """
            {
                "isWhiteCell": false,
                "clueAcross": "across clue test"
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }

    [TestMethod]
    public void Write_ShouldWriteDownClueOnly_WhenCellHasDownClueOnly()
    {
        var blackCell = new BlackCell() { ClueDown = "down clue test"};

        var actual = JsonSerializer.Serialize(blackCell);

        var expected = """
            {
                "isWhiteCell": false,
                "clueDown": "down clue test"
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }


    [TestMethod]
    public void Write_ShouldWriteDownClueAndAcrossClues_WhenCellHasDownAndAcrossClues()
    {
        var blackCell = new BlackCell() { ClueAcross = "across clue test" , ClueDown = "down clue test" };

        var actual = JsonSerializer.Serialize(blackCell);

        var expected = """
            {
                "isWhiteCell": false,
                "clueAcross": "across clue test",
                "clueDown": "down clue test"
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }
}
