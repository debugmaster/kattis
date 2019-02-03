import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
      String sanitized = sanitize(sc.nextLine());
      System.out.println(String.format("Case #%s: %04d", test, WelcomeEasy.solve(sanitized)));
    }
  }

  private static int solveForOneString(String text) {
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

  private static int solve(String text) {
    List<String> potentialCases = new ArrayList<>();
    for (int i = 0; i < text.length(); i++) {
      if (text.charAt(i) == SENTENCE[0]) {
        int j;
        for (j = i; j < text.length(); j++) {
          if (text.charAt(j) != SENTENCE[0]) {
            potentialCases.add(text.substring(i, j) + text.substring(j).replace("w", ""));
            i = j - 1;
            break;
          }
        }
      }
    }
    return potentialCases.stream().parallel().map(WelcomeEasy::solveForOneString).reduce(0, (a, b) -> a + b);
  }

  private static String sanitize(String text) {
    int firstWPos = text.indexOf('w');
    int lastMPos = text.lastIndexOf('m');
    if (firstWPos > 0 && lastMPos > 0 && firstWPos < lastMPos) {
      return text.substring(firstWPos, lastMPos + 1);
    }
    return text;
  }
}
