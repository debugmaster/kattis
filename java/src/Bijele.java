import java.util.Scanner;

public class Bijele {

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    System.out.println(
        Bijele.solve(
            sc.nextInt(),
            sc.nextInt(),
            sc.nextInt(),
            sc.nextInt(),
            sc.nextInt(),
            sc.nextInt()));
  }

  private static String solve(
      int kings, int queens, int rooks, int bishops, int knights, int pawns) {
    return String.format(
        "%s %s %s %s %s %s", 1 - kings, 1 - queens, 2 - rooks, 2 - bishops, 2 - knights, 8 - pawns);
  }
}
