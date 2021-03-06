import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {

  public static void main(String[] args) {
    String classpath = System.getProperty("java.class.path");
    String[] paths = classpath.split(System.getProperty("path.separator"));

    for (String path : paths) {
      File file = new File(path);
      if (!file.exists()) {
        System.err.println("Please build project with 'mvn package' before running.");
        System.exit(1);
      }

      File inputFolder = new File(".." + System.getProperty("file.separator") + "input");
      File outputFolder = new File(".." + System.getProperty("file.separator") + "output");

      Arrays.stream(file.listFiles())
          .parallel()
          .forEach(
              (problem) -> {
                if (problem.getName().equals("Main.class") || problem.getName().contains("$")) {
                  return;
                }
                String problemName = problem.getName().replace(".class", "").toLowerCase();
                File problemSamples =
                    new File(
                        inputFolder.getPath() + System.getProperty("file.separator") + problemName);
                if (!problemSamples.exists() || !problemSamples.isDirectory()) {
                  System.err.println(
                      String.format(
                          "Input folder of %s could not be found. It will skip it.", problemName));
                  return;
                }

                File problemSolutions =
                    new File(
                        outputFolder.getPath()
                            + System.getProperty("file.separator")
                            + problemName);
                if (!problemSolutions.exists() || !problemSolutions.isDirectory()) {
                  System.err.println(
                      String.format(
                          "Output folder of %s could not be found. It will skip it.", problemName));
                  return;
                }

                Arrays.stream(problemSamples.listFiles())
                    .parallel()
                    .forEach(
                        (sample) -> {
                          ProcessBuilder processBuilder = new ProcessBuilder();
                          processBuilder.command(
                              "java",
                              "-cp",
                              System.getProperty("java.class.path"),
                              problem.getName().replace(".class", ""));
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
                                      new BufferedReader(
                                              new InputStreamReader(process.getErrorStream()))
                                          .lines()
                                          .reduce("", (s, t) -> s.concat("\n").concat(t))));
                              return;
                            }
                          } catch (IOException ioe) {
                            System.err.println(ioe.getMessage());
                          }

                          String expected = "";
                          try {
                            expected =
                                new BufferedReader(
                                        new FileReader(
                                            new File(sample.getPath().replace("input", "output"))))
                                    .lines()
                                    .reduce("", (s, t) -> s.concat("\n").concat(t));
                            ;
                          } catch (FileNotFoundException fnfe) {
                            System.err.println(fnfe.getMessage());
                          }

                          System.out.println(
                              String.format(
                                  "%s %s/%s",
                                  (received.equals(expected) ? '✔' : '✘'),
                                  problemName,
                                  sample.getName()));
                        });
              });
    }
  }
}
