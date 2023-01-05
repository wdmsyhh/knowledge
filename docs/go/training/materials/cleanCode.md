# Clean Code 作业资料

## EmployeeSystem.java

```java
import lombok.Data;
import sun.plugin.dom.exception.InvalidStateException;

import java.math.BigDecimal;

// 为了方便都放在一个类里了，重构作业也这样即可
public class EmployeeSystem {

  // 需求是依次打印传入的 employee 的薪资和福利成本；
  // 这里为了简化只传 type，实际可能是传入 ID、根据 ID 从数据库查询出相关信息再进行处理
  public static void main(String[] args) {
    for (String type : args) {
      Employee employee = new Employee();
      employee.setType(EmployeeType.valueOf(type));
      BigDecimal totalCost = employee.calculatePay().add(employee.calculateWelfare());
      System.out.printf("Total cost of employee %s is %s%n", employee, totalCost);
    }
  }

  @Data
  private static class Employee {

    private EmployeeType type;
    private BigDecimal baseSalary;
    private BigDecimal workHour;
    private Byte performanceLevel;

    public BigDecimal calculatePay() {
      switch (this.type) {
        case COMMISSIONED:
          return this.calculateCommissionedPay();
        case HOURLY:
          return this.calculateHourlyPay();
        case SALARIED:
          return this.calculateSalariedPay();
        default:
          throw new InvalidStateException("invalid type");
      }
    }

    public BigDecimal calculateWelfare() {
      switch (this.type) {
        case COMMISSIONED:
          return this.calculateCommissionedWelfare();
        case HOURLY:
          return this.calculateHourlyWelfare();
        case SALARIED:
          return this.calculateSalariedWelfare();
        default:
          throw new InvalidStateException("invalid type");
      }
    }

    private BigDecimal calculateCommissionedPay() {
      // 为了简化 mock 即可，实际可能根据该员工的 type、baseSalary、workHour、performanceLevel 等计算得出
      return BigDecimal.valueOf(1000);
    }

    private BigDecimal calculateHourlyPay() {
      // 为了简化 mock 即可，实际可能根据该员工的 type、baseSalary、workHour、performanceLevel 等计算得出
      return BigDecimal.valueOf(2000);
    }

    private BigDecimal calculateSalariedPay() {
      // 为了简化 mock 即可，实际可能根据该员工的 type、baseSalary、workHour、performanceLevel 等计算得出
      return BigDecimal.valueOf(3000);
    }

    private BigDecimal calculateCommissionedWelfare() {
      // 为了简化 mock 即可，实际可能根据该员工的 type、baseSalary、workHour、performanceLevel 等计算得出
      return BigDecimal.valueOf(100);
    }

    private BigDecimal calculateHourlyWelfare() {
      // 为了简化 mock 即可，实际可能根据该员工的 type、baseSalary、workHour、performanceLevel 等计算得出
      return BigDecimal.valueOf(200);
    }

    private BigDecimal calculateSalariedWelfare() {
      // 为了简化 mock 即可，实际可能根据该员工的 type、baseSalary、workHour、performanceLevel 等计算得出
      return BigDecimal.valueOf(300);
    }
  }

  private static enum EmployeeType {
    COMMISSIONED, HOURLY, SALARIED
  }
}
```

## Logger.php

```php
<?php

// 以下用到了一些 PHP 内置函数，看不懂的自己到 https://www.php.net 上查。
// 复制到一个文件里（比如 logger.php）后可直接执行：php logger.php，会在工作目录（执行命令时所在的目录）下创建 logs 目录，里面有所写的日志文件。
class Logger {
    private const FILE_NAME = "demo.log";

    public static function log($message, $context, $isDebug) {
        $logDir = 'logs';
        $logFile = $logDir . DIRECTORY_SEPARATOR . self::FILE_NAME;
        if (!is_dir($logDir)) {
            mkdir($logDir, 0775, true);
        }
        if (!is_file($logFile)) {
            touch($logFile);
        }

        if (is_string($message)) {
            if (is_array($context)) {
                $time = (new DateTime())->format('Y-m-d H:i:s');
                $level = $isDebug ? 'debug' : 'info';
                $logText = "[$time][$level] $message " . json_encode($context) . PHP_EOL;

                // 文件过大时进行轮转（rotate），这里为了测试方便，使用 1 个字节作为阈值。
                //
                // 所谓轮转指为了防止单个日志文件过大导致不好查看或传输，而在其体积超过一定阈值时，将原位置的文件挪走，
                // 并在文件名中添加有序后缀以标识文件的新旧程度。注意，需保证最小的后缀是最新生产的文件，而最大的后缀是最旧的文件。
                // 即每次轮转，都需要将已有的有后缀的文件依次挪动使其后缀加一（意味着需要从后缀最大的开始挪）。
                //
                // 多次运行本脚本，会得到如下文件列表：
                // - demo.log # 里面有最新的日志
                // - demo.log.1 # 里面有次新的日志
                // - demo.log.2
                // - ...
                // - demo.log.n # 里面有最老的日志
                //
                // 以上注释用于帮助理解下面的逻辑，重构时删除；为了将关注点放在代码组织上，这里有一些简化，不代表其可用于正式场景。
                if (filesize($logFile) > 1) {
                    $filenames = scandir($logDir);
                    $maxIndex = 0;
                    foreach ($filenames as $filename) {
                        if (is_file("$logDir/$filename")) {
                            if (strpos($filename, self::FILE_NAME . '.') !== false) {
                                $newIndex = substr($filename, strlen(self::FILE_NAME . '.'));
                                $maxIndex = max($maxIndex, $newIndex);
                            }
                        }
                    }

                    while ($maxIndex >= 0) {
                        $rotateFile = $logFile . ($maxIndex == 0 ? '' : '.' . $maxIndex);
                        copy($rotateFile, $logFile . '.' . ($maxIndex + 1));
                        if ($file = fopen($rotateFile, 'a')) {
                            ftruncate($file, 0);
                            fclose($file);
                        }
                        $maxIndex--;
                    }
                    file_put_contents($logFile, $logText, FILE_APPEND);
                } else {
                    file_put_contents($logFile, $logText, FILE_APPEND);
                }
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

Logger::log("Test", ["key" => "value"], true);
```
