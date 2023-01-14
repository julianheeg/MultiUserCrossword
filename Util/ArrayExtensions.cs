namespace Util;

public static class ArrayExtensions
{
    public static T[][] ToJaggedArray<T>(this T[,] multiDimensionalArray)
    {
        var iLength = multiDimensionalArray.GetLength(0);
        var jLength = multiDimensionalArray.GetLength(1);

        var result = new T[iLength][];
        for (int i = 0; i < iLength; i++)
        {
            result[i] = new T[jLength];
            for (int j = 0; j < jLength; j++)
                result[i][j] = multiDimensionalArray[i, j];
        }
        return result;
    }
}
