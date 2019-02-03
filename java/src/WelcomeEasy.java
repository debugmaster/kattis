/**
 * Based on https://github.com/lantoli/Google-Code-Jam/blob/master/06_WelcomeToCodeJam/WelcomeToCodeJamDP.java
 */

import java.util.Scanner;

public class WelcomeEasy {

  private static final char[] SENTENCE = "welcome to code jam".toCharArray();

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int tests = Integer.parseInt(sc.nextLine());
    for (int test = 1; test <= tests; test++) {
      System.out.println(String.format("Case #%s: %04d", test, WelcomeEasy.solve(sc.nextLine())));
    }
  }

  private static int solve(String test) {

    int firstIndex = test.indexOf(SENTENCE[0]);
    if (firstIndex < 0) {
      return 0;
    }

    test = test.substring(firstIndex);

    int[] state = null;
    int[] lastState = null;

    for (int i = 0; i < test.length(); i++) {
      state = new int[SENTENCE.length];
      for (int j = 0; j < SENTENCE.length; j++) {
        if (i > 0) {
          state[j] = lastState[j];
        }
        if (test.charAt(i) == SENTENCE[j]) {
          if (i > 0 && j > 0) {
            state[j] += lastState[j - 1];
          } else {
            state[j]++;
          }
        }
      }
      lastState = state;
    }

    return state[SENTENCE.length - 1];
  }
}
