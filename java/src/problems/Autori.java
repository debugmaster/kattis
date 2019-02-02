package problems;

import java.util.Arrays;
import java.util.Scanner;

public class Autori {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(Autori.solve(sc.nextLine()));
  }

  private static String solve(String longName) {
    return Arrays.stream(longName.split("-"))
        .map((s) -> s.substring(0, 1))
        .reduce("", (s, t) -> s + t);
  }
}
