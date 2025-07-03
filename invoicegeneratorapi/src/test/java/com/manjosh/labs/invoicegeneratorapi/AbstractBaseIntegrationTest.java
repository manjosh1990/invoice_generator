package com.manjosh.labs.invoicegeneratorapi;

import java.util.Objects;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers
@SpringBootTest
public abstract class AbstractBaseIntegrationTest {

  @Container
  static MongoDBContainer mongoDBContainer =
      new MongoDBContainer(DockerImageName.parse("mongo:6.0"))
          .withReuse(false)
          .withExposedPorts(27017)
          .withCreateContainerCmdModifier(
              cmd ->
                  Objects.requireNonNull(cmd.getHostConfig())
                      .withPortBindings(
                          new com.github.dockerjava.api.model.PortBinding(
                              com.github.dockerjava.api.model.Ports.Binding.bindPort(28017),
                              new com.github.dockerjava.api.model.ExposedPort(27017))));

  @DynamicPropertySource
  static void setMongoDbProperties(DynamicPropertyRegistry registry) {
    registry.add(
        "spring.data.mongodb.uri", () -> String.format("mongodb://localhost:%d/testdb", 28017));
  }

  static {
    mongoDBContainer.withLogConsumer(
        outputFrame -> System.out.println("MongoDB: " + outputFrame.getUtf8String()));
  }
}
