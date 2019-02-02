import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

  public static void main(String[] args) {
    String classpath = System.getProperty("java.class.path");
    String[] paths = classpath.split(System.getProperty("path.separator"));

    for (String path : paths) {
      File file = new File(path + System.getProperty("file.separator") + "problems");
      if (!file.exists()) {
        logErrorAndExit("Please build project with 'mvn package' before running.");
      } else if (!file.isDirectory()) {
        logErrorAndExit("Directory /problems could not be found.");
      }

      File inputFolder = new File(".." + System.getProperty("file.separator") + "input");
      File outputFolder = new File(".." + System.getProperty("file.separator") + "output");

      for (File problem : file.listFiles()) {
        String problemName = problem.getName().replace(".class", "").toLowerCase();
        File problemSamples =
            new File(inputFolder.getPath() + System.getProperty("file.separator") + problemName);
        if (!problemSamples.exists() || !problemSamples.isDirectory()) {
          System.err.println(
              String.format(
                  "Input folder of %s could not be found. It will skip it.", problemName));
          continue;
        }

        File problemSolutions =
            new File(outputFolder.getPath() + System.getProperty("file.separator") + problemName);
        if (!problemSolutions.exists() || !problemSolutions.isDirectory()) {
          System.err.println(
              String.format(
                  "Output folder of %s could not be found. It will skip it.", problemName));
          continue;
        }

        for (File sample : problemSamples.listFiles()) {
          ProcessBuilder processBuilder = new ProcessBuilder();
          processBuilder.command(
              "java",
              "-cp",
              System.getProperty("java.class.path"),
              String.format("problems.%s", problem.getName().replace(".class", "")));
          processBuilder.redirectInput(sample);

          String received = "";
          try {
            Process process = processBuilder.start();
            received =
                new BufferedReader(new InputStreamReader(process.getInputStream()))
                    .lines()
                    .reduce("", (s, t) -> s.concat("\n").concat(t));

            if (process.getErrorStream().available() > 0) {
              System.err.println(
                  String.format(
                      "Sample %s of %s failed with error: %s",
                      sample.getName(),
                      problemName,
                      new BufferedReader(new InputStreamReader(process.getErrorStream()))
                          .lines()
                          .reduce("", (s, t) -> s.concat("\n").concat(t))));
              continue;
            }
          } catch (IOException ioe) {
            System.err.println(ioe.getMessage());
          }

          String expected = "";
          try {
            expected =
                new BufferedReader(
                        new FileReader(new File(sample.getPath().replace("input", "output"))))
                    .lines()
                    .reduce("", (s, t) -> s.concat("\n").concat(t));
            ;
          } catch (FileNotFoundException fnfe) {
            System.err.println(fnfe.getMessage());
          }

          System.out.println(
              String.format(
                  "%s %s/%s",
                  (received.equals(expected) ? '✔' : '✘'), problemName, sample.getName()));
        }
      }
    }
  }

  private static void logErrorAndExit(String errorMessage) {
    System.err.println(errorMessage);
    System.exit(1);
  }
}
