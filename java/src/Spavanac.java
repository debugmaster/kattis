import java.util.Scanner;

public class Spavanac {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Spavanac.solve(sc.nextInt(), sc.nextInt());
    }

    private static void solve(int hours, int minutes) {
        minutes = minutes - 45;
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
        }

        System.out.println(String.format("%d %d", hours, minutes));
    }
}
