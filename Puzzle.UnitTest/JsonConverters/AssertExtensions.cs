using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;

namespace Puzzle.UnitTest.JsonConverters;

internal static class AssertExtensions
{
    internal static void AreEqualExcludingWhiteSpace(this Assert _, string expected, string actual)
    {
        var expectedWithoutWhiteSpace = String.Concat(expected.Where(c => !Char.IsWhiteSpace(c)));
        var actualWithoutWhiteSpace = String.Concat(actual.Where(c => !Char.IsWhiteSpace(c)));
        Assert.AreEqual(expectedWithoutWhiteSpace, actualWithoutWhiteSpace);
    }
}
