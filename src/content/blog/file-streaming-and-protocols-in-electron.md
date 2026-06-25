---
title: Building an Audio Sample Explorer in Electron Part 1 - Streaming and Custom Protocols
date: "2024-9-03"
description: "This post is part one of a series of the different tribulations to develop punks, my experimental audio sample explorer made in Electron."
tags: ["punks", "electron"]
---

This post is part one of a series of the different tribulations to develop [punks](https://www.github.com/samanshaiza004/punks), my experimental audio sample explorer made in Electron.

Creating an audio sample explorer might seem straightforward at first glance – after all, we just need to play some audio files, right? However, building a robust, secure, and performant solution isn't trivial in the slightest. So, in this first part of our series on building punks, we'll explore how I implemented a secure audio streaming using Electron's custom protocols.

## The Challenge: Streaming Audio Files Securely

When building a desktop application that handles media files, we immediately face several challenges:

- How do we access files from the user's system securely?
- How do we stream large audio files efficiently?
- How do we maintain web security principles while working with local files?

Traditional web applications typically serve media through HTTP endpoints, but this approach isn't ideal for a desktop application. We don't want to run a local web server just to play audio files – that would be dumb in a dumb complicated way.

## Enter Custom Protocols

Before diving into the implementation, let's understand what protocols are and why they're crucial for our application. A protocol is essentially a set of rules that define how data should be transmitted. Just as `http://` tells your browser to fetch data from a web server, or `file://` indicates direct file system access, we can create our own protocol for handling audio files.

In our case, we'll create a `sample://` protocol that provides:

- Secure access to local audio files
- Efficient streaming capabilities
- Integration with Electron's security model

## Setting up a custom protocol

First, we need to register our custom protocol with Electron. This involves two steps: declaring the protocol's privileges and implementing the protocol handler.

This can be setup really easily. The `protocol.registerSchemesAsPrivileged` function is used here to grant out custom protocol certain privileges, such as bypassing CSP restrictions and supporting streaming.

```typescript
// main.ts

protocol.registerSchemesAsPrivileged([
  {
    scheme: "sample",
    privileges: { bypassCSP: true, stream: true, supportFetchAPI: true },
  },
]);

app.whenReady().then(() => {
  protocol.handle("sample", (request) => {
    const filePath = request.url.replace("sample:///", ""); // Remove the scheme prefix
    return net.fetch("file://" + filePath); // Fetches the file as a stream
  });
});
```

The protocol is registered as "privileged" so it can **bypass content security policy (CSP), support the Fetch API**, and **stream** files. Registering as privileged allows Electron to bypass certain web restrictions, letting us safely access local files while preventing exposure to external threats.

`protocol.handle('sample', ...)` listens for requests to `sample://` URLs, converting them to file paths with `file://` for the local file system.

## Handling audio in the renderer with Wavesurfer.js

With the protocol in place, the next step is to handle audio playback. Here’s how I integrated **WaveSurfer.js** to control the audio stream in the frontend. This code lives in the custom `AudioProvider` component and supports play/pause, volume, and skipping.

```typescript
const playAudio = (filePath: string) => {
  // Set the current audio file path
  setCurrentAudio(filePath);

  if (waveSurferRef.current) {
    waveSurferRef.current.load(`sample://${filePath}`);
    waveSurferRef.current.on("ready", () => {
      waveSurferRef.current?.play();
    });
  }
};
```

When a file path is given to `playAudio`, WaveSurfer loads it using our `sample://` protocol.

WaveSurfer then manages audio playback, while `AudioProvider` functions (e.g., `playAudio`, `stopAudio`) provide control.

## Challenges: Security and Privileges

Electron’s default settings prevent files from being accessed directly for security reasons. Using a custom protocol with `registerSchemesAsPrivileged` allowed secure access by explicitly listing privileges.

On my first attempt of this app, I was using Wails and they use a static file server which was not an intuitive option for this app. The big reason why I chose Electron in the first place was because of how easy it was to safely stream local audio files.

## Challenges: Cross-Platform File Path Handling

One of the most challenging aspects of building a desktop application is ensuring compatibility across different operating systems. Windows, in particular, requires special attention due to its unique file system conventions.

### The Windows File Path Challenge

Windows file paths differ from Unix-based systems in several key ways:

- Use of backslashes (\\) instead of forward slashes (/)
- Drive letters (e.g., C:\\)
- Different handling of special characters
- Unique path length limitations

Here's how we handle these challenges in our sample protocol:

```typescript
protocol.handle("sample", async (request) => {
  try {
    // Remove the protocol prefix
    const rawPath = request.url.replace("sample:///", "");

    // Handle special characters for Windows compatibility
    const decodedPath = rawPath
      .replace(/%23/g, "#")
      .replace(/%20/g, " ")
      .replace(/%5C/g, "\\")
      .replace(/%3A/g, ":");
    // ... other special character handling

    // Normalize the path for the current platform
    const normalizedPath = path.normalize(decodedPath);

    // Platform-specific URL construction
    let fileUrl: string;
    if (process.platform === "win32") {
      // Windows-specific path handling
      const forwardSlashPath = normalizedPath.replace(/\\/g, "/");
      const [drive, ...pathParts] = forwardSlashPath.split(":");
      const encodedPath = pathParts
        .join(":")
        .split("/")
        .map((segment) => encodeSpecialChars(segment))
        .join("/");
      fileUrl = `file:///${drive}:${encodedPath}`;
    } else {
      // Unix path handling
      const segments = normalizedPath.split("/");
      const encodedPath = segments
        .map((segment) => encodeSpecialChars(segment))
        .join("/");
      fileUrl = `file://${encodedPath}`;
    }

    return await net.fetch(fileUrl);
  } catch (error) {
    console.error("Protocol handler error:", error);
    throw error;
  }
});
```

## Key Considerations for Cross-Platform Compatibility

1. Path Normalization
   Always normalize paths using Node.js's `path.normalize()`:

```typescript
const normalizedPath = path.normalize(decodedPath);
```

This ensures consistent path separators and resolves relative path segments regardless of the operating system.

2. Special Character Handling
   Windows file paths can contain characters that need special handling:

   ```typescript
   const encodeSpecialChars = (str: string): string => {
     return str
       .replace(/#/g, "%23")
       .replace(/\s/g, "%20")
       .replace(/\(/g, "%28")
       .replace(/\)/g, "%29");
     // ... other special characters
   };
   ```

3. Drive Letter Processing
   Windows drive letters require specific handling:
   ```typescript
   if (process.platform === "win32") {
     const [drive, ...pathParts] = forwardSlashPath.split(":");
     fileUrl = `file:///${drive}:${encodedPath}`;
   }
   ```

## Future Plans

- **Custom keybinds**: Ensuring a good keyboard experience with keybinds and customizability.
- **Tab functionality**: Tabs made in React. Just fun.

## Conclusion

Implementing custom protocols in Electron is an invaluable approach for audio-based applications. This setup is essential to allow users access to files directly, creating an app that functions seamlessly with the local file system.

## Read more

- [Electron Documentation - Protocols](https://www.electronjs.org/docs/latest/api/protocol)
- [Doyensec's Electron Security Checklist](https://www.doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)
