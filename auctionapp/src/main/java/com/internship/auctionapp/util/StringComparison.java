package com.internship.auctionapp.util;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


/**
 * Util Class for implementing "Did you mean?" feature when searching with a typo
 */

public class StringComparison {

    /**
     * Method that finds which part of the goalTerms best match the search term
     *
     * @param searchTerm - the term the user searched for (with the typo)
     * @param goalTerms  - terms from the database, which we are trying to match the searchTerm to
     * @return Optional of the suggestion, or empty Optional if the suggestion is empty or null
     */
    public static Optional<String> getSuggestedName(String searchTerm, List<String> goalTerms) {
        String didYouMean = null;
        int distance = Integer.MAX_VALUE;
        for (String goalTerm : goalTerms) {
            String[] parts = goalTerm.split(" ");
            for (String part : parts) {
                int newDistance = StringComparison.getEditDistance(part, searchTerm);
                if (newDistance < distance && newDistance < searchTerm.length()) {
                    distance = newDistance;
                    didYouMean = part;
                }
            }
            if (distance <= 10 && distance > 0) {
                return Optional.of(didYouMean);
            }
        }
        return Optional.empty();
    }

    /**
     * Method that implements the Levenshtein Edit Distance Algorithm.
     * It measures the difference between two strings by finding the minimum
     * number of single-character edits (insertions, deletions, substitutions).
     * This method implements the algorithm by the Dynamic Programming approach.
     *
     * @param x - first string we receive
     * @param y - second string we receive
     * @return - edit distance between the first and the second string
     */
    public static int getEditDistance(String x, String y) {
        x = x.toLowerCase();
        y = y.toLowerCase();

        int[][] dp = new int[x.length() + 1][y.length() + 1];

        for (int i = 0; i <= x.length(); i++) {
            for (int j = 0; j <= y.length(); j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = min(dp[i - 1][j - 1]
                                    + costOfSubstitution(x.charAt(i - 1), y.charAt(j - 1)),
                            dp[i - 1][j] + 1,
                            dp[i][j - 1] + 1);
                }
            }
        }

        return dp[x.length()][y.length()];
    }

    private static int costOfSubstitution(char a, char b) {
        return a == b ? 0 : 1;
    }

    private static int min(int... numbers) {
        return Arrays.stream(numbers)
                .min()
                .orElse(Integer.MAX_VALUE);
    }
}
