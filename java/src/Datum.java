import java.util.Scanner;

public class Datum {

  // Add a zero to the beginning to have January == 1, February == 2, ..., December == 12
  private static int[] daysByMonth = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println(Datum.solve(scanner.nextInt(), scanner.nextInt()));
  }

  private static String solve(int day, int month) {
    if (month > 1) {
      // By each completed month, add its number of days to the count.
      for (int i = month; i > 1; i--) {
        day += daysByMonth[i - 1];
      }
    }
    switch (day % 7) {
      case 1:
        return "Thursday";
      case 2:
        return "Friday";
      case 3:
        return "Saturday";
      case 4:
        return "Sunday";
      case 5:
        return "Monday";
      case 6:
        return "Tuesday";
      default:
        return "Wednesday";
    }
  }
}
