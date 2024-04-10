# Python program to count all possible paths from
# top left to top bottom right using
# Recursive Dynamic Programming
 
# Returns count of possible paths to reach
# cell at row number m and column number n from
# the topmost leftmost cell (cell at 1, 1)
 
 
def numberOfPaths(n, m, DP,MM):
    #print(n)
    #print(m)
    if n<0 or m<0:
        return 0
    if (n == 0 or m == 0) and MM[n][m]!=0:
        if (n==0 and m == 0) and MM[n][m]!=0:
            DP[n][m] = 1
            return 1
        if (n==0 and m == 0) and MM[n][m]==0:
            return 0
        if (n==0 and m != 0) and MM[n][m]!=0:
            DP[n][m] = numberOfPaths(n, m - 1, DP,MM)
        if (n!=0 and m == 0) and MM[n][m]!=0:
            DP[n][m] = numberOfPaths(n-1, m , DP,MM)


    # Add the element in the DP table
    # If it was not computed before
    if (DP[n][m] == 0) and MM[n][m]!=0:
        DP[n][m] = numberOfPaths(n - 1, m, DP,MM) + numberOfPaths(n, m - 1, DP,MM)
    #if (DP[n][m] == 0) and MM[n][m]==0:
    #    return 0
 
    return DP[n][m]
 
 
# Driver code
if __name__ == '__main__':
 
    # Create an empty 2D table
    DP = [[0 for i in range(7)] for j in range(7)]
    
    MM =[[1,1,1,0,1],[0,1,0,1,1],[1,1,0,1,1],[1,1,1,1,1],[1,1,1,1,1]]
    MM1 =[[1,1,1],[1,1,1],[1,1,1]]

    #print(DP)
    #print(MM1)
    #print(len(MM1))
    #print(len(MM1[0]))
 
    print(numberOfPaths(len(MM)-1,len(MM[0])-1,DP,MM))