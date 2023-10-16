package guru.springframework.spring6restmvc.bootstrap;

import java.time.ZonedDateTime;
import java.time.ZoneId;

public class test {
    public static void main(String[] args) {
        // Create a ZoneId for Amsterdam
        ZoneId amsterdamZone = ZoneId.of("Europe/Amsterdam");

        // Get the current date and time in Amsterdam's time zone
        ZonedDateTime amsterdamTime = ZonedDateTime.now(amsterdamZone);

        System.out.println("Current date and time in Amsterdam: " + amsterdamTime);
    }
}
