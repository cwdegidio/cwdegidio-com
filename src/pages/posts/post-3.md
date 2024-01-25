---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Down the rabbit hole...'
pubDate: 2024-01-25
description: 'Due to some new responsibilities at work, I am digging around in some old-school Java frameworks.'
author: 'Curtis W. DeGidio'
tags: ['general', 'java']
---
For the last five years, I have been working in Adobe Experience Manager. Initially, I started as a front-end developer, which has been my specialty for about 15 years or so. In the last three years, I have moved into a full-stack developer position and am acting as a team architect, lead, mentor, mother, etc. As anyone who works in AEM knows, it is built around the OSGi paradigm.

Sometimes, the documentation can be very sparse and lacking. It's niche enough that finding information at the usual places, such as Stack Overflow, can be challenging. There is a subreddit, but generally, it is flooded with consulting firm blog spam about "10 things you need to know about AEM" (which is always a list of things you learn in your first week when it bites your hand 20 times for not doing things the correct way).

Being built on OSGi, I figured it was time to dig into the framework and get a more foundational understanding of things. This has led me to notice some stark differences in how other language communities and the Java community approach educating developers on their stack.

As someone who came up in JavaScript, documentation compared to Java is like night and day. Often, JS tutorials make a few assumptions about what you know and walk you through the whole process. Need a specific directory structure? It's there in the tutorial. Need some packages? Get this version to be safe and avoid any issues with the demo project.

Documentation in the Java world frequently makes a LOT of assumptions about what you should know, often with little indication of any prerequisites. Just tonight, I was working through a book on OSGi from 2012 (good luck finding good modern OSGi material). As we started the first demo, they instructed you to create tons of files without indication where they should live, if they should be their own package, some obscure procedures I have never encountered working in Java projects, etc. They try to clean this up with one sentence... "This should be familiar due to your JEE experience." They did not mention how deep your JEE knowledge needed to be in the book's opening. Sure, I worked through the issues and learned a bunch, but at the same time, I can see why this scares some developers when Java is mentioned. It reminded me of me and my boss's favorite joke about advanced math textbooks... "We leave this as an exercise for the reader."

Don't get me wrong. I do enjoy working in Java. However, the community must look at how it teaches and writes tutorials. There are so many layers that it is almost impossible for junior developers to know where to begin.