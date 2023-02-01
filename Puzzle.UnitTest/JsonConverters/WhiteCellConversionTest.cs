using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text.Json;

namespace Puzzle.UnitTest.JsonConverters;

[TestClass]
public class WhiteCellConversionTest
{
    [TestMethod]
    public void Write_ShouldOmitGuessedCharacter_IfNull()
    {
        var whiteCell = new WhiteCell() { SolutionCharacter = 'w' };

        var actual = JsonSerializer.Serialize(whiteCell);

        var expected = """
            {
                "isWhiteCell": true,
                "solutionCharacter": "w"
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }

    [TestMethod]
    public void Write_ShouldIncludeGuessedCharacter_IfNotNull()
    {
        var whiteCell = new WhiteCell() { SolutionCharacter = 'w', GuessedCharacter = 'c' };

        var actual = JsonSerializer.Serialize(whiteCell);

        var expected = """
            {
                "isWhiteCell": true,
                "solutionCharacter": "w",
                "guessedCharacter": "c"
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }
}
