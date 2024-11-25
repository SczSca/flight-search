FROM openjdk:17
WORKDIR /my-project
CMD ["./gradlew", "clean", "bootJar"]
COPY build/libs/backend-search-flights-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 9090
ENTRYPOINT ["java", "-jar", "app.jar"]