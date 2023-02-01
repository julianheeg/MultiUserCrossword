using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Text.Json;

namespace Puzzle.UnitTest.JsonConverters;

[TestClass]
public class CrosswordConversionTest
{
    [TestMethod]
    public void Write_ShouldConvertHardCodedExampleCrossword()
    {
        var crossword = Crossword.GenerateHardCodedExample();

        var actual  = JsonSerializer.Serialize(crossword);

        var expected = """
            {
                "grid": [
                    [
                        {
                            "isWhiteCell": false
                        },
                        {
                            "isWhiteCell": false,
                            "clueDown": "ac"
                        },
                        {
                            "isWhiteCell": false,
                            "clueAcross": "e",
                            "clueDown": "bd"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "e"
                        }
                    ],
                    [
                        {
                            "isWhiteCell": false,
                            "clueAcross": "abf"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "a"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "b"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "f"
                        }
                    ],
                    [
                        {
                            "isWhiteCell": false,
                            "clueAcross": "cdg"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "c"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "d"
                        },
                        {
                            "isWhiteCell": true,
                            "solutionCharacter": "g"
                        }
                    ]
                ]
            }
            """;

        Assert.That.AreEqualExcludingWhiteSpace(expected, actual);
    }
}
