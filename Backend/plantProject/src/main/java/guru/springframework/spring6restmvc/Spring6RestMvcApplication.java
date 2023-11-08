package guru.springframework.spring6restmvc;

import guru.springframework.spring6restmvc.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class Spring6RestMvcApplication {

    public static void main(String[] args) {
        SpringApplication.run(Spring6RestMvcApplication.class, args);
    }

}
