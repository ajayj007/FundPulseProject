FROM maven:3.9.4-eclipse-temurin-17-slim AS builder

WORKDIR /usr/src/myapp

# Copy pom.xml and src/ from the Backend directory
COPY Backend/pom.xml ./
COPY Backend/src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /usr/src/myapp

# Copy the built JAR from the builder stage
COPY --from=builder /usr/src/myapp/target/*.jar Fundpulse-Application-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "Fundpulse-Application-0.0.1-SNAPSHOT.jar"]
