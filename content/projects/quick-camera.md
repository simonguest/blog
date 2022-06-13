---
title: Quick Camera
synopsis: Quick Camera is a macOS utility to display, mirror, and rotate the output from any supported USB web camera. You can use Quick Camera for video conferences or presentations where you need to show an external device to your audience.
---
I developed Quick Camera in 2013 for a presentation on mobile application development. For my presentation (pre-pandemic to a live audience), I needed to display the screen of an actual iPhone using an external camera. I found that Photo Booth and other similar apps would mirror the display (with no easy way of reverting). To solve for this, I developed Quick Camera. My goal was to create a high-performing utility, free of clutter, supporting USB camera pass-through and basic video transformations.

I rewrote the app in 2017, converting from Objective C to Swift and AVFoundation. Downloads were fairly dormant until the pandemic hit. It then became quite popular as teachers, students, and other professionals found it useful for a variety of remote working use cases. I've had a lot of "Thank you for Quick Camera!" messages from users using the app for astronomy (connecting to USB-based telescopes), science (connecting to microscopes), and general display purposes (one of my favorite stories is from a user in Japan using it to help a vision-impaired relative to read).

![Quick Camera Screenshot](/images/quick-camera-screenshot.png)

Quick Camera is [free to download](https://apps.apple.com/us/app/quick-camera/id598853070?mt=12) from the macOS App Store. You can also [build it from source](https://github.com/simonguest/quick-camera) if you'd like to modify it.

While I don't have a ton of bandwidth to work on Quick Camera, you can find current [issues and feature requests](https://github.com/simonguest/quick-camera/issues) on the Github repo. If you are facing an issue using the app, you'll likely find it has been reported there.

If you are a developer, feel free to fork the repo and [submit a pull request](https://github.com/simonguest/quick-camera/pulls). I always welcome additional features and contributions.