---
title: Consistent Keyboard Shortcuts Across macOS and Linux
created: 4/3/2022
synopsis: I frequently switch between a Mac and a Linux machine for writing code. When doing so, it can be challenge remembering the keyboard shortcuts unique to each environment, including nuances for different applications. In this article, I share a strategy for setting up consistent keyboard shortcuts that work well between the two.
---

I frequently switch between Mac and Linux for development. I typically use the Mac for most of my main applications and development specific to the Apple ecosystem. On my DELL XPS running Ubuntu, I run the main Code.org repo and anything else required for x86 development.

Switching between the two can be challenging, especially when trying to remember keyboard shortcuts. Many of the issues stem from both machines having physically different keyboard layouts, but there are also nuances with different applications. To open a new terminal window on the Mac, the default shortcut is Command-T (using iTerm2). On Linux, in Gnome-Terminal, it's Ctrl-Shift-T. Even with remapping the Command and Ctrl keys around on one of the machines, it's not a perfect solution.

After spending far too long to try to solve this, I've come up with three approaches I've found helped.

# Own Your Shortcut Keys

Early in my career, I found it easy to adjust to new sets of shortcut keys. I could install a new IDE and quickly adjust to using SHIFT-F5 to launch the debugger instead of Ctrl-Shift-R.

Maybe it's a case of getting older, but that's become more difficult - or more accurately, I've become more stuck in my ways about wanting to dictate the shortcut keys I want to use vs. having applications dictate them for me. Plus, no one shares keyboards any more (unless you are an advocate of pair programming), so no one should care if I have a wacky set of keyboard shortcuts as long as I can remember them.

My first recommendation therefore is to own your shortcut keys. Think about what keyboard shortcut feels most natural to you for each action, and let that dictate how you setup your system. For reference, maintain a table of your shortcut keys. Here's mine: https://github.com/simonguest/keymap

# Consistent Modifier Keys

Modifier keys (these are the keys that modify others like Ctrl, Shift, Alt, etc.) are different between Mac and PCs, and many PC keyboards also have variations. On my Mac, the layout of the modifier keys (to the left of the space bar) is as follows:

<kbd>Fn</kbd><kbd>Ctrl</kbd><kbd>Opt</kbd><kbd>Cmd</kbd>

Yet, on my DELL, the layout is:

<kbd>Ctrl</kbd><kbd>Fn</kbd><kbd>Win</kbd><kbd>Alt</kbd>

Even if the keyboard shortcuts are identical between the machines, I find myself having to frequent look down at the keyboard to reorient to the layout.

I've found the solution to this is to not to. Instead of following the keys on the keyboard, I have a mental model of how modifier keys should operate across all keyboards.

For me, I always expect the Meta key (Command or Windows key) to be immediately to the left of the space bar. The key directly to the left of the Meta is always Alt/Option. If there are four modifier keys, the key to its left is always Fn. Finally, the key is the bottom left is always Ctrl. Again, this is my muscle memory of what I've learned over the many years - yours may be completely different.

With my mental model for this keyboard layout, I ignore the labels printed on the keys and use tools to map them equivalently. 

On the Mac, you can use the *Modifier Keys* option in the *Keyboard* system preferences to swap these if needed. In Linux, you can do something similar using *TweakUI* in Gnome, or ```setxkbmap```.

(Note: If you need to swap the Fn and Ctrl keys on a PC, many times this has to be done via a Bios setting as Fn is not recognized as a standard key interrupt.)

# Remapping the Rest

With a uniform set of modifier keys, you can now start to remap the other keys. As I started to explore how to do this on Linux, I came across many different options:

**[xmodmap](https://wiki.archlinux.org/title/xmodmap):** This works well if you want to swap out a single key for another single key, but doesn't do much more than that. It won't handle chords (e.g., mapping Win-T to Ctrl-T) or other complex operations.

**[xbindkeys](https://wiki.archlinux.org/title/Xbindkeys):** Typically, ```xbindkeys``` is used in combination with ```xvkbd``` or ```xdotool```. ```xbindkeys``` traps the interrupt for a keypress or chord, and then ```xvkbd``` or ```xdotool``` simulates an alternative keypress. While on the surface it looks nice, I had issues when trying to implement it. First, it was slow. It worked for remapping a single key, but not suitable for multiple keypresses in succession. Second, it seemed inconsistent. This may have been how I was using the ```--clearmodifiers``` flag in ```xdotool```, but I found that one in every ten chords wouldn't map correctly. Finally, both ```xvkbd``` and ```xdotool``` use the testing API in X, which is deprecated in Wayland.

**[xkeysnail](https://github.com/mooz/xkeysnail)**: This is the tool that worked the best for me. ```xkeysnail``` is a python script that captures input from ```/dev/input/eventXX``` devices, remaps them, and redirects it to ```/dev/uinput```. It supports chords, complex operations (e.g., pressing a key and having a sequence of keys played back), and despite being python, performs really well. It also has the added feature of mapping keys specific to the window in focus (using the ```WM_CLASS``` in Gnome). Therefore, Ctrl-Shift-T can be mapped to a different replacement keyboard shortcut in Gnome Terminal vs. VS Code. [Here](https://github.com/simonguest/keymap/blob/main/Linux/xkeysnail/config.py) is an example of my setup.

```xkeysnail``` does have a couple of downsides, however. Because it acts as a new virtual keyboard device, it overrides any existing modmaps that have been previously applied. This makes it a little more difficult to set different combinations for different keyboards attached to the same machine. Finally, ```xkeysnail``` must run as root (for writing to ```/dev/uinput```), which makes it a little more work to get running as a startup process.

Finally, as your keyboards may be assigned different ```/dev/input/eventXX``` devices on reboot/reconnection, you'll need to pass the correct device to xkeysnail. I've written a [script](https://github.com/simonguest/keymap/blob/main/Linux/xkeysnail/launch_xkeysnail) that does this automatically.
