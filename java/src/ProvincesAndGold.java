import java.util.Scanner;

public class ProvincesAndGold {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    System.out.println(
        ProvincesAndGold.solve(scanner.nextInt(), scanner.nextInt(), scanner.nextInt()));
  }

  private static String solve(int gold, int silver, int cooper) {
      VictoryCard victoryCard = null;
      TreasureCard treasureCard = null;

      int buyingPower = 0;
      buyingPower += gold * TreasureCard.Gold.buyingPower;
      buyingPower += silver * TreasureCard.Silver.buyingPower;
      buyingPower += cooper * TreasureCard.Copper.buyingPower;

      if (buyingPower >= VictoryCard.Province.cost) {
          victoryCard = VictoryCard.Province;
      } else if (buyingPower >= VictoryCard.Duchy.cost) {
          victoryCard = VictoryCard.Duchy;
      } else if (buyingPower >= VictoryCard.Estate.cost) {
          victoryCard = VictoryCard.Estate;
      }

      if (buyingPower >= TreasureCard.Gold.cost) {
          treasureCard = TreasureCard.Gold;
      } else if (buyingPower >= TreasureCard.Silver.cost) {
          treasureCard = TreasureCard.Silver;
      } else {
          treasureCard = TreasureCard.Copper;
      }

      if (victoryCard != null) {
          return String.format("%s or %s", victoryCard, treasureCard);
      } else {
          return treasureCard.toString();
      }
  }

  private enum VictoryCard {
    Province(8, 6),
    Duchy(5, 3),
    Estate(2, 1);

    private int cost;
    private int victoryPoints;

    VictoryCard(int cost, int victoryPoints) {
      this.cost = cost;
      this.victoryPoints = victoryPoints;
    }
  }

  private enum TreasureCard {
    Gold(6, 3),
    Silver(3, 2),
    Copper(0, 1);

    private int cost;
    private int buyingPower;

    TreasureCard(int cost, int buyingPower) {
      this.cost = cost;
      this.buyingPower = buyingPower;
    }
  }
}
