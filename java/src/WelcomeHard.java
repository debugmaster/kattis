/**
 * Based on https://github.com/lantoli/Google-Code-Jam/blob/master/06_WelcomeToCodeJam/WelcomeToCodeJamDP.java
 */

import java.util.Scanner;

public class WelcomeHard {

    private static final char[] SENTENCE = "welcome to code jam".toCharArray();

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int tests = Integer.parseInt(sc.nextLine());
        for (int test = 1; test <= tests; test++) {
            String sanitized = sanitize(sc.nextLine());
            System.out.println(String.format("Case #%s: %04d", test, WelcomeHard.solve(sanitized)));
        }
    }

    private static int solve(String text) {
        if (text.length() == 0) {
            return 0;
        }

        int[] state = null;
        int[] lastState = null;

        for (int i = 0; i < text.length(); i++) {
            state = new int[SENTENCE.length];
            for (int j = 0; j < SENTENCE.length; j++) {
                if (i > 0) {
                    state[j] = lastState[j];
                }
                if (text.charAt(i) == SENTENCE[j]) {
                    if (i > 0 && j > 0) {
                        state[j] += lastState[j - 1];
                    } else {
                        state[j]++;
                    }
                    state[j] = state[j] % 10000;
                }
            }
            lastState = state;
        }

        return state[SENTENCE.length - 1];
    }

    private static String sanitize(String text) {
        int firstIndex = text.indexOf(SENTENCE[0]);
        int lastIndex = text.lastIndexOf(SENTENCE[SENTENCE.length - 1]);
        if (firstIndex >= 0 && lastIndex >= 0 && firstIndex < lastIndex) {
            return text.substring(firstIndex, lastIndex + 1);
        }
        return "";
    }
}
