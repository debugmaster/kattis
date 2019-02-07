import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class SpeedLimit {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextInt()) {
            int samples = sc.nextInt();
            if (samples < 0) {
                break;
            }

            List<Integer> values = new ArrayList<>();
            for (int i = 0; i < 2 * samples; i++) {
                values.add(sc.nextInt());
            }
            System.out.println(
                    String.format("%d miles", SpeedLimit.solve(values)));
        }
    }

    private static int solve(List<Integer> values) {
        int miles = 0;
        int computedHours = 0;

        for (int i = 0, total = values.size()/2; i < total; i++) {
            int speed = values.remove(0);
            int elapsedHours = values.remove(0);
            miles += speed *(elapsedHours - computedHours);
            computedHours = elapsedHours;
        }

        return miles;
    }
}
