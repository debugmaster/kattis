import java.util.Scanner;

public class NastyHacks {

  private static final String DO_NOT_ADVERTISE = "do not advertise";
  private static final String ADVERTISE = "advertise";
  private static final String DOES_NOT_MATTER = "does not matter";

  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    for (int i = sc.nextInt(); i > 0; i--) {
      System.out.println(NastyHacks.solve(sc.nextInt(), sc.nextInt(), sc.nextInt()));
    }
  }

  private static String solve(int revenueNoAds, int revenueAds, int costOfAds) {
    int profit = revenueAds - costOfAds;
    if (profit > revenueNoAds) {
      return ADVERTISE;
    } else if (profit == revenueNoAds) {
      return DOES_NOT_MATTER;
    } else {
      return DO_NOT_ADVERTISE;
    }
  }
}
