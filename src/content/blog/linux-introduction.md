---
title: You should give Linux a shot
date: "2024-7-29"
description: "Linux often carries a reputation of being complicated and overly technical. For a long time, I shared that perception. But after giving it a try, I realized how much it has to offer."
tags: ["linux", "opinion"]
---

## What is Linux?

Linux is the name for a family of open-source, Unix-like operating systems based on the Linux kernel. First released by Linus Torvalds in 1991, the Linux kernel is at the core of these systems. A Linux **distribution** (or distro) packages the kernel with system software and libraries, many of which are provided by the GNU Project.

### Common Misconception: "Why should I? Windows is perfectly fine for all my needs.".

This is a common sentiment. And while Windows might meet your current needs, it has become less user-friendly in recent years. Issues such as invasive [telemetry](https://www.zdnet.com/article/is-windows-10-telemetry-a-threat-to-your-personal-privacy/), unnecessary bloatware ([I'm looking at you Candy Crush...](https://www.zdnet.com/article/how-to-steer-clear-of-windows-10s-built-in-crapware/)), the increasing presence of CoPilot being everywhere on Windows 11, the requirement to **SIGN IN WITH A MICROSOFT ACCOUNT TO USE YOUR COMPUTER**... it seemed a little much. That being said, there are a lot of resources that aim to make Windows a better experience.

If you’ve been frustrated with Windows lately, Linux might be worth considering.

### Reasons You Shouldn't Daily Drive Linux

Before diving in, it’s important to recognize a few scenarios where Linux may not be the best option for your daily driver:

#### 1. You Rely on Windows-Only Software

If you depend on software like **Adobe Photoshop**, **Premiere**, or **Microsoft 365**, Linux might not be the best fit. While some alternatives exist, such as **GIMP** for Photoshop and **LibreOffice** for Microsoft Office, these alternatives might not meet all your needs, especially for resource-intensive tasks. Running these programs through compatibility layers like **Wine** often results in poor performance.

A lot of developers even still primarily prioritize releasing on Windows and MacOS, and Linux support, although on the rise, is still relatively scarce.

#### 2. You're Not Prepared to Troubleshoot

Linux can be more technical than other operating systems, depending on the distro you choose. Linux tends to be a pragmatic piece of software, and in a lot of cases you will need to pull up a terminal to enter commands, install software, or troubleshoot issues. Some distros, like Ubuntu, Pop!\_OS, and Linux Mint, offer user-friendly interfaces and polished GUIs, but technical issues can still arise. If you're not comfortable with command-line tools, Linux may not be for you.

#### 3. Hardware Support Can Be Hit or Miss

Linux hardware compatibility has improved significantly in recent years, but it can vary depending on the specific components and peripherals. Linux works well with most CPUs from Intel and AMD. And most x86 and x86_64 CPUs will work. ARM also has good support in devices like the Raspberry Pi and most modern Chromebooks. However, modern MacBooks with the M-Series chips will only work with one distro (check out [Asahi](https://asahilinux.org/about/)).

GPU support is quite different; Intel's integrated GPUs (Iris and UHD) are very well supported. AMD/ATI's have open-source drivers (AMDGPU), which have great support for both integrated and discrete GPUs, and recent AMD cards are often supported out of the box.

Now, NVIDIA is now... pretty good! Recently, [NVIDIA Open-Sourced their driver](https://developer.nvidia.com/blog/nvidia-transitions-fully-towards-open-source-gpu-kernel-modules/). While NVIDIA has started open-sourcing its GPU drivers, the process is ongoing. You may still experience some instability or performance issues compared to AMD's open-source drivers.

Basic peripherals like standard USB peripherals like keyboards, mice, and webcams work out of the box. Now specialized peripherals like gaming keyboards, mice, or other peripherals with RGB lighting or programmable keys might have limited support. Some vendors don't provide Linux software, but there are open-source tools. [OpenRGB](https://openrgb.org/) and [Piper](https://github.com/libratbag/piper) are excellent community solutions that allow Linux users to control RGB lighting and gaming mouse/keyboard features. These projects have matured a lot, but support can still be uneven depending on the specific hardware model.

Many printers work well with Linux using CUPS (Common Unix Printing System) (http://www.cups.org/). HP and Brother generally provide good Linux support. Some Canon and Epson printers have limited or no Linux support. Scanners may require specific drivers and can sometimes be trickier to set up, depending on the manufacturer.

#### 4. Music Production Isn't Linux's Strong Suit (Yet)

Music production on Linux has made significant strides in recent years, but it still faces challenges compared to platforms like Windows and macOS. Native Linux DAWs like **Ardour**, **Bitwig**, and **Tracktion** have great features, but VST3 support, which is critical for many music producers (like me), is still underdeveloped. Linux VSTs like **LV2**, **LADSPA**, and **DSSI** work well, but they are not widely adopted in the commercial music industry. Most VSTs can be run on Linux using tools like [Yabridge](https://github.com/robbert-vdh/yabridge) or [LinVST](https://github.com/osxmidi/LinVst). MIDI support on Linux is decent, though it can sometimes require more manual setup compared to Windows. **JACK** and **ALSA** both support MIDI devices, and most Linux DAWs are equipped to handle MIDI sequencing and routing.

## Why should I try Linux?

#### 1. It's free...

Most Linux distributions are completely free to download and use. Some distributions offer paid versions with added support (e.g., **Red Hat Enterprise Linux** and **Zorin OS Pro**), but the free versions still have all the core functionality you need.

#### 2. it's light...

It runs on almost anything (especially good on old hardware). Minimal hardware requirements are a lot less on Linux compared to Windows, though how much depends on the specific distro. Some Linux distributions are particularly designed for older hardware, such as **Lubuntu**, **Puppy Linux**, and **Linux Lite**. These systems can run on as little as 512 MB of RAM and older CPUs while still providing a usable desktop experience. For extremely resource-limited machines, [Tiny Core Linux](http://tinycorelinux.net/) which runs on just _16MB of RAM!_

#### 3. and it's fast

When games do run on Linux, they often perform exceptionally well. Linux’s lightweight nature and efficient resource management mean that it doesn’t carry the same overhead as Windows. Windows has numerous background processes that can consume CPU and memory, limiting gaming performance. On Linux, with its minimal resource usage, you’re often able to use more of your hardware’s potential.

#### 4. Doesn't do things you don't expect it to do.

One of Linux's greatest features is what it doesn't do. I already had my rant earlier, but I can keep on going. Microsoft's decisions for the future of Windows is like watching a car crash in really slow motion.

Updates on Windows are done automatically and can take _hours_. Not the case for Linux. In Linux, updates are managed through **package managers** (like **apt**, **dnf**, or **pacman**), and users have full control over when updates are applied. Moreover, Linux typically does not require reboots for most updates, except for kernel upgrades.

#### 5. Security and Privacy by Design

The **open-source nature** of Linux also allows security vulnerabilities to be discovered and patched quickly by the global community, unlike closed-source software where only the company can fix bugs. Linux’s **strict user privilege model** ensures that most tasks run without root (administrator) access. This minimizes the risk of malware, as malicious programs need root permissions to make critical system changes. Also coupled with the lack of telemetry (**Ubuntu’s telemetry** is minimal and opt-in, focusing mostly on system specs and package usage data. However, many privacy-focused users prefer to avoid telemetry altogether by using distros like **Debian**, **Arch**, or **Manjaro**, which have no built-in telemetry).

#### 6. Freedom and Community

Freedom and choice are, in my eyes, the most important factors of Linux and free and open source software in general. The very alive and strong community that Linux has and Linux's trust in it's users to give them the freedom to do as they please is why I personally began using Linux. Because of its strong populous philosophy. The Linux philosophy is centered around the idea of freedom and trust for its users. Users are free to use the software as they see fit. The open source philosophy is built on the idea of collaboration and community. The belief that together we can create something greater than what any one individual could achieve alone. This collaborative approach to software development has led to the creation of a vast array of open source software projects, from operating systems like Linux to productivity tools like LibreOffice to social media platforms like Mastodon.

Because of this quality, Linux is incredibly customizable and personable. Unlike proprietary systems like Windows or macOS, you can tweak almost every aspect of your Linux environment to suit your personal preferences. Whether you're looking for a traditional desktop experience or a minimalist, keyboard-driven setup, Linux can accommodate. You can even modify the core functionality of the system through different distros or by compiling your own **Linux kernel** to fit your needs. Your desktop is completely personable via **Desktop Environments (DEs)** like **GNOME**, **KDE Plasma**, **Xfce**, and **Cinnamon** provide full-fledged graphical interfaces with their own sets of apps, window management systems, and workflows. They cater to different preferences, from highly visual (KDE) to minimal and lightweight (Xfce). Or maybe you'd prefer a **Window Managers (WMs)**, like **i3**, **Awesome**, or **bspwm**, are more focused on minimalism and efficiency. They allow for dynamic tiling and customization without the overhead of a full desktop environment. For further personalization, users can install and configure custom **widgets**, **terminals** (like **Alacritty** or **Kitty**), and **file managers** (like **Nautilus**, **Dolphin**, or **Thunar**) to create a unique workflow. Any piece of software is sure have a FOSS alternative whether you need an Office suite (LibreOffice), Note taking database (AppFlowy).

### 7. Painless development environment

This one is going to be good. Linux's use of powerful package managers like `apt`, `pacman`, `rpm`, and `nix`. You will also have access to preinstalled compilers through GCC. GCC does _not_ mean the 'GNU C Compiler', instead it means the '[GNU Compiler Collection](https://gcc.gnu.org/)'. GCC includes compilers for C, C++, Objective-C, Fortran, Ada, Go, etc. As well including important libraries for these languages. It's an essential piece of software for the GNU/Linux operating system. Not only that, we have a really, really nice shell. Bash is the default shell in Unix operating systems. The Bourne-Again shell (bash) including command history, job control, and the ability to create and use shell scripts for automation, making it super duper powerful for tedious tasks.

### "what about gaming?"

One of the most common questions from new Linux users is, "How is gaming on Linux?" Once thought of as nearly impossible, gaming on Linux has come a long way in recent years. Thanks to major efforts from **Valve**, Linux gaming has taken a huge leap forward. Valve’s **Steam Deck** uses a Linux-based operating system called **SteamOS** and leverages **Proton**, a compatibility layer built on **Wine** (Wine Is Not an Emulator), to allow Windows games to run on Linux. Since Proton’s release, many Steam games have become playable on Linux systems, dramatically expanding Linux’s gaming library. While Proton makes it possible to run many games, it doesn’t work perfectly with every title. Some games, especially those with **anti-cheat software** or complex DRM systems, may have issues or not work at all. Before purchasing or playing a game, it’s always a good idea to check its compatibility on [ProtonDB](https://www.protondb.com/) , where users report how well individual games run on Linux.

For games on any other platform, there are a lot of launchers that are essentially Wine wrappers that make installing games from other sources easier. [Lutris](https://lutris.net/) is an open-source gaming platform that simplifies managing and running games from multiple sources, such as **Epic Games**, **GOG**, **Uplay**, and **Origin**. Lutris uses **Wine** wrappers to run Windows games and is integrated with **Proton** for Steam games. It also supports emulators for retro gaming.

## The Gist of It

Linux isn't just an alternative to Windows—it’s a powerful, customizable, and efficient operating system with a vibrant community. Whether you’re a gamer, a developer, or just looking to breathe new life into an old PC, Linux has something to offer.

The best part? You don’t have to commit fully to switch. You can try it out by dual-booting or running a Linux live USB to explore without altering your existing setup. Linux is about freedom, and it lets you explore your system at your own pace.
