import java.util.Scanner;

public class SumSquaredDigits {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int samples = sc.nextInt();
        for (int i = 1; i <= samples; i++) {
            System.out.println(
                    String.format("%d %d", sc.nextInt(), SumSquaredDigits.solve(sc.nextInt(), sc.nextInt())));
        }
    }

    private static int solve(int base, int number) {
        int result = number;
        int squaredRemainders = 0;
        while (result > 0) {
            int remainder = (result % base);
            squaredRemainders += remainder * remainder;
            result = (result - remainder) / base;
        }
        return squaredRemainders;
    }
}
