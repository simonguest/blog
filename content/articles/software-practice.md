---
title: Why Don't Software Developers Practice?
created: 05/28/2022
updated: 05/29/2022
synopsis: Many professions, such as athletes and musicians, incorporate practice into their daily routines, but software development is an exception to the rule. In this article, I explore why this is concerning and offer five steps for introducing practice into the profession.
---
Many professions incorporate practice into their daily routines. Athletes wake up early to practice regularly. Successful musicians often have a strict routine of practice. And many artists will dedicate time to practicing new techniques they then incorporate into their work.

Yet, as software developers, we don't embrace this concept of practice. We often expect developers to perform (a.k.a. ship software) 100% of their working time. Imagine if this happened with the other professions. Athletes would run races non-stop, musicians would spend all their time performing in front of an audience, and artists would need to produce masterpiece after masterpiece without fail.

This is concerning. Always being under pressure to perform adds significant psychological stress. Having no room for practice means no room for failure, even if a company's employee handbook claims otherwise. No time for practice also means no time for experimentation, or more accurately, experimentation happens in production. Can you imagine a musician trying a new instrument for the first time in front of a packed concert hall?

The concept of practice, however, holds so much potential for improving software development. Practice can help developers try something new - maybe it's a new language, framework, or tool. Practice can also help developers experiment - such as trying different techniques to cache data or an alternate way to get user input. Practice can also help build muscle memory - increasing the ability to write code without constantly relying on Stack Overflow.

What does it take to incorporate practice into software development? I'm sure there are many angles, but here are five steps I've found useful with my teams to develop a culture of practice:

# What's your goal?

The first step is to define a goal. As a developer, what do you want to achieve from practice? Your goal should be bold and should even feel a little intimidating just to say it aloud. It shouldn't be too bold that it's never achievable - but it shouldn't be something you can quickly accomplish in a couple of days either.

To give an example, I recently wanted to learn the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). I had no experience with doing anything audio-related in the browser, and given the size of the spec, it was intimidating at first glance. It did, however, provide for a good goal for which to focus my practice time.

# Work out one step at a time

After establishing a goal, it's important to work the first step on the journey. The key is not to figure out everything at once - you'll likely end up spending more time deconstructing the tasks vs. actually spending time in practice - just the next step in order to make progress. 

Going back to my example of learning Web Audio, I decided the first step was to work out how to play a simple WAV file in the browser. That was the sole focus of my first practice session, and it was easy to know when I had accomplished it. After completing this, to figure out what I should do in my next practice session, I went back to the Web Audio spec and figured out that creating a simple oscillator would be a good next step.

It's important to define one step at a time, and not to over-commit. Even though the goal may be intimidating, practice shouldn't be a stretch. If it is, it will become stressful and you'll likely give up. I like to set a goal of 50%: If I have 90 minutes to practice, my next step should feel about 45 minutes’ worth of work, providing a healthy buffer as I figure things out. Plus, if I end early and accomplish something, I feel much better than running out of time, having over-committed.

# Create a feedback loop

Feedback is critical for practice. Not only does it provide a sense of accomplishment, but you need to know when things are working and if you are making progress.

In their book, [Peak: Secrets from the New Science of Expertise](https://www.amazon.com/Peak-Secrets-New-Science-Expertise-ebook/dp/B011H56MKS), Ericsson and Pool define two types of practice: Purposeful practice and deliberate practice.

Purposeful practice is exploratory. It's done on your own and you create your own feedback loops. Figuring out how to play a WAV file is an example of purposeful practice. If my code plays the sound correctly, that's successful feedback.

Deliberate practice involves another person, such as a coach or mentor. For athletes, this could be a track coach offering advice on improving posture. For software developers, this could be a mentor or a more senior developer offering feedback on the effectiveness of the code.

As you set up your own practice, decide which type of feedback loop is going to be more useful for you. With the abundance of samples and tutorials in our profession, you'll likely default to purposeful practice, but don't discount the value of deliberate practice, especially if there is an opportunity to learn from others.

# Schedule time to practice

Many developers I speak with like the idea of practice, but struggle with fitting it into the calendar. Scheduling time is one of the most important parts of setting up a routine of practice.

Practice should always be outside of a "performance window". Imagine a musician who has two concerts, one in the morning and one in the afternoon. They will probably be tired in between, so practice then is likely counter-productive. The same is true for software development. Carving out an hour in between sprint tasks in the middle of the day may not be the most effective time for a productive practice session. 

Instead, try to look for windows of time outside of your "performances". For me, this is early mornings. I don't know why, but I find it much easier to switch into a mode of practice before taking on any other work. As a result, I try to be steadfast about reserving early morning hours for practice time.

This, of course, begets the question: Should practice time be taken out of the hours allocated to a sprint? If practice time can be scheduled this way, sure, but I lean towards practice being about true personal development, and therefore dedicating time outside of working hours. This approach also opens up the ability to practice things that are not related to your day job. Maybe you want to learn about Rust, but your company has no plans to adopt it. It's easier to commit to this if your practice window is on your own time.

# Create an environment of focus

After scheduling time on the calendar, it can be too easy to adopt a mindset that this is "free time" vs. "practice time".

You should treat practice time as you would any other time where you need to focus. Turn off notifications and close windows with anything that could be a distraction. It can be effective to create a new virtual desktop and then dedicate that desktop entirely to the practice activity. This can help create a separate space, free of clutter, without going through the pain of closing or minimizing my other work.

I've also found the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) works well for practice. I find that I can sustain practice for about 90 minutes before I need to take a break and/or resume other activities. Having a timer helps me frame and dedicate the time to do this.

# Treat your creations as impermanent

Water art, popular in Buddhism, is the concept of painting using water. As the artist paints, the creation comes to life, but as the water slowly evaporates, the art disappears, returning to a clean board.

Practice should have the same impermanence. The goal of practice is about learning. There's no need to publish, share, create tests, create a prototype, or do anything production-worthy with code created during practice. If you want to save your work in between practice sessions, create a private repo, but resist trying to turn the output into something bigger.

Instead, focus on the learning experience. I guarantee that there will be a time where you'll apply what you've learned - but you should wait for that time to come vs. trying to force a creation out of your practice session.

# In closing

I hope you find the above useful, and more start incorporating the concept of practice into software development. If we do, I suspect it will add a lot to the profession, and make for more productive and happy developers.

