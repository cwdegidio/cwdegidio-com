---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Creating a Non-Executable JAR Using Maven'
pubDate: 2024-01-28
description: 'Non-Executable JAR files are a great tool for sharing libraries with others.'
author: 'Curtis W. DeGidio'
tags: ['programming', 'java', 'maven', 'tutorial']
---
In this article, we will examine what a JAR file is, what they are used for, and how to create one using Maven.

## What is a JAR?
To understand what a JAR is, you simply need to remember what JAR stands for. A JAR is a **J**ava **AR**chive. The 
JAR format is based on the common ZIP format. A JAR file can contain numerous file types but the most common is the 
binary Java ```.class``` file. These ```.class``` files are quickly created using the ```javac``` which reads [Java 
declarations and compiles them into a class](https://docs.oracle.com/en/java/javase/17/docs/specs/man/javac.html).
By using tools like Maven, we can automate the process and avoid having to run multiple commands from the CLI.

JARs can be either executable or non-executable. Non-executable JAR files are used for configurations, libraries, etc.
Executable JARs are archive that are executable within the JVM.

## Using Maven to Create a Non-Executable JAR
Before we look at creating an executable JAR in an upcoming tutorial, we will look at creating a non-executable JAR. This is useful when you
have a collection of classes that you would like to share. Maven makes this extremely easy by handling all compilation,
all packaging, and all management of [transitive dependencies](https://en.wikipedia.org/wiki/Transitive_dependency).

For this example, we will create a small library that calculates the area and perimeter of various shapes and returns
the data in JSON format. We will be using IntelliJ IDEA 2023.1.2 (Ultimate Edition) on macOS 14.2.1, although any good 
IDE will work similarly.

### Step 1. Create New Project
Begin by making a new project by going to _File > New > Project..._ .  In the project setup screen, select **New Project**.
We will be using the following settings:
- **Name:** shapes.calc
- **Location:** The location in the file system where you would like to store your project.
- **Language:** Java
- **Build System:** Maven
- **JDK:** Your selected JDK. In my case I am using ```temurin-17```.
- **Add Sample Code:** false
- **Advanced Settings:**
  - **GroupId:** Your chosen group ID. This is usually in reverse domain format. In my case: ```com.cwdegidio```.
  - **ArtifactId:** The name of your artifact. In this case **shapes.calc**.

Press **Create** to open your new project.

### Step 2. Updating dependencies
Open ```pom.xml```. Here we will tell maven what our dependency is. For this project, we will add dependencies for 
Jackson, which we will use to print out JSON of each of our shapes.

```xml
<dependencies>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.14.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.14.2</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.14.2</version>
    </dependency>
</dependencies>
```

After adding these dependencies, reload your Maven project.

### Step 3. Create Classes
First, we will create an interface called ```Shape```.

```java
// Shape.java
package com.cwdegidio.shape;

public interface Shape {
    Double calculateArea();
    Double calculatePerimeter();
    void printJson();
}
```
```java
// Rectangle.java
package com.cwdegidio.shape;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Rectangle implements Shape {
    private Double width;
    private Double height;

    public Rectangle(Double width, Double height) {
        this.width = width;
        this.height = height;
    }

    public String getShape() {
        return "rectangle";
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getArea() {
        return calculateArea();
    }

    public Double getPerimeter() {
        return calculatePerimeter();
    }

    @Override
    public Double calculateArea() {
        return width * height;
    }

    @Override
    public Double calculatePerimeter() {
        return (2 * width) + (2 * height);
    }

    @Override
    public void printJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            System.out.println(e.toString());
        }
    }
}
```
```java
// EquilateralTriangle.java
package com.cwdegidio.shape;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class EquilateralTriangle implements Shape {
    private Double side;

    public EquilateralTriangle(Double side) {
        this.side = side;
    }

    public String getShape() {
        return "equilateralTriangle";
    }

    public Double getSide() {
        return side;
    }

    public void setSide(Double side) {
        this.side = side;
    }

    public Double getArea() {
        return calculateArea();
    }

    public Double getPerimeter() {
        return calculatePerimeter();
    }

    @Override
    public Double calculateArea() {
        return (Math.sqrt(3.0) / 4.0) * Math.pow(side, 2);
    }

    @Override
    public Double calculatePerimeter() {
        return 3 * side;
    }

    @Override
    public void printJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            System.out.println(e.toString());
        }
    }
}
```
```java
// Circle.java
package com.cwdegidio.shape;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Circle implements Shape {

    private Double radius;

    public Circle(Double radius) {
        this.radius = radius;
    }

    public String getShape() {
        return "circle";
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius = radius;
    }

    public Double getArea() {
        return calculateArea();
    }

    public Double getCircumference() {
        return calculatePerimeter();
    }

    @Override
    public Double calculateArea() {
        return Math.PI * Math.pow(radius, 2);
    }

    @Override
    public Double calculatePerimeter() {
        return 2 * Math.PI * radius;
    }

    @Override
    public void printJson() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(this);
            System.out.println(json);
        } catch (JsonProcessingException e) {
            System.out.println(e.toString());
        }
    }
}
```

### Step 4. Creating the JAR and Adding To Local Maven Repository
From our Maven lifecycle, we select ```package```. This will create our JAR in a new folder named ```target```.
If you open this folder you will see a file called ```shapes.calc-1.0-SNAPSHOT.jar```. 

To use this file in a project, we must add it to our local Maven repository. Depending on your setup, the repository
may live in different places, but will be in a folder named ```.m2```. For my system, I can go to 
```~/.m2/repository```. If you used reverse domain lookup, look for a folder that begins with the first part of
your **GroupID**. In my case, this would be ```~/.m2/repository/com```. If you have never added a dependency or library
using the ```com``` prefix, this folder may not exist. If we access this folder, you will see various groups.

Now, back in Maven, we want to run the ```install``` lifecycle. This will add the library to the repository. Looking
in my folder, I now have the following: ```~/.m2/repository/com/cwdegidio/shapes.calc/```

If we access this, we will see a folder called ```1.0-SNAPSHOT``` and a Maven metadata file called ```maven-metadata-local.xml```.
Continue by opening ```1.0-SNAPSHOT```.

In the ```1.0-SNAPSHOT``` folder, we will see four files: ```_remote.repositories```, ```maven-metadata-local.xml```,
```shapes.calc-1.0-SNAPSHOT.jar```, and ```shapes.calc-1.0-SNAPSHOT.pom```. There it is! Our JAR is now in the local
repository. If we examine the ```.pom``` file, we see the following (some data may be different on your system):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.cwdegidio</groupId>
    <artifactId>shapes.calc</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.14.2</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.14.2</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.14.2</version>
        </dependency>
    </dependencies>

</project>
```

This file indicates to Maven that our JAR has transitive dependencies that need to be included when we add
```shapes.calc-1.0-SNAPSHOT.jar``` to another project.

### Step 5. Testing the JAR
Now that we have the JAR available in our local Maven repository, we can make use of it in a new project. Following 
the same steps as earlier, we create a new project with the following settings:
- **Name:** jar-demo
- **Location:** The location in the file system where you would like to store your project.
- **Language:** Java
- **Build System:** Maven
- **JDK:** Your selected JDK. In my case I am using ```temurin-17```.
- **Add Sample Code:** false
- **Advanced Settings:**
    - **GroupId:** Your chosen group ID. This is usually in reverse domain format. In my case: ```com.cwdegidio```.
    - **ArtifactId:** The name of your artifact. In this case **jar-demo**.

Next, we add the dependency for our new JAR to the ```pom.xml``` file of this project and reload the Maven project:
```xml
<dependencies>
    <dependency>
        <groupId>com.cwdegidio</groupId>
        <artifactId>shapes.calc</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
</dependencies>
```

If we look at the Maven tab in IntelliJ, we will see an item labeled **Dependencies**. If we open this, we will see
the following:
```plaintext
- com.cwdegidio:shapes.calc:1.0-SNAPSHOT
 |- com.fasterxml.jackson.core:jackson-core:2.14.2
 |- com.fasterxml.jackson.core:jackson-annotations:2.14.2
 |- com.fasterxml.jackson.core:jackson-databind:2.14.2
```
Not only has Maven imported our JAR, but it has also imported all the necessary transitive dependencies we need.

If we now create a Main class at ```./src/main/java/Main.java```, we can do the following:

```java
import com.cwdegidio.shape.Circle;
import com.cwdegidio.shape.EquilateralTriangle;
import com.cwdegidio.shape.Rectangle;

public class Main {
    public static void main(String[] args) {
        Rectangle r1 = new Rectangle(3.5, 8.2);
        r1.printJson();

        EquilateralTriangle t1 = new EquilateralTriangle(3.0);
        t1.printJson();

        Circle c1 = new Circle(7.25);
        c1.printJson();
    }
}
```

And when we run our ```main``` method, our terminal prints the following:

```json
{
  "width" : 3.5,
  "height" : 8.2,
  "perimeter" : 23.4,
  "shape" : "rectangle",
  "area" : 28.699999999999996
}
{
  "side" : 3.0,
  "perimeter" : 9.0,
  "shape" : "equilateralTriangle",
  "area" : 3.8971143170299736
}
{
  "radius" : 7.25,
  "circumference" : 45.553093477052,
  "shape" : "circle",
  "area" : 165.1299638543135
}
```

Success!

## Closing
In this tutorial, we saw how to create a non-executable JAR file. JAR files created in this fashion are ideal for 
creating useful libraries that can be shared with other developers. Using Maven automates much of the process and
makes the handling of our transitive dependencies very easy.

In our next tutorial, we will look at how to create an executable JAR.
