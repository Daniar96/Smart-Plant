
# Stage 2: Run the application
FROM openjdk:17-alpine
WORKDIR application
COPY ../../../target/spring-6-rest-mvc-0.0.1-SNAPSHOT.jar ./demo-aws.jar
EXPOSE 8080
CMD ["java", "-jar", "demo-aws.jar"]
