import java.util.Arrays;
import java.util.Scanner;

public class WelcomeEasy {

  private static final char[] SENTENCE =
      new char[] {
        'w', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o', ' ', 'c', 'o', 'd', 'e', ' ', 'j', 'a', 'm'
      };

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int tests = Integer.parseInt(sc.nextLine());
    for (int test = 1; test <= tests; test++) {
      System.out.println(String.format("Case #%s: %04d", test, WelcomeEasy.solve(sc.nextLine())));
    }
  }

  private static int solve(String text) {
    int[] occurrences = new int[SENTENCE.length];

    int curr = 0;
    int currPos = text.indexOf(SENTENCE[curr]);
    while (curr < SENTENCE.length) {
      int nextPos =
          curr != SENTENCE.length - 1 ? text.indexOf(SENTENCE[curr + 1], currPos) : text.length();
      while (currPos >= 0 && currPos < nextPos) {
        if (text.charAt(currPos) == SENTENCE[curr]) {
          occurrences[curr]++;
        }
        currPos++;
      }
      curr++;
    }

    return Arrays.stream(occurrences).reduce(1, (a, b) -> a * b);
  }
}
